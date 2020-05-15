import { ApiService } from './api.service';
import { DateService } from './date.service';
import { XmlService } from './xml.service';
import { Injectable } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { Calendar, EventInput } from '@fullcalendar/core';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { Subject } from 'rxjs';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  draggable: Draggable;
  calendar: Calendar;
  event: EventInput[] = [];
  hasEvent: Subject<boolean> = new Subject<boolean>();
  id: any;
constructor(private xmlService: XmlService, private dateService: DateService , private apiService: ApiService) { }


// créer un calendrier editable, ayant une fonction de drag and drop et de resizement
createEditableCalendar(recurrence, newD) {
  this.hasEvent.next(false);
  const div: HTMLElement = document.querySelector('#calendar');
  div.innerHTML = '';
  const drag: HTMLElement = document.querySelector('#external-events');
  drag.innerHTML = '<p><strong>Placer le créneau</strong></p><div class=\'fc-event\'>créneau</div></div>';
  if (newD === true) {
    this.draggable = new Draggable(drag, {
      itemSelector: '.fc-event',
      eventData: eventEl => {
        return {
          title: eventEl.innerText
        };
      }
    });
  }

  if (recurrence) {

    this.calendar = new Calendar(div, {
      header: {
        left: '',
        center: '',
        right: ''
      },
      allDaySlot: false,
      events: [],
      height: 'auto',
      droppable: true,
      locales: [frLocale],
      locale: 'fr',
      views: {
        timeGridWeekOneDay: {
          type: 'timeGridWeek',
          duration: { days: 1},
          buttonText: '1 day'
        }
      },
      defaultView: 'timeGridWeekOneDay',
      plugins: [listPlugin, timeGridPlugin, interactionPlugin],
      minTime: '08:00',
      maxTime: '20:00',
      editable: true,
      weekNumbers: false,
      columnHeader: false,
      slotDuration: '00:20:00',
      drop: (info) => {
        this.hasEvent.next(true);
        drag.innerHTML = '<p><strong>Placer le créneau</strong></p></div>';
      }
    });
  } else {

    // console.log('tadaa');

    this.calendar = new Calendar(div, {
      header: {
        left: '',
        center: 'title',
        right: 'today prev,next'
      },
      allDaySlot: false,
      events: [],
      height: 'auto',
      droppable: true,
      locales: [frLocale],
      locale: 'fr',
      defaultView: 'timeGridWeek',
      plugins: [listPlugin, timeGridPlugin, interactionPlugin],
      minTime: '08:00',
      maxTime: '20:00',
      editable: true,
      weekNumbers: true,
      slotDuration: '00:10:00',
      drop: (info) => {
        this.hasEvent.next(true);
        drag.innerHTML = '<p><strong>Placer le créneau</strong></p></div>';
      }
    });
  }


  this.calendar.render();
}

// créer un calendrier avec suppression de créneau
createClassCalendar() {

  const div: HTMLElement = document.querySelector('#calendar');
  div.innerHTML = '';
  this.calendar = new Calendar(div, {
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'timeGridWeek,listWeek'
    },
    allDaySlot: false,
    events: this.event,
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    defaultView: 'timeGridWeek',
    plugins: [listPlugin, timeGridPlugin],
    minTime: '08:00',
    maxTime: '20:00',
    weekNumbers: true,
    slotDuration: '00:10:00',
    eventClick: (info) => {
      const isvalid = confirm('Etes vous sûr de vouloir suprimmer le créneau ?');
      if (isvalid === true) {
        this.removeTime(info.event.extendedProps.time);
        this.setClassEdt(this.id);
      }
    },
  });
  this.calendar.render();
}

// créer un calendrier avec la possibilité de supprimer un créneau
createTeacherCalendar() {

  const div: HTMLElement = document.querySelector('#calendar');
  div.innerHTML = '';
  this.calendar = new Calendar(div, {
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'timeGridWeek,listWeek'
    },
    allDaySlot: false,
    events: this.event,
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    defaultView: 'timeGridWeek',
    plugins: [listPlugin, timeGridPlugin],
    minTime: '08:00',
    maxTime: '20:00',
    weekNumbers: true,
    slotDuration: '00:10:00',
    eventClick: (info) => {
      console.log(info.event.extendedProps.time);
      const isvalid = confirm('Etes vous sûr de vouloir suprimmer le créneau ?');
      if (isvalid === true) {
        this.removeTeacherTime(info.event.extendedProps.time, info.event.start, info.event.end);
        this.setTeachersEdt(this.id);
      }
    },
    eventRender: (info) => {
      const index = info.event.title.indexOf('Salle');
      const e = info.el;
      $(e).popover({
        title: info.event.title.substring(0, index - 1),
        content: info.event.title.substring(index)
                 + '<br>Professeur: ' + info.event.extendedProps.professeur
                 + '<br>Groupe: ' + info.event.extendedProps.groupe,
        trigger: 'hover',
        html: true
      });

    },
  });
  this.calendar.render();
}

