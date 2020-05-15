import { ApiService } from './api.service';
import { modifiedSol, sol, prob, nameVal, daysNb, weeksNb, slotsPerDaysNb, distriVal, roomVal, stdVal, timeVal } from './data';

import { DateService } from './date.service';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as parser from 'fast-xml-parser';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class XmlService {
  charged = 0;
  datas: any[2] = [{}, {}];
  xml: string;
  isLoad: Subject<boolean> = new Subject<boolean>();

constructor(private http: HttpClient, private dateService: DateService, private apiService: ApiService) {
  this.isLoad.next(false);
}


// initialise les données probleme et solution
init() {
  this.apiService.loadXML(sol).subscribe(
    (data) => {
      // console.log(data);
      this.parseXML(data)
        .then((dataparsed) => { // lorsque les données sont parsées on les rentre dans datas et lorsque tout
          this.datas[0] = dataparsed;  // est chargé on passe la variable isLoad à true
        });
    },
    (err) => {
      this.datas[0] = {
        solution: [{
          class: []
        }]
      };
    }
  );
  this.apiService.loadXML(prob).subscribe(
    (data) => {
      // console.log(data);
      this.parseXML(data)
        .then((dataparsed) => { // lorsque les données sont parsées on les rentre dans datas et lorsque tout
          this.datas[1] = dataparsed;  // est chargé on passe la variable isLoad à true
          this.dateService.initTimeCoeff(+(this.getSlotPerDay()));
          this.isLoad.next(true);

        });
    },
    (err) => {
      this.datas[1] = {
        problem: [{
          attr: {
            name: nameVal,
            nrDays: daysNb,
            nrWeeks: weeksNb,
            slotsPerDay: slotsPerDaysNb
          },
          optimization: [{
            attr: {
              distribution: distriVal,
              room: roomVal,
              student: stdVal,
              time: timeVal
            }
          }],
          rooms: [{
            room: []
          }],
          courses: [{
            course: []
          }],

          distributions: [{
            distribution: []
          }],

          students: [{
            student: []
          }]
        }]
      };
      this.dateService.initTimeCoeff(+(this.getSlotPerDay()));
      this.isLoad.next(true);

    }
  );
}

// ajoute une distribution dans le fichier probleme
addConstraint(distri) {
  if (this.datas[1].problem[0].distributions[0].distribution.indexOf(distri) === -1) {
    this.datas[1].problem[0].distributions[0].distribution.push(distri);
  }
}


// retourn la couleur d'un cours en fonction du type de cours 
getClassColor(id) { // fonction retournant la couleur d'un cours en fonction de son id
  if (id.split('_')[1] === 'CM') {
    return '#fce303';
  } else if (id.split('_')[1] === 'TD') {
    return '#fc8003';
  } else {
    return '#2dfc03';
  }
}


//renvoie la liste des ue
getUeList() {
  const ue = [];
  this.datas[1].problem[0].courses[0].course.forEach(ueElement => {
    ue.push(ueElement);
  });
  return ue;
}


// ajoute un créneau possible a un cours donné
addTimeToClass(ue, subpart, cours, time) {
  const ueIndex = this.datas[1].problem[0].courses[0].course.indexOf(ue);
  const subpartIndex = this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart.indexOf(subpart);
  const classIndex = this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class.indexOf(cours);

  if (!this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].hasOwnProperty('time')) {
    this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].time = [];
  }

  if (
    this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].time
      .find( x =>
        x.attr.start === time.attr.start
        && x.attr.length === time.attr.length
        && x.attr.days === time.attr.days
        && x.attr.weeks === time.attr.weeks
      ) === undefined) {


    this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].time.push(time);

  } else {
    alert('Ce créneau existe déja !');
  }
}

// crée un nouvel etudiant
addStudent(idval) {
  if (this.datas[1].problem[0].students[0].student.find( x => x.attr.id === idval) === undefined) {
    this.datas[1].problem[0].students[0].student.push({
     attr: { id: idval }
    });
  } else {
    alert(`étudiant ${idval} déjà présent !`);
  }
}

