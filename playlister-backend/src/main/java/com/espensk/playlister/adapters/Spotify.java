package com.espensk.playlister.adapters;

import java.io.IOException;

import com.espensk.playlister.config.PropertiesLoader;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

public class Spotify {
  private static PropertiesLoader propertiesLoader = new PropertiesLoader();

  private static final SpotifyApi api = SpotifyApi.builder()
      .setClientId(propertiesLoader.getPropertyValue("clientId").orElse(null))
      .setClientSecret(propertiesLoader.getPropertyValue("clientSecret").orElse(null))
      .build();

  private static final ClientCredentialsRequest clientCredentialsRequest = api.clientCredentials()
      .build();

  public static String clientCredentials() {
    try {
      final ClientCredentials clientCredentials = clientCredentialsRequest.execute();
      api.setAccessToken(clientCredentials.getAccessToken());

      return clientCredentials.getAccessToken();
    } catch (IOException | SpotifyWebApiException e) {
      throw new RuntimeException("Something went wrong with clientCredentials", e);
    }
  }
}
