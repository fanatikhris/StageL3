import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../../xml.service';
import { CalendarService } from '../../../calendar.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueCalendar',
  templateUrl: './ueCalendar.component.html',
  styleUrls: ['./ueCalendar.component.css']
})
export class UeCalendarComponent implements OnInit {
  form: FormGroup;
  ues: any[];
  id: any;

  constructor(private xmlService: XmlService, private calendarService: CalendarService) { }

  ngOnInit() {
    this.loadUe();
  }

  loadUe() {
    this.ues = this.xmlService.getUeList();

  }

  click() {
    this.calendarService.setUeEdt(this.id);
  }

}
