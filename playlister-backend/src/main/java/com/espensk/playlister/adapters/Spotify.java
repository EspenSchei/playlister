package com.espensk.playlister.adapters;


import com.espensk.playlister.config.PropertiesLoader;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.SettableFuture;
import com.wrapper.spotify.Api;
import com.wrapper.spotify.methods.authentication.ClientCredentialsGrantRequest;
import com.wrapper.spotify.models.ClientCredentials;

public class Spotify {
  private static PropertiesLoader propertiesLoader = new PropertiesLoader();
//  private static final Logger LOGGER = LoggerFactory.getLogger(SpotifyApi.class);

  public static Api getApi() {

    final Api api = Api.builder()
        .clientId(propertiesLoader.getPropertyValue("clientId").orElse(null))
        .clientSecret(propertiesLoader.getPropertyValue("clientSecret").orElse(null))
        .build();
    final ClientCredentialsGrantRequest request = api.clientCredentialsGrant().build();
    final SettableFuture<ClientCredentials> responseFuture = request.getAsync();

    Futures.addCallback(responseFuture, new FutureCallback<ClientCredentials>() {
      @Override
      public void onSuccess(ClientCredentials clientCredentials) {
//        LOGGER.info("Successfully retrieved an access token! " + clientCredentials.getAccessToken());
//        LOGGER.info("The access token expires in " + clientCredentials.getExpiresIn() + " seconds");

        api.setAccessToken(clientCredentials.getAccessToken());
      }

      @Override
      public void onFailure(Throwable throwable) {
//        LOGGER.error("Could not fetch access token. Probably caused by invalid clientId/clientSecret");
      }
    });
    return api;
  }
}
