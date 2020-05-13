/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UeConfigComponent } from './ueConfig.component';

describe('UeConfigComponent', () => {
  let component: UeConfigComponent;
  let fixture: ComponentFixture<UeConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
