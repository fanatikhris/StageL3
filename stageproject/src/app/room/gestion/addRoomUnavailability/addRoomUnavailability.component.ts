import { days } from '../../../data';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { XmlService } from '../../../xml.service';
import { CalendarService } from '../../../calendar.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addRoomUnavailability',
  templateUrl: './addRoomUnavailability.component.html',
  styleUrls: ['./addRoomUnavailability.component.css']
})
export class AddRoomUnavailabilityComponent implements OnInit {

  idRoom: string;
  timeForm: FormGroup;
  recurrence = false;
  days = days;
  weeks: number[];
  hasEvent: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private xmlService: XmlService,
    private calendarService: CalendarService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.idRoom = this.activatedRoute.snapshot.paramMap.get('id');
    this.calendarService.hasEvent.subscribe( val => this.hasEvent = val);
    this.weeks = [];
    for (let i = 1; i <= this.xmlService.getNbWeeks(); i++) {
      this.weeks.push(i);
    }
    this.timeForm = this.formBuilder.group({
      days: new FormArray([], [Validators.required]),
      weeks: new FormArray([], [Validators.required])
    });
    await this.delay(10);
    this.setCalendar(true);
  }

  reset() {
    this.timeForm = this.formBuilder.group({
      days: new FormArray([], [Validators.required]),
      weeks: new FormArray([], [Validators.required])
    });
    this.setCalendar(false);
  }

  setCalendar(newD: boolean) {
    this.calendarService.createEditableCalendar(this.recurrence, newD);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }

  valid() {
    return (this.idRoom !== undefined && this.hasEvent);
  }


  toggleRec() {
    this.setCalendar(false);
  }

  onCheckboxChange(e: { target: { checked: any; value: any; }; }, val: string) {
    const checkArray: FormArray = this.timeForm.get(val) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });

    }
    console.log(this.timeForm.get(val).value);
  }

  addTravelTime() {
    let events: { attr: { start: string; length: string; days: string; weeks: string; } | { start: string; length: string; days: string; weeks: string; }; };
    if (this.recurrence) {
      events = this.calendarService.getEventsRec(
        this.timeForm.get('days').value,
        this.timeForm.get('weeks').value,
      );
    } else {
      events = this.calendarService.getEvents();
    }

    if (events !== undefined) {
      this.xmlService.addUnavailability(this.idRoom, events);
      this.recurrence = false;
      this.reset();

    }
  }

}
