import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderPluginModule } from 'slider-plugin';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SliderPluginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
