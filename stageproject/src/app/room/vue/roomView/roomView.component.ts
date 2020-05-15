import { ApiService } from './../../../api.service';
import { Component, OnInit } from '@angular/core';
import { XmlService } from '../../../xml.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-roomView',
  templateUrl: './roomView.component.html',
  styleUrls: ['./roomView.component.css']
})
export class RoomViewComponent implements OnInit {

  roomGlobalList = [];
  roomList = [];
  roomFiltre;
  file = [];


  constructor(
    private xmlService: XmlService,
    private apiService: ApiService
  ) { }

  readFile(event) {
    this.file = [];
    event.target.result.split('\n').forEach(line => {
      this.file.push(line.split(' ')[0]);
    });
    // console.log(this.file);
  }

  handle(files: FileList) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.file = [];
        const text = event.target.result as string;
        text.split('\n').forEach(line => {
          this.file.push(line.split(' ')[0]);
        });
        // console.log(this.file);
      };
      reader.readAsText(files.item(0));
  }

  ngOnInit() {
    this.roomGlobalList = this.xmlService.getRoomList();
    this.roomList = this.roomGlobalList;
  }

  initRooms() {
    this.file.forEach(room => {
      const data = {
        id: room,
        prises: false,
        labo: false,
        pc: false
      };
      this.apiService.addRoom(data).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      this.xmlService.addRoom(room, `50`);
    });
  }

  roomFilter() {
    this.roomList = this.roomGlobalList.filter( x => x.attr.id.match(`${this.roomFiltre}.*`));
  }
}
