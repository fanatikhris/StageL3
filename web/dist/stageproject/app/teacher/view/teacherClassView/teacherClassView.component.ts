import { ApiService } from './../../../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-teacherClassView',
  templateUrl: './teacherClassView.component.html',
  styleUrls: ['./teacherClassView.component.css']
})
export class TeacherClassViewComponent implements OnInit {
  id;
  classList;
  classGlobalList;
  classFiltre;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getTeacherCourseById({ id: this.id}).subscribe(
      (res) => {
        this.classGlobalList = res;
        this.classList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  classFilter() {
    this.classList = this.classGlobalList.filter( x => x.match(`${this.classFiltre}.*`));
  }

}