// supprime un créneau choisi par le professeur
removeTeacherTime(course, time, end) {
  this.xmlService.deleteSolClass(course);
  this.xmlService.deleteProbClass(course);
  this.xmlService.saveModifiedClass({
    class: course
  });
  // delete probclasse and add to modified classe
  const res = this.dateService.getDeletedTime(course, time, end);
  res[0].forEach(cours => {
    this.xmlService.addClassToSol(cours);
  });
  res[1].forEach(cours => {
    const ue = this.xmlService.getUeById(course.attr.id);
    const subpart = ue.config[0].subpart.find( x => x.attr.id === course.attr.id.split('_')[0] + '_' + course.attr.id.split('_')[1]);
    const classe = subpart.class.find( x => x.attr.id === course.attr.id);
    this.xmlService.addTimeToClass(ue, subpart, classe, cours);
  });
  this.xmlService.saveSol();
}

// créer un calendrier avec la possibilité de supprimer un crenau
createUnavailabilityCalendar() {

  const div: HTMLElement = document.querySelector('#calendar');
  div.innerHTML = '';
  this.calendar = new Calendar(div, {
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'timeGridWeek,listWeek'
    },
    allDaySlot: false,
    events: this.event,
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    defaultView: 'timeGridWeek',
    plugins: [listPlugin, timeGridPlugin],
    minTime: '08:00',
    maxTime: '20:00',
    weekNumbers: true,
    slotDuration: '00:10:00',
    eventClick: (info) => {
      const isvalid = confirm('Etes vous sûr de vouloir suprimmer le créneau ?');
      if (isvalid === true) {
        this.removeTimeUnabailability(info.event.extendedProps.time);
        this.setRoomUnavailabilityEdt(this.id);
      }
    },
  });
  this.calendar.render();
  console.log(this.calendar.getEvents());
}

removeTime(time) {
  this.xmlService.removeTimeFromClass(this.id, time);
}

removeTimeUnabailability(time) {
  this.xmlService.removeUnavaibiliyiFromRoom(this.id, time);
}

// créer un calendrier sans modiffication possible

createCalendar() {

  const div: HTMLElement = document.querySelector('#calendar');
  div.innerHTML = '';
  this.calendar = new Calendar(div, {
    header: {
      left: 'today prev,next',
      center: 'title',
      right: 'timeGridWeek,listWeek'
    },
    allDaySlot: false,
    events: this.event,
    height: 'auto',
    locales: [frLocale],
    locale: 'fr',
    defaultView: 'timeGridWeek',
    plugins: [listPlugin, timeGridPlugin],
    minTime: '08:00',
    maxTime: '20:00',
    weekNumbers: true,
    slotDuration: '00:20:00',
    eventRender: (info) => {
      const index = info.event.title.indexOf('Salle');
      const e = info.el;
      this.apiService.getCourseTeacher({id: info.event.extendedProps.id}).subscribe(
        (res) => {
          $(e).popover({
            title: info.event.title.substring(0, index - 1),
            content: info.event.title.substring(index)
                     + '<br>Professeur: ' + res[0]
                     + '<br>Groupe: ' + info.event.extendedProps.groupe,
            trigger: 'hover',
            html: true
          });
        },
        (err) => {
          console.log(err);
        }
      )
      

    },
  });
  this.calendar.render();
}

// retourne les evenements presents dans le calendrier
getEvents() {
  console.log(this.calendar.getEvents()[0]._instance.range);
    return this.dateService.getTimeNotRec(
      this.calendar.getEvents()[0]._instance.range,
      this.xmlService.getNbDays(),
      this.xmlService.getNbWeeks()
    );
}

// retourne un booleen en fonction de la presence ou non d'evenement dans le calendrier
hasEvents() {
  return this.calendar.getEvents.length === 0 ? false : true;
}


getEventsRec(daysval, weeksval) {
    return this.dateService.getTimeRec(
      this.calendar.getEvents()[0]._instance.range,
      this.xmlService.getNbDays(),
      this.xmlService.getNbWeeks(),
      daysval,
      weeksval
    );
}


