import {FormGroup, ValidationErrors} from '@angular/forms';

export class PlaylistValidator {
  constructor() {}

  static validate(playlistUrl: FormGroup): ValidationErrors | null {
    try {
      if ((playlistUrl.value.split('/')[4].length < 3) ||
        (playlistUrl.value.split('/')[6].split('?')[0].length < 10)) {
        return {url: true};
      }
    } catch (exception) {
      return {url: true};
    }
    return null;
  }
}
