import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../../xml.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-studentView',
  templateUrl: './studentView.component.html',
  styleUrls: ['./studentView.component.css']
})
export class StudentViewComponent implements OnInit {

  studentGlobalList = [];
  studentList = [];
  studentFiltre;

  constructor(
    private xmlService: XmlService,
  ) { }

  ngOnInit() {
    this.studentGlobalList = this.xmlService.getStudentList();
    this.studentList = this.studentGlobalList;
  }

  studentFilter() {
    this.studentList = this.studentGlobalList.filter( x => x.match(`${this.studentFiltre}.*`));
  }

}
