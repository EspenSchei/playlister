import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {PlaylistService} from '../playlist.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  private player: YT.Player;
  private currentVideo = 0;
  private ids = null;

  playlist = 'https://open.spotify.com/user/spotifycharts/playlist/37i9dQZEVXbMDoHDwVN2tF?si=nb1Mt6RLR7yOlfzvDb9LjQ';
  videos = null;
  id = null;
  name = null;
  description = '';

  constructor(private _sanitizer: DomSanitizer, private playlistService: PlaylistService) {
  }

  // Play next automatically
  onStateChange(event) {
    if (event.data === 0) {
      this.player.loadVideoById(this.id);
    }
  }

  initPlayer(event) {
    this.player = event;
    this.player.playVideo();
  }

  nextVideo() {
    if (this.currentVideo === this.videos.length - 1) {
      this.id = this.ids[this.currentVideo = 0];
    } else {
      this.id = this.ids[++this.currentVideo];
    }
    this.player.loadVideoById(this.id);
  }

  previousVideo() {
    if (this.currentVideo === 0) {
      this.id = this.ids[this.currentVideo = 0];
    } else {
      this.id = this.ids[--this.currentVideo];
    }
    this.player.loadVideoById(this.id);
  }

  playSelected(video) {
    this.player.loadVideoById(this.id = video.youtubeId);
    const self = this;
    this.currentVideo = this.ids.findIndex(function (videoId) {
      return videoId === self.id;
    });
  }

  loadVideos() {
    this.videos = null;
    this.currentVideo = 0;
    const user = this.playlist.split('/')[4];
    const playlistId = this.playlist.split('/')[6].split('?')[0];
    this.playlistService.getPlaylist(user, playlistId)
      .subscribe(playlist => {
        this.name = playlist.name;
        this.description = playlist.description;
        this.videos = playlist.videos;
        this.ids = this.videos.map(v => v.youtubeId);
        this.id = this.ids[0];
      });
  }

  ngOnInit() {
    this.loadVideos();
  }
}
