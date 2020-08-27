import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPluginComponent } from './slider-plugin.component';

describe('SliderPluginComponent', () => {
  let component: SliderPluginComponent;
  let fixture: ComponentFixture<SliderPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
