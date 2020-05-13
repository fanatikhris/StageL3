import { XmlService } from '../../../xml.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-roomClassView',
  templateUrl: './roomClassView.component.html',
  styleUrls: ['./roomClassView.component.css']
})
export class RoomClassViewComponent implements OnInit {

  @Input() idClass;

  classRoomsGlobals = [];
  classRooms = [];
  roomFiltre;

  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.classRoomsGlobals = this.xmlService.getClassRoomsById(this.idClass);
    this.classRooms = this.classRoomsGlobals;
  }

  roomFilter() {
    this.classRooms = this.classRoomsGlobals.filter( x => x.attr.id.match(`${this.roomFiltre}.*`));
  }

  remove(room) {
    // console.log(room);
    this.xmlService.removeRoomFromClass(this.idClass, room);
  }

}
