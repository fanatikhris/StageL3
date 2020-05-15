import { XmlService } from './../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-setOptimization',
  templateUrl: './setOptimization.component.html',
  styleUrls: ['./setOptimization.component.css']
})
export class SetOptimizationComponent implements OnInit {

  time;
  room;
  distri;
  student;
  opti;

  constructor(private xmlService: XmlService) { }

  ngOnInit() {
    this.opti = this.xmlService.getOpti();
  }

  isValid() {
    return this.time !== undefined && this.room !== undefined && this.distri !== undefined && this.student !== undefined;
  }

  setOpti() {
    this.opti.attr.time = `${this.time}`;
    this.opti.attr.room = `${this.room}`;
    this.opti.attr.distribution = `${this.distri}`;
    this.opti.attr.student = `${this.student}`;
    this.xmlService.setOpti(this.opti);
    this.time = undefined;
    this.room = undefined;
    this.distri = undefined;
    this.student = undefined;
  }

}
