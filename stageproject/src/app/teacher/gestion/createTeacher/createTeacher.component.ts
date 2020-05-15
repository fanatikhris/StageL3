import { ApiService } from '../../../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-createTeacher',
  templateUrl: './createTeacher.component.html',
  styleUrls: ['./createTeacher.component.css']
})
export class CreateTeacherComponent implements OnInit {

  id = '';

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  addTeacher() {
    this.apiService.addTeacher({
      id: this.id
    }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.id = '';
  }

}
