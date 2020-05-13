import { CalendarService } from './../../../calendar.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-timeUnavailabilityView',
  templateUrl: './timeUnavailabilityView.component.html',
  styleUrls: ['./timeUnavailabilityView.component.css']
})
export class TimeUnavailabilityViewComponent implements OnInit {

  @Input() id: any;


  constructor(
    private calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.calendarService.setRoomUnavailabilityEdt(this.id);
  }

  removeTime(time) {
    console.log(time);
  }
}
