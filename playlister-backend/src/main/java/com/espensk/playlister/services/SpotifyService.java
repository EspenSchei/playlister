package com.espensk.playlister.services;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.espensk.playlister.adapters.Spotify;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Playlist;

@Component
public class SpotifyService {

  private static final SpotifyApi spotifyApi = SpotifyApi.builder()
      .setAccessToken(Spotify.clientCredentials())
      .build();

  public Playlist getPlaylist(String playlistId, String userId) {
    try {
      return spotifyApi.getPlaylist(userId, playlistId).build().execute();
    } catch (SpotifyWebApiException | IOException e) {
      throw new RuntimeException("Something went wrong fetching playlist", e);
    }
  }
}
