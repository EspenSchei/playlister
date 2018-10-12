import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {PlaylistService} from '../playlist.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  baseUrl = 'https://www.youtube.com/embed/';
  playlist = 'https://open.spotify.com/user/spotifycharts/playlist/37i9dQZEVXbMDoHDwVN2tF?si=nb1Mt6RLR7yOlfzvDb9LjQ';

  currentVideo = 0;
  videos = null;
  name = null;
  description = '';

  constructor(private _sanitizer: DomSanitizer, private playlistService: PlaylistService) {
  }

  getVideo() {
    if (this.videos != null) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.videos[this.currentVideo].youtubeId);
    }
  }

  nextVideo() {
    if (this.currentVideo === this.videos.length - 1) {
      this.currentVideo = 0;
    } else {
      this.currentVideo++;
    }
  }

  previousVideo() {
    if (this.currentVideo === 0) {
      this.currentVideo = 0;
    } else {
      this.currentVideo--;
    }
  }

  getVideos() {
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

  ngOnInit() {
    this.getVideos();
  }
}
