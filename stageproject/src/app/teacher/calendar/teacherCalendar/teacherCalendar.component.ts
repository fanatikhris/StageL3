import { ApiService } from './../../../api.service';
import { CalendarService } from './../../../calendar.service';
import { XmlService } from './../../../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacherCalendar',
  templateUrl: './teacherCalendar.component.html',
  styleUrls: ['./teacherCalendar.component.css']
})
export class TeacherCalendarComponent implements OnInit {

  id; // id de l'étudiant sélectionné

  teachers: any[]; // liste des étudiants

  constructor(private apiService: ApiService, private calendarService: CalendarService) {}

  ngOnInit() {
    this.loadTeachers();
  }


  loadTeachers() {
    this.apiService.getTeachers().subscribe(
      (res) => {
        this.teachers = res;
      }, (err) => {
        console.log(err);
      }
    );
  }

  click() {
    this.calendarService.setTeachersEdt(this.id);
  }

}
