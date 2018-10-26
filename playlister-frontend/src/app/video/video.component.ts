import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '../playlist.service';
import {FormControl, Validators} from '@angular/forms';
import {PlaylistValidator} from '../validators/PlaylistValidator';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  constructor(private playlistService: PlaylistService) {
  }

  private player: YT.Player;
  private currentVideo = 0;
  private ids = null;

  playlist = 'https://open.spotify.com/user/spotifycharts/playlist/37i9dQZEVXbMDoHDwVN2tF?si=nb1Mt6RLR7yOlfzvDb9LjQ';
  videos = null;
  id = null;
  name = null;
  description = '';

  playlistFormControl = new FormControl('', [
    Validators.required,
    PlaylistValidator.validate
  ]);

  onStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.nextVideo();
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
