import { Component, OnInit, Input } from '@angular/core';
import { XmlService } from '../../../xml.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-studentUeView',
  templateUrl: './studentUeView.component.html',
  styleUrls: ['./studentUeView.component.css']
})
export class StudentUeViewComponent implements OnInit {

  @Input() idUe;
  studentGlobalList = [];
  studentList = [];
  studentFiltre;

  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.studentGlobalList = this.xmlService.getUeStudentsList(this.idUe);
    this.studentList = this.studentGlobalList;
  }

  studentFilter() {
    this.studentList = this.studentGlobalList.filter( x => x.match(`${this.studentFiltre}.*`));
  }

}
