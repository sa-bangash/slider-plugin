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
  margin: number;
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

  @Input('margin')
  set Margin(val: string) {
    this.margin = parseInt(val);
  }

  @Input()
  formatFn: (value: number) => any;
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

  get LeftValue(): number {
    return parseInt(this.leftThumbCtrl.value);
  }

  get RightValue(): number {
    return parseInt(this.rightThumbCtrl.value);
  }

  getLeftDiff(val: number): number {
    return Math.abs(val - this.LeftValue);
  }

  getRightDiff(val: number): number {
    return Math.abs(this.RightValue - val);
  }

  setNearsetValue(val: number) {
    if (this.getLeftDiff(val) < this.getRightDiff(val)) {
      this.leftThumbCtrl.setValue(val);
    } else {
      this.rightThumbCtrl.setValue(val);
    }
  }
  writeValue(obj: any): void {
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
        this.leftThumbCtrl.setValue(obj[0]);
        this.rightThumbCtrl.setValue(obj[1]);
        this.onLeftChange();
        this.onRightChange();
      });
    }
  }

  emitControlsValue() {
    this.onChange([this.leftThumbCtrl.value, this.rightThumbCtrl.value]);
  }
  ngAfterViewInit(): void {
  }
  getDiff(): number {
    return this.RightValue - this.LeftValue;
  }
  onLeftChange() {
    if (this.getDiff() <= this.margin) {
      this.leftThumbCtrl.setValue(this.RightValue - this.margin);
    }
    if (!this.margin) {
      this.leftThumbCtrl.setValue(
        Math.min(
          parseInt(this.leftThumbCtrl.value),
          parseInt(this.rightThumbCtrl.value)
        )
      )
    }
    const percent = ((parseInt(this.leftThumbCtrl.value) - this.min) / (this.max - this.min)) * 100;
    this.sliderThumbLeftNative.style.left = percent + '%';
    this.sliderRangeNative.style.left = percent + '%';
    this.emitControlsValue();
  }

  onRightChange() {
    if (this.getDiff() <= this.margin) {
      this.rightThumbCtrl.setValue(this.LeftValue + this.margin);
    }
    if (!this.margin) {
      this.rightThumbCtrl.setValue(
        Math.max(
          parseInt(this.leftThumbCtrl.value), parseInt(this.rightThumbCtrl.value)
        )
      );
    }
    const percent = ((parseInt(this.rightThumbCtrl.value) - this.min) / (this.max - this.min)) * 100;
    this.sliderThumbRightNative.style.right = (100 - percent) + '%';
    this.sliderRangeNative.style.right = (100 - percent) + '%';
    this.emitControlsValue();
  }

  onRangeClick(event: MouseEvent, track?: HTMLElement) {
    const { clientX } = event;
    const target = track || event.target;
    const { left, width } = (target as HTMLElement).getBoundingClientRect();
    const pre = Math.floor(((clientX - left) / width) * 100);
    const val = ((pre / 100) * (this.max - this.min)) + this.min;
    this.setNearsetValue(val);
    this.onRender();
  }

  formatValue(val) {
    if (this.formatFn) {
      return this.formatFn(val);
    }
    return val;
  }

  totalStep() {
    const value = [];
    for (let i = this.min; i <= this.max; i = i + this.step) {
      value.push(i);
    }
    return value;
  }
  onRender() {
    this.onLeftChange();
    this.onRightChange();
  }
  jumpTo(val: number) {
    this.setNearsetValue(val);
    this.onRender();
  }
}
