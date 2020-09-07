# Slider Plugin


<p align="center">
  <a href="https://twitter.com/__bangash"><img src="https://img.shields.io/twitter/follow/__bangash.svg?label=Follow"/></a>
</p>



## Installation

Run the following code in your terminal:

```
yarn add @ngx-slider-plugin
```

or if you are using npm:

```
npm install @ngx-slider-plugin
```

## Usage

### Setup Before Initial Use

Import `ngx-slider-plugin` into your root module like:

```TS
import { SliderPluginModule } from 'ngx-slider-plugin';

@NgModule({
  imports: [
    SliderPluginModule,
  ]
})
export class AppModule {}
```

```html
    <ngx-slider-plugin [pipeFormatFn]="format" pipeDensity="11" [labelFormatFn]="format"  [step]="step" [min]="min" [max]="max" [formControl]="dates" [margin]="margin"></ngx-slider-plugin>
```

```TS
  format(val){
    return val+'h';
  }
```
### License and copy right
&copy; Shahid Ahmad

License under the [MIT License](LICENSE).