setStudentEdt(id) {
  const classes = this.xmlService.getStudentClasses(id);
  this.setCourseEdt(classes, 'student');
}

setRoomEdt(id) {
  const classes = this.xmlService.getRoomClasses(id);
  this.setCourseEdt(classes, 'room');
}

setClassEdt(id) {
  this.id = id;
  const classes = this.xmlService.getClassTime(id);
  this.setClasseEdt(classes);
}

setRoomUnavailabilityEdt(id) {
  this.id = id;
  const classes = this.xmlService.getUnavailabilityTime(id);
  // console.log(classes);
  this.setUnavailableEdt(classes);
}

setClasseEdt(courses) {
  if (this.dateService.dateDebut === undefined) {
    alert('veuillez rentrer une date de début');
    return;
  }
  this.event = [];
  // console.log(courses);
  courses.forEach(course => {
    let weeks = +(course.attr.weeks);
    for (let week = this.xmlService.getNbWeeks() - 1; week >= 0; week--) {
      if (weeks % 2 === 1) {
        let days = +(course.attr.days);
        for (let day = this.xmlService.getNbDays() - 1; day >= 0; day--) {

          if (days % 2 === 1) {
            const date: string[] = this.dateService.getTimeInfo(+(day), +(week), +(course.attr.start - 1), +(course.attr.length));
            this.event.push({
              title: 'créneau',
              allDay: false,
              extendedProps: {
                time: course
              },
              start: date[0],
              end: date[1],
            });

          }
          days = Math.floor(days / 10);
        }
      }
      weeks = Math.floor(weeks / 10);
    }
  });
  this.createClassCalendar();
}

setUnavailableEdt(courses) {
  if (this.dateService.dateDebut === undefined) {
    alert('veuillez rentrer une date de début');
    return;
  }
  this.event = [];
  // console.log(courses);
  courses.forEach(course => {
    let weeks = +(course.attr.weeks);
    for (let week = this.xmlService.getNbWeeks() - 1; week >= 0; week--) {
      if (weeks % 2 === 1) {
        let days = +(course.attr.days);
        for (let day = this.xmlService.getNbDays() - 1; day >= 0; day--) {

          if (days % 2 === 1) {
            const date: string[] = this.dateService.getTimeInfo(+(day), +(week), +(course.attr.start - 1), +(course.attr.length));
            // console.log(date);
            this.event.push({
              title: 'créneau',
              allDay: false,
              extendedProps: {
                time: course
              },
              start: date[0],
              end: date[1],
            });

          }
          days = Math.floor(days / 10);
        }
      }
      weeks = Math.floor(weeks / 10);
    }
  });
  this.createUnavailabilityCalendar();
}

setTeachersEdt(idT) {
  this.apiService.getTeacherCourseById({
    id: idT
  }).subscribe(
    (res) => {
      const courses = this.xmlService.getTeacherClasses(res);
      this.id = idT;
      this.setCourseEdt(courses, 'teacher');
    }
  );
}



setUeEdt(id) {
  const classes = this.xmlService.getUeSolClasses(id);
  this.setCourseEdt(classes, 'ue');
}

setCourseEdt(courses, type) {
  if (this.dateService.dateDebut === undefined) {
    alert('veuillez rentrer une date de début');
    return;
  }
  this.event = [];
  // console.log(courses);
  for (const course of courses) {
    let weeks = +(course.attr.weeks);
    for (let week = this.xmlService.getNbWeeks() - 1; week >= 0; week--) {
      if (weeks % 2 === 1) {
        let days = +(course.attr.days);
        for (let day = this.xmlService.getNbDays() - 1; day >= 0; day--) {

          if (days % 2 === 1) {
            const courseInfo = this.xmlService.getCourseTitle(course);
            const couleur = this.xmlService.getClassColor(course.attr.id);
            const desc = courseInfo.concat(` - ${course.attr.id.split('_')[1]}\nSalle: ${course.attr.room}`);
            const duration = this.xmlService.getClassDuration(course);
            const date: string[] = this.dateService.getTimeInfo(+(day), +(week), +(course.attr.start - 1), +(duration));
            this.event.push({
              title: desc,
              allDay: false,
              start: date[0],
              end: date[1],
              color: couleur,
              extendedProps: {
                time: course,
                id: course.attr.id,
                groupe: course.attr.id.split('_')[2]
              }
            });

          }
          days = Math.floor(days / 10);
        }
      }
      weeks = Math.floor(weeks / 10);
    }
  }
  if (type === 'teacher') {
    this.createTeacherCalendar();
  } else {
    this.createCalendar();
  }
  console.log(this.event);
}
}