// ajoute un temps de trajet entre deux salles
addTravelTime(id1, id2, time) {
    const room1 = this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === id1);
    const index = this.datas[1].problem[0].rooms[0].room.indexOf(room1);
    if (!this.datas[1].problem[0].rooms[0].room[index].hasOwnProperty('travel')) {
      this.datas[1].problem[0].rooms[0].room[index].travel = [];
    }
    const travel = this.datas[1].problem[0].rooms[0].room[index].travel.find( x => x.attr.room === id2);
    if ( travel !== undefined) {
      const tIndex = this.datas[1].problem[0].rooms[0].room[index].travel.indexOf(travel);
      this.datas[1].problem[0].rooms[0].room[index].travel.splice(tIndex, 1);
    }
    if (time !== '' ) {
      this.datas[1].problem[0].rooms[0].room[index].travel.push({
        attr: {
          room: id2,
          value: time
        }
      });
    }
}


// retourne les temps de trajet entre une salle donnée et toutes les autres salles
getTravelTime(id) {
  return this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === id).travel;
}

// ajoute une indisponibilité à une salle
addUnavailability(idRoom, events) {
  const room = this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === idRoom);
  const index = this.datas[1].problem[0].rooms[0].room.indexOf(room);
  if (!this.datas[1].problem[0].rooms[0].room[index].hasOwnProperty('unavailable')) {
    this.datas[1].problem[0].rooms[0].room[index].unavailable = [];
  }

  if (this.datas[1].problem[0].rooms[0].room[index].unavailable
    .find( x =>
    x.attr.start === events.attr.start
    && x.attr.length === events.attr.length
    && x.attr.days === events.attr.days
    && x.attr.weeks === events.attr.weeks
  ) === undefined) {

    this.datas[1].problem[0].rooms[0].room[index].unavailable.push(events);

  } else {
    alert('Cette indisponibilité existe déja');
  }
}

// inscrits les étudiants sélectionnés aux ue sélectionnées
addStudentsToUes(ues, students) {

  students.forEach(std => {
    const student = this.datas[1].problem[0].students[0].student.find( x => x.attr.id === std );
    const stIndex = this.datas[1].problem[0].students[0].student.indexOf(student);

    if (!this.datas[1].problem[0].students[0].student[stIndex].hasOwnProperty('course')) {
      this.datas[1].problem[0].students[0].student[stIndex].course = [];
    }

    ues.forEach(ue => {
      if (this.datas[1].problem[0].students[0].student[stIndex].course.find( x => x.attr.id === ue.attr.id) === undefined) {
        this.datas[1].problem[0].students[0].student[stIndex].course.push(
          {
            attr: { id: ue.attr.id }
          }
        );
      }
    });
  });

}

// ajoute une classe possible a un cours
addRoomToClass(ue, subpart, cours, room) {
  const ueIndex = this.datas[1].problem[0].courses[0].course.indexOf(ue);
  const subpartIndex = this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart.indexOf(subpart);
  const classIndex = this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class.indexOf(cours);

  if (!this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].hasOwnProperty('room')) {
    this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].room = [];
  }

  if (
    this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].room
      .find( x => x.attr.id === room.attr.id) === undefined
  ) {
    this.datas[1].problem[0].courses[0].course[ueIndex].config[0].subpart[subpartIndex].class[classIndex].room.push(room);
  } else {
    alert(`La salle ${room.attr.id} est déjà présente pour l'UE ${ue.attr.id}` );
  }
}


// renvoie la liste des étudiants
getStudentList() { // fonction retournant la liste des étudiants
  const students = [];
  if (this.datas[1].problem[0].students === '') {
    this.datas[1].problem[0].students = [{ student: []}];
  }
  this.datas[1].problem[0].students[0].student.forEach(student => {
    students.push(student.attr.id);
  });
  return students;
}

// créé une nouvelle salle
addRoom(idval, nbval) {
  if (this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === idval) === undefined) {
    this.datas[1].problem[0].rooms[0].room.push(
      {
        attr: {
          id: idval,
          capacity: nbval
        }
      }
    );
  } else {
    alert(`La salle ${idval} existe déjà`);
  }
}

// renvoie la liste des salles
getRoomList() { // fonction retournant la liste des salles
  const rooms = [];
  if (this.datas[1].problem[0].rooms === '') {
    this.datas[1].problem[0].rooms = [{room: []}];
    return [];
  }
  this.datas[1].problem[0].rooms[0].room.forEach(room => {
    rooms.push(room);
  });
  return rooms;
}

