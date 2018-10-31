import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getPlaylist(user: string, playlistId: string) {
    const params = '?skipYoutube=true&limit=100&user=' + user + '&playlistId=' + playlistId;
    return this.http.get<Playlist>(this.baseUrl + '/playlists/custom' + params);
  }

  async getYoutubeId(video: Video) {
    const params = '?artists=' + video.artist + '&name=' + video.name;
    return await this.http.get(this.baseUrl + '/playlists/youtube/find-video-id' + params, {responseType: 'text'}).toPromise();
  }
}

interface Playlist {
  videos: Video[];
  name: string;
  description: string;
}

export interface Video {
  artist: string;
  name: string;
  youtubeId: string;
}
