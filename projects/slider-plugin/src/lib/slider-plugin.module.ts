import { NgModule } from '@angular/core';
import { SliderPluginComponent } from './slider-plugin/slider-plugin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SliderPluginComponent],
  imports: [
    FormsModule, ReactiveFormsModule
  ],
  exports: [SliderPluginComponent]
})
export class SliderPluginModule { }
