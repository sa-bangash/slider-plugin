// tslint:disable: radix
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ng-slider-plugin',
  templateUrl: './slider-plugin.component.html',
  styleUrls: ['./slider-plugin.component.css']
})
export class SliderPluginComponent implements AfterViewInit {


  @ViewChild('inputLeft', { static: true }) inputLeft: ElementRef<HTMLInputElement>;
  @ViewChild('inputRight', { static: true }) inputRight: ElementRef<HTMLInputElement>;
  @ViewChild('sliderThumbLeft', { static: true }) sliderThumbLeft: ElementRef<HTMLLIElement>;
  @ViewChild('sliderThumbRight', { static: true }) sliderThumbRight: ElementRef<HTMLLIElement>;
  @ViewChild('sliderRange', { static: true }) sliderRange: ElementRef<HTMLLIElement>;

  get inputLeftNative(): HTMLInputElement {
    return this.inputLeft.nativeElement;
  }

  get inputRightNative(): HTMLInputElement {
    return this.inputRight.nativeElement;
  }

  get sliderThumbLeftNative(): HTMLLIElement {
    return this.sliderThumbLeft.nativeElement;
  }

  get sliderThumbRightNative(): HTMLLIElement {
    return this.sliderThumbRight.nativeElement;
  }

  get sliderRangeNative(): HTMLLIElement {
    return this.sliderRange.nativeElement;
  }
  ngAfterViewInit(): void {
    this.onLeftChange();
    this.onRightChange();
  }

  onLeftChange() {
    const min = parseInt(this.inputLeftNative.min);
    const max = parseInt(this.inputLeftNative.max);
    const step = this.inputLeftNative.step;
    this.inputLeftNative.value = Math.min(
      parseInt(this.inputLeftNative.value),
      parseInt(this.inputRightNative.value) - parseInt(step)
    ) + '';
    const percent = ((parseInt(this.inputLeftNative.value) - min) / (max - min)) * 100;
    this.sliderThumbLeftNative.style.left = percent + '%';
    this.sliderRangeNative.style.left = percent + '%';
  }

  onRightChange() {
    const min = parseInt(this.inputRightNative.min);
    const max = parseInt(this.inputRightNative.max);
    const step = this.inputLeftNative.step;
    this.inputRightNative.value = Math.max(
      parseInt(this.inputLeftNative.value) + parseInt(step),
      parseInt(this.inputRightNative.value)) + '';
    const percent = ((parseInt(this.inputRightNative.value) - min) / (max - min)) * 100;
    this.sliderThumbRightNative.style.right = (100 - percent) + '%';
    this.sliderRangeNative.style.right = (100 - percent) + '%';
  }

  onRangeClick(event) {
    console.log('event', event.x);
    // console.log('left', this.sliderThumbLeftNative.getBoundingClientRect()['x']);
    // console.log('right', this.sliderThumbRightNative.getBoundingClientRect()['x']);
  }

}
