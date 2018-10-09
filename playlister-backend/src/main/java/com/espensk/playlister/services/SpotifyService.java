package com.espensk.playlister.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.espensk.playlister.adapters.Spotify;
import com.wrapper.spotify.Api;
import com.wrapper.spotify.exceptions.WebApiException;
import com.wrapper.spotify.models.Playlist;

@Component
public class SpotifyService {

  private static Api spotifyApi;

  public Playlist getPlaylist(String playlistId, String userId) {
    spotifyApi = Optional.ofNullable(spotifyApi).orElse(Spotify.getApi());
    try {
      return spotifyApi.getPlaylist(userId, playlistId).build().get();
    } catch (WebApiException | IOException e) {
      // LOGGER.error("Exception calling getPlayList() with playlistId: " + playlistId + "and userId " + userId);
      spotifyApi.refreshAccessToken();
    }

    throw new RuntimeException("Could not find playlist");
  }
}
