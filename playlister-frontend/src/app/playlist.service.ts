import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) {
  }

  getPlaylist(user: string, playlistId: string) {
    return this.http.get('http://localhost:8080/playlists/custom?skipYoutube=false&limit=5&user=' + user + '&playlistId=' + playlistId);
  }
}

