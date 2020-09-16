// tslint:disable: radix
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'ngx-slider-plugin',
  templateUrl: './slider-plugin.component.html',
  styleUrls: ['./slider-plugin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
  @HostBinding('class') class = 'host-slider';

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
  pipeFormatFn: (value: number, idx: number, length: number) => string;

  @Input()
  labelFormatFn: (value: number) => string;

  @Input()
  set pipeDensity(val) {
    this._density = parseInt(val);
  }
  get pipeDensity() {
    return this._density;
  }
  private _density: any;
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
      const isSet = (this.LeftValue + this.margin <= val);
      if (isSet) {
        this.rightThumbCtrl.setValue(val);
      }
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
  makeRightThumbLeft() {
    this.rightThumbCtrl.setValue(this.min);
    this.sliderThumbRightNative.style.left = '0%';
    this.sliderRangeNative.style.width = '0px';
  }

  makelefthumbLeft() {
    this.leftThumbCtrl.setValue(this.min);
    this.sliderThumbLeftNative.style.left = '0%';
    this.sliderRangeNative.style.width = '0px';
  }

  onLeftChange() {
    if (this.min > this.max) {
      return this.makelefthumbLeft();
    }
    if (this.getDiff() <= this.margin) {
      this.leftThumbCtrl.setValue(this.RightValue - this.margin);
    }
    if (!this.margin) {
      this.leftThumbCtrl.setValue(
        Math.min(
          parseInt(this.leftThumbCtrl.value),
          parseInt(this.rightThumbCtrl.value)
        )
      );
    }
    const percent = ((parseInt(this.leftThumbCtrl.value) - this.min) / (this.max - this.min)) * 100;
    this.sliderThumbLeftNative.style.left = Math.floor(percent) + '%';
    this.sliderRangeNative.style.left = Math.floor(percent) + '%';
    this.emitControlsValue();
  }

  onRightChange() {
    if (this.min > this.max) {
      return this.makeRightThumbLeft();
    }
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
    this.sliderThumbRightNative.style.left = null;
    this.sliderThumbRightNative.style.right = Math.floor(100 - percent) + '%';
    this.sliderRangeNative.style.right = Math.floor(100 - percent) + '%';
    this.emitControlsValue();
  }

  onRangeClick(event: MouseEvent, track?: HTMLElement) {
    if (this.step) {
      return;
    }
    const { clientX } = event;
    const target = track || event.target;
    const { left, width } = (target as HTMLElement).getBoundingClientRect();
    const pre = Math.floor(((clientX - left) / width) * 100);
    const val = ((pre / 100) * (this.max - this.min)) + this.min;
    this.setNearsetValue(val);
    this.onRender();
  }

  pipeFormat(val, idx, data: any[] = []) {
    if (this.pipeFormatFn) {
      return this.pipeFormatFn(val, idx, data.length);
    }
    return val;
  }

  getPipeLabelStyle(value) {
    const percent = ((parseInt(value) - this.min) / (this.max - this.min)) * 100;
    return {
      left: Math.floor(percent) + '%',
      transform: 'translateX(-40%)'
    };
  }
  generatePipesLabel() {
    const values = [];
    const half = this.step / 2;
    const density = this.pipeDensity === 1 ? this.pipeDensity + 1 : this.pipeDensity;
    const cal = (this.max - this.min) / (density + 1);
    const countStep = (this.max - this.min) / this.step;
    if (countStep < 12) {
      for (let i = this.min; i <= this.max; i = i + this.step) {
        if (i > this.max) {
          values.push(this.max);
        } else {
          values.push(i);
        }
      }
      return values;
    }

    for (let i = this.min + cal; i < this.max; i = i + cal) {
      let val;
      const reminder = i % this.step;
      if (reminder < half) {
        val = i - reminder;
        if (val < this.min) {
          val = this.min;
        }
      } else {
        val = (i - reminder) + this.step;
        if (val > this.max) {
          val = this.max;
        }
      }
      values.push(Math.floor(val));
    }
    values.push(this.min);
    values.push(this.max);
    return values;
  }

  onRender() {
    this.onLeftChange();
    this.onRightChange();
  }

  jumpTo(val: number) {
    this.setNearsetValue(val);
    this.onRender();
  }

  labelFormat(val) {
    if (this.labelFormatFn) {
      return this.labelFormatFn(val);
    }
    return val;
  }

  trackByFn(i: number) {
    return i;
  }
}
