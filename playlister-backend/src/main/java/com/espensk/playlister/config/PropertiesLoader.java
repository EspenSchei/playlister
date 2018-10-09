package com.espensk.playlister.config;

import java.io.InputStream;
import java.util.Optional;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PropertiesLoader {
  private final Properties properties = new Properties();
//  private static final Logger LOGGER = LoggerFactory.getLogger(PropertiesLoader.class);

  public Optional<String> getPropertyValue(String key) {
    try (InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties")) {
      properties.load(is);
      return Optional.of(properties.getProperty(key));
    } catch (Exception ioe) {
//      LOGGER.error("Exception loading propery value: " + key);
    }
    return Optional.empty();
  }
}

