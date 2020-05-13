import { XmlService } from './xml.service';
import { Injectable } from '@angular/core';
import { types } from './data';


@Injectable({
  providedIn: 'root'
})
export class UeManageService {

  id: any;
  config = [];
  ue: { config: any; attr?: { id: any; }; };
  types = types;

constructor(private xmlService: XmlService) { }


reset() {
  this.id = undefined;
  this.config = [];
  this.ue = undefined;
}

// initialise l'id de l ue en cours de création
setUe(id: any) {
  this.id = id; // .split(' ').join('-');
  this.ue = {
    attr: {id: this.id},
    config: [{
      attr: {id: `${this.id}_config`},
      subpart: []
    }]
  };
  console.log(this.ue.config[0]);
}

// retourne l'id de l'ue en cours de création
getUeId() {
  return this.id;
}

// initialise les types de cours de l'ue : CM, TD, TP, etc..
setTypes(config: any[]) {
  this.config = [];
  console.log(config);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.types.length; i++) {
    if (config[i]) {
      this.ue.config[0].subpart.push({
        attr: {id: `${this.id}_${types[i]}`},
        class: []
      });
      this.config.push(types[i]);
    }
  }
  console.log(this.ue.config[0]);
}

// ajoute un cours  à l'ue
addCours(cours: any[]) {
  console.log(this.ue);
  cours.forEach((classe: { attr: { id: string; }; }) => {
    const id = classe.attr.id.split('_');
    // console.log(`${id[0]}_${id[1]}`);
    const index = this.ue.config[0].subpart.indexOf(this.ue.config[0].subpart.find((x: { attr: { id: string; }; }) => x.attr.id === `${id[0]}_${id[1]}`));
    this.ue.config[0].subpart[index].class.push(classe);
  });

  this.xmlService.addUe(this.ue);
}

// retourne les types de cours de l'ue
getTypes() {
  return this.config;
}

}
