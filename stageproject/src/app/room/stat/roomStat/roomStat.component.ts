import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../../xml.service';
import { StatService } from '../../../stat.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-roomStat',
  templateUrl: './roomStat.component.html',
  styleUrls: ['./roomStat.component.css']
})
export class RoomStatComponent implements OnInit {

  id; // id de l'étudiant sélectionné

  rooms: any[]; // liste des étudiants


  constructor(private xmlService: XmlService, private statService: StatService) { }

  ngOnInit() {
    this.loadStudents();
  }


  loadStudents() {
    this.rooms = this.xmlService.getRoomList();
  }

  click() {
    this.statService.setRoomStat(this.id);
  }

}
