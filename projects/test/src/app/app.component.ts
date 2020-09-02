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
  min = 1599033600000;
  max = 1599044400000;
  margin = 1800000;
  dates = new FormControl([1599033600000, 1599044400000]);
  constructor(private pipe: DatePipe) {
    // setTimeout(() => {
    //   this.min = 1598518800000;
    //   this.max = 1598522400000;
    //   this.dates.setValue([1598518800000, 1598522400000]);
    // }, 4000);
  }
  format(val, idx, length) {
    const mints = this.pipe.transform(val, 'mm');
    if (mints === '00') {
      return this.pipe.transform(val, 'HHmm');
    }
    return mints;
  }

  formatLabel(val) {
    return this.pipe.transform(val, 'HHmm');
  }
}