// renvoie la liste des salles ayant une capacité supérieur à size
getRoomsBySize(size) {
  const rooms = [];
  this.datas[1].problem[0].rooms[0].room.forEach(room => {
    if (room.attr.capacity >= size) {
      rooms.push(room);
    }
  });
  return rooms;
}

parseXML(data) { // fonction transformant le xml en json de manière asynchrone
    return new Promise(resolve => {
      const options = {
        attributeNamePrefix : '', // on ne donne pas de prefixe aux attributs
        attrNodeName: 'attr', // dans l'objet json les attributs seront dans le sous-objet attr
        textNodeName : 'text', // si les balise xml contiennent du texte, il sera dans le sous-objet text
        ignoreAttributes : false, // on ignore pas les attributs
        ignoreNameSpace : true,
        allowBooleanAttributes : true, // on autorise les attribut booléen
        parseNodeValue : false,
        parseAttributeValue : false,
        trimValues: true,
        parseTrueNumberOnly: false,
        arrayMode: true // retourne un tableau de sous-objets contenant les noeuds enfants, même s'il n'y en a un seul
    };
      const res = parser.parse(data, options);
      resolve(res);
    });
}

// retourne le nombre de slot par jour
getSlotPerDay() {
  return this.datas[1].problem[0].attr.slotsPerDay;
}

// retourne les cours d'un étudiant
getStudentClasses(id) {
  return this.datas[0].solution[0].class
          .filter( x => x.student
            .find( y => y.attr.id === id) );
}

// supprime une classe dans la solution
deleteSolClass(cours) {
  const index = this.datas[0].solution[0].class.indexOf(cours);
  this.datas[0].solution[0].class.splice(index,1);
}

// supprime une classe dans le probleme
deleteProbClass(cours) {
  const course = this.datas[1].problem[0].courses[0]
    .course.find( x => x.config[0].subpart.find( y => y.class.find( z => z.attr.id === cours.attr.id)));
  const courseIndex = this.datas[1].problem[0].courses[0].course.indexOf(course);
  const subpart = course.config[0].subpart
    .find( y => y.class.find( z => z.attr.id === cours.attr.id));
  const subpartIndex = course.config[0].subpart.indexOf(subpart);
  const clas = subpart.class
    .find( z => z.attr.id === cours.attr.id);
  const classeIndex = subpart.class.indexOf(clas);
  const time = clas.time.find( x => x.attr.start === cours.attr.start && x.attr.weeks === cours.attr.weeks && x.attr.days === cours.attr.days);
  const timeIndex = clas.time.indexOf(time);
  console.log(timeIndex);
  this.datas[1].problem[0].courses[0].course[courseIndex].config[0].subpart[subpartIndex].class[classeIndex].time.splice(timeIndex, 1);
}

// ajoute une classe dans la solution
addClassToSol(cours) {
  this.datas[0].solution[0].class.push(cours);
}

// retourne la liste des cours d'un professeurs
getTeacherClasses(ids) {
  const courses = [];
  console.log(ids);
  ids.forEach(id => {
    if (this.datas[0].solution[0].class.find( x => x.attr.id === id) !== undefined) {
      courses.push(this.datas[0].solution[0].class.find( x => x.attr.id === id));
    }
  });
  console.log(courses);
  return courses;
}

// retourne les cours presents dans une salle
getRoomClasses(id) {
  return this.datas[0].solution[0].class
          .filter( x => x.attr.room === id);
}

// retourne l'objet room via son id
getRoomById(id) {
  return this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === id);
}

// met à jour une salle
updateRoom(id, limit) {
  const room = this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === id);
  const index = this.datas[1].problem[0].rooms[0].room.indexOf(room);
  this.datas[1].problem[0].rooms[0].room[index].attr.capacity = limit;
}


// supprime la possibilite d'avoir une salle dans un cours
removeRoomFromClass(id, room) {
  const course = this.datas[1].problem[0].courses[0]
                .course.find( x => x.config[0].subpart.find( y => y.class.find( z => z.attr.id === id)));
  const courseIndex = this.datas[1].problem[0].courses[0].course.indexOf(course);
  const subpart = course.config[0].subpart
                .find( y => y.class.find( z => z.attr.id === id));
  const subpartIndex = course.config[0].subpart.indexOf(subpart);
  const clas = subpart.class
                .find( z => z.attr.id === id);
  const classeIndex = subpart.class.indexOf(clas);
  const roomIndex = clas.room.indexOf(room);

  this.datas[1].problem[0].courses[0].course[courseIndex].config[0].subpart[subpartIndex].class[classeIndex].room.splice(roomIndex, 1);

}

