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
  max = 1599451200000;
  min = 1599454800000;
  margin = 1800000;
  dates = new FormControl([this.min, this.max]);
  constructor(private pipe: DatePipe) {
    setTimeout(() => {
      this.min = 1599451200000;
      this.max = 1599462000000;
      this.dates.setValue([1599451200000, 1599462000000]);
    }, 4000);
  }
  format(val, idx, length) {
    // return val;
    const mints = this.pipe.transform(val, 'mm');
    if (mints === '00') {
      return this.pipe.transform(val, 'HHmm');
    }
    return mints;
  }

  formatLabel(val) {
    // return val;
    return this.pipe.transform(val, 'HHmm');
  }
}
