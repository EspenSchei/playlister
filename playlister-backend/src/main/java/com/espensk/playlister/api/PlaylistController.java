package com.espensk.playlister.api;

import static java.util.stream.Collectors.toList;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.espensk.playlister.models.ImmutableVideo;
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

  @RequestMapping("/top")
  public List<Video> getTop(
      @RequestParam("limit") int limit
  ) {
    final Playlist playlist = spotifyService.getPlaylist("4hOKQuZbraPDIfaGbM3lKI", "spotify");
    return mapPlayListToVideos(playlist, limit);
  }

  @RequestMapping("/custom")
  public List<Video> getCustomPlaylist(
      @RequestParam("user") String user,
      @RequestParam("playlistId") String playlistId,
      @RequestParam("limit") int limit
  ) {
    final Playlist playlist = spotifyService.getPlaylist(playlistId, user);
    return mapPlayListToVideos(playlist, limit);
  }

  public List<Video> mapPlayListToVideos(Playlist playlist, int limit) {
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
              .youtubeId(youTubeService.findYoutubeId(artists, name))
              .build();
        })
        .collect(toList());
  }
}
