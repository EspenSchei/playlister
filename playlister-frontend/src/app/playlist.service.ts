import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getPlaylist(user: string, playlistId: string) {
    const params = '?skipYoutube=false&limit=5&user=' + user + '&playlistId=' + playlistId;
    return this.http.get<Playlist>('http://localhost:8080/playlists/custom' + params);
  }
}

interface Playlist {
  videos: {
    artist: string,
    name: string,
    youtubeId: string
  };
  name: string;
  description: string;
}

