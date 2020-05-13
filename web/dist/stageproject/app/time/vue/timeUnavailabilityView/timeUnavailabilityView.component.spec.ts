/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeUnavailabilityViewComponent } from './timeUnavailabilityView.component';

describe('TimeUnavailabilityViewComponent', () => {
  let component: TimeUnavailabilityViewComponent;
  let fixture: ComponentFixture<TimeUnavailabilityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeUnavailabilityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeUnavailabilityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
