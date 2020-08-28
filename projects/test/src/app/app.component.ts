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
  min = 1598414400000;
  max = 1598419800000;
  margin = 900000;
  dates = new FormControl([1598414400000, 1598419800000]);
  constructor(private pipe: DatePipe) {
    // setTimeout(() => {
    //   this.min = 1598518800000;
    //   this.max = 1598522400000;
    //   this.dates.setValue([1598518800000, 1598522400000]);
    // }, 4000);
  }
  format(val) {
    return this.pipe.transform(val, 'HHmm');
  }
}
