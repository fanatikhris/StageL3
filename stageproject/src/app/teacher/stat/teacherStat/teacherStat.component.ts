import { Component, OnInit } from '@angular/core';
import { StatService } from '../../../stat.service';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-teacherStat',
  templateUrl: './teacherStat.component.html',
  styleUrls: ['./teacherStat.component.css']
})
export class TeacherStatComponent implements OnInit {

  id; // id de l'étudiant sélectionné



  teachers: any[]; // liste des étudiants

  constructor(private apiService: ApiService, private statService: StatService) {}




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
    this.statService.setTeacherStat(this.id);
  }


}
