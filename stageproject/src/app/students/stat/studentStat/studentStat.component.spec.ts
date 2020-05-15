/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentStatComponent } from './studentStat.component';

describe('StudentStatComponent', () => {
  let component: StudentStatComponent;
  let fixture: ComponentFixture<StudentStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
