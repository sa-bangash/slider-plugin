// tslint:disable: radix
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge } from 'rxjs';
@Component({
  selector: 'ng-slider-plugin',
  templateUrl: './slider-plugin.component.html',
  styleUrls: ['./slider-plugin.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderPluginComponent),
      multi: true,
    },
  ],
})
export class SliderPluginComponent implements AfterViewInit, ControlValueAccessor {
  max: number;
  min: number;
  step: number;

  @Input('min')
  set Min(val: string) {
    this.min = parseInt(val);
  }

  @Input('max')
  set Max(val: string) {
    this.max = parseInt(val);
  }

  @Input('step')
  set Step(val: string) {
    this.step = parseInt(val);
  }

  @ViewChild('sliderThumbLeft', { static: true }) sliderThumbLeft: ElementRef<HTMLLIElement>;
  @ViewChild('sliderThumbRight', { static: true }) sliderThumbRight: ElementRef<HTMLLIElement>;
  @ViewChild('sliderRange', { static: true }) sliderRange: ElementRef<HTMLLIElement>;

  leftThumbCtrl = new FormControl();
  rightThumbCtrl = new FormControl();
  onChange: any = () => { };
  onTouched: any = () => { };

  get sliderThumbLeftNative(): HTMLLIElement {
    return this.sliderThumbLeft.nativeElement;
  }

  get sliderThumbRightNative(): HTMLLIElement {
    return this.sliderThumbRight.nativeElement;
  }

  get sliderRangeNative(): HTMLLIElement {
    return this.sliderRange.nativeElement;
  }
  writeValue(obj: any): void {
    console.log('write', obj);
    this.setControlsValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  setControlsValue(obj: any) {
    if (Array.isArray(obj)) {
      setTimeout(() => {
        console.log('setControl', typeof obj[1])
        this.leftThumbCtrl.setValue(obj[0]);
        this.rightThumbCtrl.setValue(obj[1]);
        this.onLeftChange();
        this.onRightChange();
      });
    }
  }

  emitControlsValue() {
    console.log('emit', this.leftThumbCtrl.value, this.rightThumbCtrl.value);
    this.onChange([this.leftThumbCtrl.value, this.rightThumbCtrl.value]);
  }
  ngAfterViewInit(): void {
    console.log('after view init', this.step, this.min, this.max);
  }

  onLeftChange() {

    this.leftThumbCtrl.setValue(
      Math.min(
        parseInt(this.leftThumbCtrl.value),
        parseInt(this.rightThumbCtrl.value) - this.step
      )
    )
    const percent = ((parseInt(this.leftThumbCtrl.value) - this.min) / (this.max - this.min)) * 100;
    this.sliderThumbLeftNative.style.left = percent + '%';
    this.sliderRangeNative.style.left = percent + '%';
    this.emitControlsValue();
  }

  onRightChange() {
    this.rightThumbCtrl.setValue(
      Math.max(
        parseInt(this.leftThumbCtrl.value) + this.step, parseInt(this.rightThumbCtrl.value)
      )
    );
    console.log(this.max, this.min, typeof this.min, typeof this.max)
    const percent = ((parseInt(this.rightThumbCtrl.value) - this.min) / (this.max - this.min)) * 100;
    console.log('percentage', percent, typeof percent)
    this.sliderThumbRightNative.style.right = (100 - percent) + '%';
    this.sliderRangeNative.style.right = (100 - percent) + '%';
    this.emitControlsValue();
  }

  onRangeClick(event) {
    console.log('event', event.x);
    // console.log('left', this.sliderThumbLeftNative.getBoundingClientRect()['x']);
    // console.log('right', this.sliderThumbRightNative.getBoundingClientRect()['x']);
  }

}
