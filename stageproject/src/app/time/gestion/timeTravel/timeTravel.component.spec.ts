/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeTravelComponent } from './timeTravel.component';

describe('TimeTravelComponent', () => {
  let component: TimeTravelComponent;
  let fixture: ComponentFixture<TimeTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
