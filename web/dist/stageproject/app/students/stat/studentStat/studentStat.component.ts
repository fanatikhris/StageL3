import { StatService } from '../../../stat.service';
import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../../xml.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-studentStat',
  templateUrl: './studentStat.component.html',
  styleUrls: ['./studentStat.component.css']
})
export class StudentStatComponent implements OnInit {

  id; // id de l'étudiant sélectionné

  students: any[]; // liste des étudiants


  constructor(private xmlService: XmlService, private statService: StatService) { }

  ngOnInit() {
    this.loadStudents();
  }


  loadStudents() {
    this.students = this.xmlService.getStudentList();
  }

  click() {
    this.statService.setStudentStat(this.id);
  }

}
