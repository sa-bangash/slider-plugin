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

  @Input()
  min: number;

  @Input()
  max: number;

  @Input()
  step: number;

  @ViewChild('inputLeft', { static: true }) inputLeft: ElementRef<HTMLInputElement>;
  @ViewChild('inputRight', { static: true }) inputRight: ElementRef<HTMLInputElement>;
  @ViewChild('sliderThumbLeft', { static: true }) sliderThumbLeft: ElementRef<HTMLLIElement>;
  @ViewChild('sliderThumbRight', { static: true }) sliderThumbRight: ElementRef<HTMLLIElement>;
  @ViewChild('sliderRange', { static: true }) sliderRange: ElementRef<HTMLLIElement>;

  leftThumbCtrl = new FormControl();
  rightThumbCtrl = new FormControl();
  onChange: any = () => { };
  onTouched: any = () => { };

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
      console.log('setControl', obj)
      this.leftThumbCtrl.setValue(obj[0]);
      this.rightThumbCtrl.setValue(obj[1]);
      setTimeout(() => {
        console.log('set tout')
        this.onLeftChange();
        this.onRightChange();
      }, 1000)
    }
  }

  emitControlsValue() {
    console.log('emit', this.leftThumbCtrl.value, this.rightThumbCtrl.value)
    this.onChange([this.leftThumbCtrl.value, this.rightThumbCtrl.value]);
  }
  ngAfterViewInit(): void {
    console.log('after view init', this.step, this.min, this.max);
    // this.onLeftChange();
    // this.onRightChange();
    // merge(this.rangeSecond.valueChanges, this.rangeFirst.valueChanges).subscribe((resp) => {
    //   this.emitControlsValue();
    // })
  }

  onLeftChange() {
    console.log('left change', this.inputLeftNative.value, this.inputLeftNative.min, this.inputLeftNative.max)
    const min = this.min;
    const max = this.max;
    const step = this.step;
    this.inputLeftNative.value = Math.min(
      parseInt(this.leftThumbCtrl.value),
      parseInt(this.rightThumbCtrl.value) - step
    ) + '';
    const percent = ((parseInt(this.inputLeftNative.value) - min) / (max - min)) * 100;
    this.sliderThumbLeftNative.style.left = percent + '%';
    this.sliderRangeNative.style.left = percent + '%';
    this.emitControlsValue();
  }

  onRightChange() {
    const min = this.min;
    const max = this.max;
    const step = this.step;
    this.inputRightNative.value = Math.max(
      this.leftThumbCtrl.value + step,
      parseInt(this.rightThumbCtrl.value)) + '';
    const percent = ((parseInt(this.rightThumbCtrl.value) - min) / (max - min)) * 100;
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
