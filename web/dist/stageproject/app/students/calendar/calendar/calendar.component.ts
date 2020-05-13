import { CalendarService } from '../../../calendar.service';
import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';






@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  id; // id de l'étudiant sélectionné



  students: any[]; // liste des étudiants






  constructor(private xmlService: XmlService, private calendarService: CalendarService) {}




  ngOnInit() {
    this.loadStudents();
  }


  loadStudents() {
    this.students = this.xmlService.getStudentList();
  }

  click() {
    this.calendarService.setStudentEdt(this.id);
  }


}
