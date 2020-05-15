/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UeStatComponent } from './ueStat.component';

describe('UeStatComponent', () => {
  let component: UeStatComponent;
  let fixture: ComponentFixture<UeStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
