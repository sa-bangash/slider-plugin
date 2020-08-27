import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { SliderPluginComponent } from './slider-plugin/slider-plugin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SliderPluginComponent],
  imports: [
    FormsModule, ReactiveFormsModule, CommonModule
  ],
  exports: [SliderPluginComponent]
})
export class SliderPluginModule { }
