/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TimeViewComponent } from './timeView.component';

describe('TimeViewComponent', () => {
  let component: TimeViewComponent;
  let fixture: ComponentFixture<TimeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
