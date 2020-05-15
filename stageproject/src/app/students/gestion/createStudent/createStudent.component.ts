import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-createStudent',
  templateUrl: './createStudent.component.html',
  styleUrls: ['./createStudent.component.css']
})
export class CreateStudentComponent implements OnInit {

  id = '';

  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
  }

  addStudent() {
    this.xmlService.addStudent(this.id);
    this.id = '';
  }

}
