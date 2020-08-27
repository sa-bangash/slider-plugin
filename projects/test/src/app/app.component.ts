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
  title = 'test';
  dates = new FormControl([1598414400000, 1598419800000]);
  constructor(private pipe: DatePipe) {

  }
  format(val) {
    return this.pipe.transform(val, 'HHmm');
  }
}
