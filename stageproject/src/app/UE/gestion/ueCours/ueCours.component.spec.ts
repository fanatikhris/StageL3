/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UeCoursComponent } from './ueCours.component';

describe('UeCoursComponent', () => {
  let component: UeCoursComponent;
  let fixture: ComponentFixture<UeCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