// supprime un créneau possible
removeTimeFromClass(id, time) {
  const course = this.datas[1].problem[0].courses[0]
                .course.find( x => x.config[0].subpart.find( y => y.class.find( z => z.attr.id === id)));
  const courseIndex = this.datas[1].problem[0].courses[0].course.indexOf(course);
  const subpart = course.config[0].subpart
                .find( y => y.class.find( z => z.attr.id === id));
  const subpartIndex = course.config[0].subpart.indexOf(subpart);
  const clas = subpart.class
                .find( z => z.attr.id === id);
  const classeIndex = subpart.class.indexOf(clas);
  const timeIndex = clas.time.indexOf(time);
  this.datas[1].problem[0].courses[0].course[courseIndex].config[0].subpart[subpartIndex].class[classeIndex].time.splice(timeIndex, 1);

}

//supprime une indisponibilité
removeUnavaibiliyiFromRoom(id, time) {
  const room = this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === id);
  const roomIndex = this.datas[1].problem[0].rooms[0].room.indexOf(room);

  const unavailable = room.unavailable.indexOf(time);
  this.datas[1].problem[0].rooms[0].room[roomIndex].unavailable.splice(unavailable, 1);
}

// retourne les salles possible d'une classe
getClassRoomsById(id) {
  const course = this.datas[1].problem[0].courses[0]
                .course.find( x => x.config[0].subpart.find( y => y.class.find( z => z.attr.id === id)));
  const subpart = course.config[0].subpart
                .find( y => y.class.find( z => z.attr.id === id));
  const clas = subpart.class
                .find( z => z.attr.id === id);

  return clas.room;
}

// retourne la liste des etudiants
getUeStudentsList(idUe) {
  const res = [];

  this.datas[1].problem[0].students[0].student.forEach(st => {
    if (st.course.find( x => x.attr.id === idUe) !== undefined) {
      console.log(st);
      res.push(st.attr.id);
    }
  });

  return res;

}

// retourne la liste des ue auquel un etudiant est inscrit
getStudentUesList(idSt) {
  return this.datas[1].problem[0].students[0].student.find( x => x.attr.id === idSt).course;
}

// retourne les créneau possible d'un cours
getClassTime(id) {
  const course = this.datas[1].problem[0].courses[0]
                .course.find( x => x.config[0].subpart.find( y => y.class.find( z => z.attr.id === id)));
  const subpart = course.config[0].subpart
                .find( y => y.class.find( z => z.attr.id === id));
  const clas = subpart.class
                .find( z => z.attr.id === id);

  return clas.time;
}

// retourne les indisponibilités d'une salle
getUnavailabilityTime(id) {
  return this.datas[1].problem[0].rooms[0].room.find( x => x.attr.id === id).unavailable;
}


// retourne le contenu d'une ue via son id
getUeById(id) {
  return this.datas[1].problem[0].courses[0].course
    .find( x => x.config[0].subpart
      .find( y => y.class
        .find( z => z.attr.id === id)));
}

// retourne tout les cours d'une ue
getUeProbClasses(id) {
  const course = this.datas[1].problem[0].courses[0]
    .course.find( x => x.attr.id === id);
  const res = [];
  course.config[0].subpart.forEach( sub => {
    sub.class.forEach( cours => {
      res.push(cours);
    });
  }); 
  return res;
}

// retourne les cours d'une ue presente dans l'edt final
getUeSolClasses(id) {
  return this.datas[0].solution[0].class
  .filter( x => x.attr.id.split('_')[0] === id );
}

// retourne l'id d'un cours
getCourseTitle(course) {
  const title = `${this.datas[1].problem[0].courses[0].course
              .find( x => x.config[0].subpart
                .find( y => y.class
                  .find( z => z.attr.id === course.attr.id))).attr.id}`;
  return title;
}

// retourne le nombre de jours par semaine
getNbDays() {
  return this.datas[1].problem[0].attr.nrDays;
}

// retourne le nombre de semaines 
getNbWeeks() {
  return this.datas[1].problem[0].attr.nrWeeks;
}

// retourne les valeurs d'optimisation
getOpti() {
  return this.datas[1].problem[0].optimization[0];
}

