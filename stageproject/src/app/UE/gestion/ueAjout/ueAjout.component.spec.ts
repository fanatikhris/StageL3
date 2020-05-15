/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UeAjoutComponent } from './ueAjout.component';

describe('UeAjoutComponent', () => {
  let component: UeAjoutComponent;
  let fixture: ComponentFixture<UeAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UeAjoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UeAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
