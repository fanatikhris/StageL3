import { DateService } from './../date.service';
import { type } from 'os';
import { XmlService } from './../xml.service';
import { constraint } from './../data';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addDistribution',
  templateUrl: './addDistribution.component.html',
  styleUrls: ['./addDistribution.component.css']
})
export class AddDistributionComponent implements OnInit {

  types;
  required;
  id;
  pref = '';
  cours;
  ues;
  idUe;
  idCours;
  distri;
  param;

  constructor(
    private xmlService: XmlService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.param = ['', ''];
    this.distri = {
      attr: {
        type: ''
      },
      class: []
    };
    this.ues = this.xmlService.getUeList();
    this.types = constraint;
  }

  idIsValid() {
    return this.id !== undefined;
  }

  setCours() {
    this.cours = [];
    this.idUe.config[0].subpart.forEach(sub => {
      sub.class.forEach(cours => {
        this.cours.push(cours);
      });
    });
    this.idCours = undefined;
  }

  resetparam() {
    this.param[0] = '';
    this.param[1] = '';
  }

  disabledConstraint() {
    if (this.distri.class.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.distri.class, event.previousIndex, event.currentIndex);
  }

  addToConstraint() {
    if (!this.disabledConstraint()) {
      let id = this.id.id;
      if (this.param[0] !== '' && this.param[1] === '') {
        if (this.id.param[0] === 'M' || this.id.param[0] === 'S' || this.id.param[0] === 'G') {
          this.param[0] = this.dateService.getTravelTime(this.param[0]);
        }
        id += `(${this.param[0]})`;
      } else if (this.param[0] !== '' && this.param[1] !== '') {
        if (this.id.param[0] === 'M' || this.id.param[0] === 'S' || this.id.param[0] === 'G') {
          this.param[0] = this.dateService.getTravelTime(this.param[0]);
        }
        if (this.id.param[1] === 'M' || this.id.param[1] === 'S' || this.id.param[1] === 'G') {
          this.param[1] = this.dateService.getTravelTime(this.param[1]);
        }
        id += `(${this.param[0]},${this.param[1]})`;
      }
      this.distri.attr.type = id;
      if (this.required) {
        this.distri.attr.required = 'true';
      } else {
        this.distri.attr.penalty = `${this.pref}`;
      }
    }

    if (this.distri.class.find( x => x.attr.id === this.idCours.attr.id) === undefined ) {
      this.distri.class.push({
        attr: {
          id: `${this.idCours.attr.id}`
        }
      });
      this.idCours = undefined;
      this.idUe = undefined;
    } else {
      alert(`Le cours ${this.idCours.attr.id} est déjà dans la liste !`);
    }

  }

  isValid1() {
    let paramSet = true;
    if (this.id !== undefined) {
      for (let i = 0; i < this.id.param.length; i++) {
        if (this.param[i] === '') {
          paramSet = false;
        }
      }
    }
    return ((this.id !== undefined
    && paramSet) || this.disabledConstraint())
    && this.idUe !== undefined
    && this.idCours !== undefined
    && ( this.required
        || (!this.required
             && this.pref !== '') );
  }

  setConstraint() {
    this.xmlService.addConstraint(this.distri);
    this.param = ['', ''];
    this.distri = {
      attr: {
        type: ''
      },
      class: []
    };
    this.cours = [];
    this.idCours = undefined;
    this.idUe = undefined;
    this.required = false;
    this.id = undefined;
    this.pref = '';
  }

}
