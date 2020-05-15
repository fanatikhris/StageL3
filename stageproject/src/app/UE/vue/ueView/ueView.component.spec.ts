/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UeViewComponent } from './ueView.component';

describe('UeViewComponent', () => {
  let component: UeViewComponent;
  let fixture: ComponentFixture<UeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
