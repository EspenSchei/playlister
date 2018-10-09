package com.espensk.playlister.models;

import java.util.List;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
@Value.Immutable
public interface PlaylistWrapper {
  @JsonProperty
  List<Video> videos();

  @JsonProperty
  String name();

  @JsonProperty
  String description();
}
