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
  videoIds = null;
  videos = null;

  constructor(private _sanitizer: DomSanitizer, private playlistService: PlaylistService) {
  }

  getVideo() {
    if (this.videoIds != null) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.videoIds[this.currentVideo]);
    }
  }

  nextVideo() {
    if (this.currentVideo === this.videoIds.length) {
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
    const user = this.playlist.split('/')[4];
    const playlistId = this.playlist.split('/')[6].split('?')[0];
    this.playlistService.getPlaylist(user, playlistId)
      .subscribe(videos => {
        this.videos = videos;
        this.videoIds = this.videos.map(video => video.youtubeId);
      });
  }

  ngOnInit() {
    this.getVideos();
  }
}
