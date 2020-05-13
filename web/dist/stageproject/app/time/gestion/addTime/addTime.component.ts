import { days } from '../../../data';
import { CalendarService } from '../../../calendar.service';
import { XmlService } from '../../../xml.service';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addTime',
  templateUrl: './addTime.component.html',
  styleUrls: ['./addTime.component.css']
})
export class AddTimeComponent implements OnInit {
  idCours: any;
  idUe: { attr: {id: string }, config: { subpart: any[]; }[]; };
  id: string;
  subpart: { class: any[]; };
  timeForm: FormGroup;
  recurrence = false;
  days = days;
  weeks: number[];
  hasEvent: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private xmlService: XmlService,
    private calendarService: CalendarService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.calendarService.hasEvent.subscribe(value => this.hasEvent = value);
  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.weeks = [];
    for (let i = 1; i <= this.xmlService.getNbWeeks(); i++) {
      this.weeks.push(i);
    }
    this.timeForm = this.formBuilder.group({
      pref: ['', [Validators.required]],
      days: new FormArray([], [Validators.required]),
      weeks: new FormArray([], [Validators.required])
    });
    this.idUe = this.xmlService.getUeById(this.id);
    this.setCours();
    await this.delay(10);
    this.setCalendar(true);
  }

  reset() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.weeks = [];
    for (let i = 1; i <= this.xmlService.getNbWeeks(); i++) {
      this.weeks.push(i);
    }
    this.timeForm = this.formBuilder.group({
      pref: ['', [Validators.required]],
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
    return (
      this.idUe !== undefined
      && this.idCours !== undefined
      && this.timeForm.get('pref').value !== ''
      && this.hasEvent
    );
  }



  setCours() {
    this.subpart = this.idUe.config[0].subpart.find( (x: { class: any[]; }) => x.class.find( (y: { attr: { id: any; }; }) => y.attr.id === this.id));
    this.idCours = this.subpart.class.find( (x: { attr: { id: any; }; }) => x.attr.id === this.id);
  }


  toggleRec() {
    this.setCalendar(false);
  }

  onCheckboxChange(e: { target: { checked: any; value: any; }; }, val: string | (string | number)[]) {
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

  addTime() {
    let events: { attr: any; };
    if (this.recurrence) {
      events = this.calendarService.getEventsRec(
        this.timeForm.get('days').value,
        this.timeForm.get('weeks').value
      );
    } else {
      events = this.calendarService.getEvents();
    }

    if (events !== undefined) {
      events.attr.penalty = `${this.timeForm.get('pref').value}`;


      // console.log(events);
      this.xmlService.addTimeToClass(this.idUe, this.subpart, this.idCours, events);
      this.recurrence = false;
      this.reset();
    }
  }

}
