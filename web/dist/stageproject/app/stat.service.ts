import { DateService } from './date.service';
import { XmlService } from './xml.service';
import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from './api.service';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);


@Injectable({
  providedIn: 'root'
})
export class StatService {



  dailyOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Répartition dans la journée de cours'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'moment de la journée',
      colorByPoint: true,
      data: [{
          name: 'matin',
          y: 0
      }, {
          name: 'apreès-midi',
          y: 0
      }]
  }]
  };

  typeOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Type de cours'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Types',
      colorByPoint: true,
      data: [{
          name: 'CM',
          y: 0
      }, {
          name: 'TD',
          y: 0
      }, {
          name: 'TP',
          y: 0
      }]
  }]
  };

  daysOptions: any = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Répartition par semaine'
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Jours',
      colorByPoint: true,
      data: [{
          name: 'Lundi',
          y: 0
      }, {
          name: 'Mardi',
          y: 0
      }, {
          name: 'Mercredi',
          y: 0
      }, {
          name: 'Jeudi',
          y: 0
      }, {
          name: 'Vendredi',
          y: 0
      }, {
          name: 'Samedi',
          y: 0
      }, {
          name: 'Dimanche',
          y: 0
      }]
  }]
  };

  type: number[];
  total: number;
  jours: number[];
  journee: number[];

constructor(private apiService: ApiService, private xmlService: XmlService, private dateService: DateService) {}

setStudentStat(id) {
  const classes = this.xmlService.getStudentClasses(id);
  this.setCourseStat(classes);
}

setRoomStat(id) {
  const classes = this.xmlService.getRoomClasses(id);
  this.setCourseStat(classes);
}

setUeStat(id) {
  const classes = this.xmlService.getUeSolClasses(id);
  this.setCourseStat(classes);
}

setTeacherStat(id) {
  this.apiService.getTeacherCourseById({id: id}).subscribe(
    (res) => {
      const classes = this.xmlService.getTeacherClasses(res);
      this.setCourseStat(classes);
    },
    (err) => {
      console.log(err);
    }
  )
  
}

setCourseStat(courses) {
  // console.log(courses);
  this.total = 0;
  this.type = [0, 0, 0];
  this.journee = [0, 0];
  this.jours = [];
  for (let i = 0; i < this.xmlService.getNbDays(); i++) {
    this.jours.push(0);
  }

  courses.forEach(course => {
    let weeks = course.attr.weeks;
    for (let week = this.xmlService.getNbWeeks() - 1; week >= 0; week--) {
      if (weeks % 2 === 1) {
        let days = course.attr.days;
        const nbDays = this.xmlService.getNbDays() - 1;
        for (let day = nbDays; day >= 0; day--) {

          if (days % 2 === 1) {
            this.jours[day] += 1;
            this.total += 1;

            const couleur = this.xmlService.getClassColor(course.attr.id);
            if (couleur === '#2dfc03') {
              this.type[2] += 1;
            } else if (couleur === '#fc8003') {
              this.type[1] += 1;
            } else if (couleur === '#fce303') {
              this.type[0] += 1;
            }

            if ( this.dateService.isMorning(course.attr.start - 1)) {
              this.journee[0] += 1;
            } else if ( this.dateService.isMorning(course.attr.start - 1) === false ) {
              this.journee[1] += 1;
            }

          }
          days = Math.floor(days / 10);
        }
      }
      weeks = Math.floor(weeks / 10);
    }
  });

  this.createStat();

}

createStat() {
  // tslint:disable-next-line: prefer-for-of
  for ( let i = 0; i < this.jours.length; i++) {
    this.daysOptions.series[0].data[i].y = this.jours[i] * 100 / this.total;
  }

  Highcharts.chart('containerDays', this.daysOptions);

  for ( let i = 0; i < this.type.length; i++) {
    this.typeOptions.series[0].data[i].y = this.type[i] * 100 / this.total;
  }

  Highcharts.chart('containerType', this.typeOptions);

  for ( let i = 0; i < this.journee.length; i++) {
    this.dailyOptions.series[0].data[i].y = this.journee[i] * 100 / this.total;
  }
  console.log(this.journee);
  Highcharts.chart('containerDaily', this.dailyOptions);
}

}
