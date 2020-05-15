import { Component, OnInit } from '@angular/core';
import { XmlService } from '../xml.service';

declare var $: any;

$(document).on('click', '.uedrop', (event) => {
  event.stopPropagation();
});

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addStudentCourse',
  templateUrl: './addStudentCourse.component.html',
  styleUrls: ['./addStudentCourse.component.css']
})
export class AddStudentCourseComponent implements OnInit {

  stdFilter: string;
  ueFilt: string;

  allStudents = [];
  students = [];
  ues = [];
  allUes = [];
  choosenUes = [];
  choosenStudents = [];


  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.allStudents = this.xmlService.getStudentList();
    this.students = this.allStudents;
    this.allUes = this.xmlService.getUeList();
    this.ues = this.allUes;
  }

  isValid(): boolean {
    return this.choosenUes.length === 0 || this.choosenStudents.length === 0;
  }

  studentFilter(): void {
    const regex = `^${this.stdFilter}.*`;
    this.students = this.allStudents.filter( x => x.match(regex));
  }

  ueFilter(): void {
    const regex = `^${this.ueFilt}.*`;
    this.ues = this.allUes.filter( x => x.attr.id.match(regex));
  }

  stdIsActive(student): boolean {
    if (this.choosenStudents.indexOf(student) === -1) {
      return false;
    } else {
      return true;
    }
  }

  ueIsActive(ue): boolean {
    if (this.choosenUes.indexOf(ue) === -1) {
      return false;
    } else {
      return true;
    }
  }


  setStudent(student): void {
    const index = this.choosenStudents.indexOf(student);
    if (index === -1) {
      this.choosenStudents.push(student);
    } else {
      this.choosenStudents.splice(index, 1);
    }
  }

  setUe(ue): void {
    const index = this.choosenUes.indexOf(ue);
    if (index === -1) {
      this.choosenUes.push(ue);
    } else {
      this.choosenUes.splice(index, 1);
    }
  }

  addStudentCourse(): void {
    this.xmlService.addStudentsToUes(this.choosenUes, this.choosenStudents);
    this.choosenStudents = [];
    this.choosenUes = [];
    this.stdFilter = '';
    this.ueFilt = '';
    this.ueFilter();
    this.studentFilter();
  }



}
