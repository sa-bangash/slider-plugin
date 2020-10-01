import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    DatePipe
  ]
})
export class AppComponent {
  step = 900000;
  max = 1600244760000;
  min = 1600239360000;
  margin = 1800000;
  dates = new FormControl([this.min, this.max]);
  constructor(private pipe: DatePipe) {
    setTimeout(() => {
      this.min = 1601521200000;
      this.max = 1601557200000;
      this.dates.setValue([1601521200000, 1601557200000]);
    }, 3000);
  }
  format(val, idx, length) {
    // return val;
    const mints = this.pipe.transform(val, 'mm');
    // if (mints === '00') {
    //   return this.pipe.transform(val, 'HHmm');
    // }
    return mints;
  }

  formatLabel(val) {
    // return val;
    return this.pipe.transform(val, 'HHmm');
  }
}
