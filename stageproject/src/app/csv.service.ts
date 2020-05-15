import { XmlService } from './xml.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
// tslint:disable-next-line: max-line-length
csvfile = '';
csvarray: any[];
constructor(
  private papa: Papa,
  private http: HttpClient,
  private apiService: ApiService,
  private xmlService: XmlService
) {}

setFile(e) {
  this.csvfile = e;
  console.log(e);
}

getCsvFile() {

  const options = {
    complete: (results, file) => {
        this.csvarray = results.data;
        this.addTeacher();
        this.addUe();

    }

  };
  this.papa.parse(this.csvfile, options);
}


addUe() {
  let prec = 0;
  let current = 0;
  const res = [];
  this.csvarray[1].forEach(UE => {
    if (UE !== '') {
      prec = current;
      current = this.csvarray[1].indexOf(UE);



      if (res.length >= 1) {
        for (let i = prec; i < current; i++) {
          const cours = [];

          // teacher
          const teachers = [];
          for (let j = 7; j < this.csvarray.length; j++) {
            if (this.csvarray[j][i] !== '') {
              for ( let k = 0; k < Math.round(+(this.csvarray[j][i])); k++) {
                teachers.push(this.csvarray[j][0]);
              }
            }
          }


          if (this.csvarray[5][i] === '1') {
            cours.push({
              attr: {
                id: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + '_promo'
              },
              time: [],
              room: []
            });

            this.apiService.setTeacherCourse([{
              teacher: teachers[0],
              course: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + '_promo'
            }]).subscribe(
              (resultat) => {
                console.log(resultat);
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            for (let j = 1; j <= +(this.csvarray[5][i]); j++) {
              cours.push({
                attr: {
                  id: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + `_${j}`
                },
                time: [],
                room: []
              });
              this.apiService.setTeacherCourse([{
                teacher: teachers[j - 1],
                course: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + `_${j}`
              }]).subscribe(
                (resultat) => {
                  console.log(resultat);
                },
                (err) => {
                  console.log(err);
                }
              );
            }
          }
          res[res.length - 1].config[0].subpart.push({
            attr: {
              id: res[res.length - 1].attr.id + '_' + this.csvarray[3][i]
            },
            class: cours
          });
        }
      }

      if (!UE.includes('Option')) {

        res.push({
          attr: {
            id: UE.split(' ').join('-')
          },
          config: [{
            attr: {
              id: UE.split(' ').join('-') + '_config'
            },
            subpart: []
          }]
        });
        console.log(res);
      } else {
        for ( let m = current; m < this.csvarray[2].length; m++) {
          if (this.csvarray[1][m] !== '' && !this.csvarray[1][m].includes('Option')) {
            break;
          }
          if (this.csvarray[2][m] !== '') {
            prec = current;
            current = m;
            if (res.length >= 1) {
              for (let i = prec; i < current; i++) {
                const cours = [];

                // teacher
                const teachers = [];
                for (let j = 7; j < this.csvarray.length; j++) {
                  if (this.csvarray[j][i] !== '') {
                    for ( let k = 0; k < Math.round(+(this.csvarray[j][i])); k++) {
                      teachers.push(this.csvarray[j][0]);
                    }
                  }
                }

                if (this.csvarray[5][i] === '1') {
                  cours.push({
                    attr: {
                      id: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + '_promo'
                    },
                    time: [],
                    room: []
                  });

                  this.apiService.setTeacherCourse([{
                    teacher: teachers[0],
                    course: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + '_promo'
                  }]).subscribe(
                    (resultat) => {
                      console.log(resultat);
                    },
                    (err) => {
                      console.log(err);
                    }
                  );
                } else {
                  for (let j = 1; j <= +(this.csvarray[5][i]); j++) {
                    cours.push({
                      attr: {
                        id: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + `_${j}`
                      },
                      time: [],
                      room: []
                    });
                    this.apiService.setTeacherCourse([{
                      teacher: teachers[j - 1],
                      course: res[res.length - 1].attr.id + '_' + this.csvarray[3][i] + `_${j}`
                    }]).subscribe(
                      (resultat) => {
                        console.log(resultat);
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                  }
                }
                res[res.length - 1].config[0].subpart.push({
                  attr: {
                    id: res[res.length - 1].attr.id + '_' + this.csvarray[3][i]
                  },
                  class: cours
                });
              }
            }
          }
          if (this.csvarray[2][m] !== '') {
            res.push({
              attr: {
                id: this.csvarray[2][m].split(':')[1].substr(1).split(' ').join('-')
              },
              config: [{
                attr: {
                  id: this.csvarray[2][m].split(':')[1].substr(1).split(' ').join('-') + '_config'
                },
                subpart: []
              }]
            });
          }
        }
      }


    }
  });
  console.log(res);
  res.forEach(ue => {
    this.xmlService.addUe(ue);
  });
}

addTeacher() {
  this.csvarray.forEach(arr => {
    if (arr[0] !== '' && arr[0] !== 'Licence') {
      this.apiService.addTeacher({
        id: arr[0]
      }).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  });
}

}
