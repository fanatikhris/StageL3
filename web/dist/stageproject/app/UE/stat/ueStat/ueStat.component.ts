import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../../xml.service';
import { StatService } from '../../../stat.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueStat',
  templateUrl: './ueStat.component.html',
  styleUrls: ['./ueStat.component.css']
})
export class UeStatComponent implements OnInit {

  id: any; // id de l'étudiant sélectionné

  ues: any[]; // liste des étudiants


  constructor(private xmlService: XmlService, private statService: StatService) { }

  ngOnInit() {
    this.loadStudents();
  }


  loadStudents() {
    this.ues = this.xmlService.getUeList();
  }

  click() {
    this.statService.setUeStat(this.id);
  }

}
