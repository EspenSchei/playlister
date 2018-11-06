import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {VideoComponent} from './video/video.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {YoutubePlayerModule} from 'ngx-youtube-player';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatButtonModule, MatAutocompleteModule, MatOptionModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    YoutubePlayerModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
