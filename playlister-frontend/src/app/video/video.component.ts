import {Component, OnInit} from '@angular/core';
import {PlaylistService, Video} from '../playlist.service';
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
  private initialId = null;

  playlist = 'https://open.spotify.com/user/spotifycharts/playlist/37i9dQZEVXbMDoHDwVN2tF?si=nb1Mt6RLR7yOlfzvDb9LjQ';
  videos = null;
  name = null;
  description = '';

  playlistFormControl = new FormControl('', [
    Validators.required,
    PlaylistValidator.validate
  ]);

  onStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.nextVideo();
    }
  }

  async initPlayer(event) {
    this.player = event;
    this.player.loadVideoById(await this.getVideoId(this.videos[0]));
  }

  async nextVideo() {
    if (this.currentVideo === this.videos.length - 1) {
      this.player.loadVideoById(this.initialId);
    } else {
      const next = this.videos[++this.currentVideo];
      this.player.loadVideoById(await this.getVideoId(next));
    }
  }

  async previousVideo() {
    if (this.currentVideo === 0) {
      this.player.loadVideoById(this.initialId);
    } else {
      const previous = this.videos[--this.currentVideo];
      this.player.loadVideoById(await this.getVideoId(previous));
    }
  }

  async playSelected(video) {
    this.player.loadVideoById(await this.getVideoId(video));
    this.currentVideo = this.videos.findIndex(v => v.name === video.name);
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
      });
  }

  async getVideoId(video: Video) {
    return await this.playlistService.getYoutubeId(video);
  }

  ngOnInit() {
    this.loadVideos();
  }
}
