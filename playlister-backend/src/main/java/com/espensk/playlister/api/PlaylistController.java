package com.espensk.playlister.api;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.espensk.playlister.models.ImmutablePlaylistWrapper;
import com.espensk.playlister.models.ImmutableVideo;
import com.espensk.playlister.models.PlaylistWrapper;
import com.espensk.playlister.models.Video;
import com.espensk.playlister.services.SpotifyService;
import com.espensk.playlister.services.YouTubeService;
import com.wrapper.spotify.models.Playlist;
import com.wrapper.spotify.models.SimpleArtist;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

  final SpotifyService spotifyService;
  final YouTubeService youTubeService;

  @Autowired
  public PlaylistController(
      SpotifyService spotifyService,
      YouTubeService youTubeService
  ) {
    this.spotifyService = spotifyService;
    this.youTubeService = youTubeService;
  }

  @CrossOrigin
  @RequestMapping("/top")
  public PlaylistWrapper getTop(
      @RequestParam(value = "limit", defaultValue = "10") int limit,
      @RequestParam(value = "skipYoutube", defaultValue = "true") boolean skipYoutube
  ) {
    return getCustomPlaylist("spotify", "4hOKQuZbraPDIfaGbM3lKI", limit, skipYoutube);
  }

  @CrossOrigin
  @RequestMapping("/custom")
  public PlaylistWrapper getCustomPlaylist(
      @RequestParam("user") String user,
      @RequestParam("playlistId") String playlistId,
      @RequestParam(value = "limit", defaultValue = "10") int limit,
      @RequestParam(value = "skipYoutube", defaultValue = "true") boolean skipYoutube
  ) {
    final Playlist playlist = spotifyService.getPlaylist(playlistId, user);
    return ImmutablePlaylistWrapper.builder()
        .name(playlist.getName())
        .description(playlist.getDescription())
        .videos(extractVideos(playlist, limit, skipYoutube))
        .build();
  }

  public List<Video> extractVideos(Playlist playlist, int limit, boolean skipYouTube) {
    return playlist.getTracks().getItems().stream()
        .limit(limit)
        .map(track -> {
          final String name = track.getTrack().getName();
          final String artists = track.getTrack().getArtists()
              .stream()
              .map(SimpleArtist::getName)
              .collect(Collectors.joining(", "));
          return ImmutableVideo.builder()
              .name(name)
              .artist(artists)
              .youtubeId(skipYouTube ? "" : youTubeService.findYoutubeId(artists, name))
              .build();
        })
        .collect(toList());
  }
}
