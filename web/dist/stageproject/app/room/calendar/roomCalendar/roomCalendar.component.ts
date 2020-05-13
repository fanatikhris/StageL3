import { CalendarService } from '../../../calendar.service';
import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-roomCalendar',
  templateUrl: './roomCalendar.component.html',
  styleUrls: ['./roomCalendar.component.css']
})
export class RoomCalendarComponent implements OnInit {

  rooms: any[];
  id;

  constructor(private xmlService: XmlService, private calendarService: CalendarService) { }

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms() {
    this.rooms = this.xmlService.getRoomList();
    console.log(this.rooms);
  }

  click() {
    this.calendarService.setRoomEdt(this.id);
  }
}
