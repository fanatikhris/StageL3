/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RoomClassViewComponent } from './roomClassView.component';

describe('RoomClassViewComponent', () => {
  let component: RoomClassViewComponent;
  let fixture: ComponentFixture<RoomClassViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomClassViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