// met a jour les valeurs d'optimisation
setOpti(opti) {
  this.datas[1].problem[0].optimization[0] = opti;
}

// retourne la valeur length d'une class
getClassDuration(classe) {
  console.log(classe);
  const course = this.datas[1].problem[0].courses[0]
                .course.find( x => x.config[0].subpart.find( y => y.class.find( z => z.attr.id === classe.attr.id)));
  const subpart = course.config[0].subpart
                .find( y => y.class.find( z => z.attr.id === classe.attr.id));
  const clas = subpart.class
                .find( z => z.attr.id === classe.attr.id);
  console.log(clas);
  const time = clas.time
                .find(x => x.attr.days === classe.attr.days && x.attr.start === classe.attr.start && x.attr.weeks === classe.attr.weeks);
  // console.log(time);
  return time.attr.length;
}


// ajoute ue dans les courses
addUe(ue) {
  if (this.datas[1].problem[0].courses[0].course.find( x => x.attr.id === ue.attr.id) === undefined) {
    this.datas[1].problem[0].courses[0].course.push(ue);
  } else {
    alert(`L'UE ${ue.attr.id} est déjà présente !`);
  }
}

// fonction qui parse du json au xml
parseJson(data) {
  const options = {
    attributeNamePrefix : '', // on ne donne pas de prefixe aux attributs
    attrNodeName: 'attr', // dans l'objet json les attributs seront dans le sous-objet attr
    textNodeName : 'text', // si les balise xml contiennent du texte, il sera dans le sous-objet text
    ignoreAttributes : false, // on ignore pas les attributs
    suppressEmptyNode: false,
    format: false,
    indentBy: ' ',
    };
  const Parser = new parser.j2xParser(options);
  this.xml = Parser.parse(data);

}
  // ajoute le fait qu'un prof ne peut avoir deux cours en meme temps
  async addSameAttendees() {

  const teachers = await this.apiService.getTeachers().toPromise();
  console.log(teachers);
  const tCourses = await this.apiService.getTeacherCourse().toPromise();
  console.log(tCourses);
  teachers.forEach(teacher => { // pour chaque prof
    const teacherCourse = tCourses.filter( x => x.teacher === teacher); // on recupere la liste de ses cours
    const sameAttendee = {
      attr: {
        type: 'SameAttendees',
        required: 'true'
      },
      class: []
    };
    if (teacherCourse.length > 1) { // WTF ?
      teacherCourse.forEach(course => { // si il a plus d'un cours on les ajoute a une contrainte sameattendees
        sameAttendee.class.push({
          attr: {
            id: course.course
          }
        });
      });
      if (this.datas[1].problem[0].distributions[0].distribution.find( x => x === sameAttendee) === undefined) {
        this.addConstraint(sameAttendee); // on ajoute la contrainte au problem
      }
      
    }
  });

}

// sauvegarde les cours modifie dans un xml
saveModifiedClass(course) {
  this.parseJson(course); // parse en xml
  this.apiService.saveModifiedFile({ // envoie le xml au fichier php pour sauvegarde
    xml: '<?xml version="1.0" encoding="UTF-8"?> <!DOCTYPE solution PUBLIC "-//ITC 2019//DTD Problem Format/EN" "http://www.itc2019.org/competition-format.dtd">'
    + this.xml,
    file: modifiedSol
  }).subscribe(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
}

// sauvegarde les modif apporté a la solution
saveSol() {
  this.parseJson(this.datas[0]); // parse au format xml
  this.apiService.saveFile({ // envoie le xml au fichier php pour sauvegarde
    xml: '<?xml version="1.0" encoding="UTF-8"?> <!DOCTYPE solution PUBLIC "-//ITC 2019//DTD Problem Format/EN" "http://www.itc2019.org/competition-format.dtd">'
    + this.xml,
    file: sol
  }).subscribe(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
}
// sauvegarde du xml
async saveXml() {
  // await this.addSameAttendees();
  this.parseJson(this.datas[1]); // parse l'objet json en xml

  this.apiService.saveFile({ // envoie le xml au fichier php pour sauvegarde
    xml: '<?xml version="1.0" encoding="UTF-8"?> <!DOCTYPE solution PUBLIC "-//ITC 2019//DTD Problem Format/EN" "http://www.itc2019.org/competition-format.dtd">'
    + this.xml,
    file: prob
  }).subscribe(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
}



}
