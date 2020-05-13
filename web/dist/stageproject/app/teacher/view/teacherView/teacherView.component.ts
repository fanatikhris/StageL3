import { ApiService } from './../../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-teacherView',
  templateUrl: './teacherView.component.html',
  styleUrls: ['./teacherView.component.css']
})
export class TeacherViewComponent implements OnInit {

  teacherGlobalList = [];
  teacherList = [];
  teacherFiltre;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getTeachers().subscribe(
      (res) => {
        this.teacherGlobalList = res;
        this.teacherList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  teacherFilter() {
    this.teacherList = this.teacherGlobalList.filter( x => x.match(`${this.teacherFiltre}.*`));
  }

}
