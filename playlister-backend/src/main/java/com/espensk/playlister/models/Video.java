package com.espensk.playlister.models;

import javax.annotation.Nullable;

import org.immutables.value.Value;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
@Value.Immutable
public interface Video {
  @JsonProperty
  String name();

  @JsonProperty
  String artist();

  @JsonProperty
  @Nullable
  String youtubeId();
}
