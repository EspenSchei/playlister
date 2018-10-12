package com.espensk.playlister.services;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.espensk.playlister.config.PropertiesLoader;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;

@Component
public class YouTubeService {

  private static PropertiesLoader propertiesLoader = new PropertiesLoader();
  private static YouTube youTube;

  public String findYoutubeId(String artist, String name) {
    youTube = new YouTube.Builder(
        new NetHttpTransport(),
        new JacksonFactory(),
        httpRequest -> {
        }
    ).setApplicationName("Playlister").build();

    try {
      YouTube.Search.List search = youTube.search().list("id");
      search.setKey(propertiesLoader.getPropertyValue("youtubeApiKey").orElse(null));
      search.setQ(artist + " " + name);
      search.setType("video");
      search.setMaxResults(1L);
      search.setFields("items(id/videoId)");
      search.setVideoEmbeddable("true");
      search.setOrder("viewCount");

      SearchListResponse response = search.execute();

      return response.getItems().get(0).getId().getVideoId();
    } catch (IOException e) {
      return "";
    }
  }
}
