import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DateService {

dateSet: Subject<boolean> = new Subject<boolean>();

dateDebut = new Date(2020, 4, 27, 0, 0, 0);
timeCoeff: number;

constructor() { this.dateSet.next(false); }



initDate(dateDebut: string): void { // initialise la date de départ 
  this.dateDebut = new Date(1995, 11, 17, 0, 0, 0);
  const year = +(dateDebut.substring(0, 4));
  const month = +(dateDebut.substring(5, 7));
  const day = +(dateDebut.substring(8, 10));
  console.log(this.dateDebut);
  this.dateDebut.setFullYear(year);
  this.dateDebut.setMonth(month - 1);
  this.dateDebut.setDate(day);
  console.log(this.dateDebut);

  this.dateSet.next(true);
  // console.log(this.timeCoeff);
}


//initialise le coefficient de temps
initTimeCoeff(slotPerDay: number) {
  this.timeCoeff = (24 * 60) / slotPerDay;
}

// retourne le temps formatté
getTravelTime(time) {
  return `${+(time) / this.timeCoeff}`;
}

// retourne le temps déformatté
getTime(time) {
  return +(time) * this.timeCoeff;
}

// retourne les valeurs de temps lors d'un ajout recursif
getTimeRec(range, nrDays, nrWeeks, daysv, weeksv) {
  const daysval = this.getDays(daysv, nrDays - 1);
  const weeksval = this.getWeeks(weeksv, nrWeeks - 1);

  const startval = 1 +  ((range.start.getHours() - 2) * 60 + range.start.getMinutes()) / this.timeCoeff;
  const lengthval = (range.end.getTime() - range.start.getTime()) / (1000 * 60 * this.timeCoeff);

  return {
    attr: {
      start: `${startval}`,
      length: `${lengthval}`,
      days: daysval,
      weeks: weeksval
    }
  };
}

// retourne le crenau a supprimer pour ne supprimer qu'un creneau s'il est récursif
getDeletedTime(course, time, end) {
  console.log(course);
  const dayfrombegining = Math.trunc((time.getTime() - this.dateDebut.getTime()) / (1000 * 3600 * 24));
  const day = dayfrombegining % 7;
  console.log(day);
  const week = Math.floor(dayfrombegining / 7);
  // course without week
  const weeks = course.attr.weeks.split('');
  weeks[week] = '0'
  course.attr.weeks = weeks.join('');
  // week without day
  const course1 = JSON.parse(JSON.stringify(course));
  const we = []
  for (let i = 0; i < course.attr.weeks.length; i++ ) {
    if(week !== i) {
      we.push('0');
    } else {
      we.push('1');
    }
  }
  course1.attr.weeks = we.join('');
  const days = course.attr.days.split('');
  days[day] = '0'
  course1.attr.days = days.join('');

  const length = (end.getTime() - time.getTime()) / (1000 * 60 * this.timeCoeff);
  console.log(length);
  const res = [[course],[{
    attr: {
      start: course.attr.start,
      days: course.attr.days,
      length: `${length}`,
      weeks: course.attr.weeks,
      penalty: '0'
    }
  }]];
  if (+(course1.attr.days) !== 0) {
    res[0].push(course1);
    res[1].push({
      attr: {
        start: course1.attr.start,
        days: course1.attr.days,
        length: `${length}`,
        weeks: course1.attr.weeks,
        penalty: '0'
      }
    });
  }


  return res;
}

// retourne les valeurs de temps pour un créneau a ajouter non recursif
getTimeNotRec(range, nrDays, nrWeeks) {
  if (this.dateDebut === undefined) {
    alert('Veuillez entrer une date de début');
    return;
  } else {
    const dayfrombegining = Math.trunc((range.start.getTime() - this.dateDebut.getTime()) / (1000 * 3600 * 24));
    const day = dayfrombegining % 7;
    const week = Math.floor(dayfrombegining / 7);
    let daysval = '';
    let weeksval = '';
    for (let i = 0; i < nrDays; i++) {
      if (i === day) {
        daysval += '1';
      } else {
        daysval += '0';
      }
    }
    for (let i = 0; i < nrWeeks; i++) {
      if (i === week) {
        weeksval += '1';
      } else {
        weeksval += '0';
      }
    }

    const startval = 1 + ((range.start.getHours() - 2) * 60 + range.start.getMinutes()) / this.timeCoeff;
    const lengthval = (range.end.getTime() - range.start.getTime()) / (1000 * 60 * this.timeCoeff);

    return {
      attr: {
        start: `${startval}`,
        length: `${lengthval}`,
        days: daysval,
        weeks: weeksval
      }
    };
  }
}



// tslint:disable-next-line: no-shadowed-variable
// dit si le créneau se passe le matin
isMorning(start): boolean {
  console.log(start * this.timeCoeff);
  if (start * this.timeCoeff < (12 * 60)) {
    return true;
  } else {
    return false;
  }
}

// retourne les jours du creneau formatté pour le xml
getDays(days, maxDays) {
  let resn = 0;
  for (const day of days) {
    resn += 1 * Math.pow(10, maxDays - day);
  }
  let res = resn.toString();
  for (let i = res.length; i <= maxDays; i++) {
    res = '0' + res;
  }
  return res;
}

getWeeks(weeks, maxWeeks) {
  let resn = 0;
  for (const week of weeks) {
    resn += 1 * Math.pow(10, maxWeeks - week);
  }
  let res = resn.toString();

  for (let i = res.length; i <= maxWeeks; i++) {
    res = '0' + res;
  }

  return res;
}

// tslint:disable-next-line: no-shadowed-variable
getStart(start) {
  let res = +(start.substring(0, 2)) * 60;
  res += +(start.substring(3, 5));
  return res / this.timeCoeff;
}

getDuration(duration) {
  let res = +(duration.substring(0, 2)) * 60;
  res += +(duration.substring(3, 5));
  return res / this.timeCoeff;
}

// retourn les infos temporelles formaté pour le calendrier
// tslint:disable-next-line: no-shadowed-variable
getTimeInfo(day, week, start, duration): string[] {

  // récupere la date du cours au format 'yyyy-mm-dd'
  const datePipe = new DatePipe('fr-FR');
  const date = new Date();
  date.setFullYear(this.dateDebut.getFullYear());
  date.setMonth(this.dateDebut.getMonth());
  date.setDate(this.dateDebut.getDate() + 7 * week + day);
  console.log(this.dateDebut.getDate());
  const dateCours = datePipe.transform(date, 'yyyy-MM-dd');

  // récupere l'heure de commencement du cours au format 'hh:mm:ss'
  const debutCoursDate = new Date(date);
  debutCoursDate.setHours(0);
  debutCoursDate.setSeconds(0);
  debutCoursDate.setMinutes(start * this.timeCoeff);
  const debutCoursString = datePipe.transform(debutCoursDate, 'HH:mm:ss');

  // récupere l'heure de fin du cours au format 'hh:mm:ss'
  const finCoursDate = new Date(date);
  finCoursDate.setHours(0);
  finCoursDate.setSeconds(0);
  finCoursDate.setMinutes((start + duration) * this.timeCoeff);
  const finCoursString = datePipe.transform(finCoursDate, 'HH:mm:ss');

  // récupere la date et heure de debut et fin du cours au format compréhensible par fullCalendar
  const debutCours = dateCours.concat(`T${debutCoursString}`);
  const finCours = dateCours.concat(`T${finCoursString}`);
  const result = [
    debutCours,
    finCours
  ];


  return result;

}



}
