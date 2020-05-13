import { DateService } from '../../../date.service';
import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-timeTravel',
  templateUrl: './timeTravel.component.html',
  styleUrls: ['./timeTravel.component.css']
})
export class TimeTravelComponent implements OnInit {
  id1: any;
  id2: any;
  rooms: any[];
  nb: any;
  constructor(
    private xmlService: XmlService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.rooms = this.xmlService.getRoomList();
  }

  isValid() {
    return this.id1 === undefined || this.id2 === undefined || this.nb === undefined;
  }

  addTimeTravel() {
    const time = this.dateService.getTravelTime(this.nb);
    this.xmlService.addTravelTime(this.id1, this.id2, time);
    this.xmlService.addTravelTime(this.id2, this.id1, time);
    this.id1 = undefined;
    this.id2 = undefined;
    this.nb = undefined;
  }

}
