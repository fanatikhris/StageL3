
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-classInfo',
  templateUrl: './classInfo.component.html',
  styleUrls: ['./classInfo.component.css']
})
export class ClassInfoComponent implements OnInit {

  idClass;
  vue;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idClass = this.activatedRoute.snapshot.paramMap.get('id');
  }

  setView(type) {
    // console.log(this.vue);
    this.vue = type;
  }


}
