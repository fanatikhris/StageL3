import { CalendarService } from '../../../calendar.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-timeView',
  templateUrl: './timeView.component.html',
  styleUrls: ['./timeView.component.css']
})
export class TimeViewComponent implements OnInit {

  @Input() idClass;


  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.calendarService.setClassEdt(this.idClass);
  }

  removeTime(time) {
    console.log(time);
  }

}
