import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getTopVideos() {
    return this.http.get('http://localhost:8080/playlists/top?limit=5');
  }

  getPlaylist(user: string, playlistId: string) {
    return this.http.get('http://localhost:8080/playlists/custom?limit=5&user=' + user + '&playlistId=' + playlistId);
  }
}

