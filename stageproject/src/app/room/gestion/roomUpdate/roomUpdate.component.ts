import { DateService } from './../../../date.service';
import { ApiService } from './../../../api.service';
import { features } from './../../../data';
import { Component, OnInit, Input } from '@angular/core';
import { XmlService } from './../../../xml.service';

@Component({
  selector: 'app-roomUpdate',
  templateUrl: './roomUpdate.component.html',
  styleUrls: ['./roomUpdate.component.css']
})
export class RoomUpdateComponent implements OnInit {



  @Input() id;
  room;
  rooms;
  limit;
  feats = features;
  chosenFeatures = [];
  roomtraveltime = [];
  values = [];


  constructor(
    private apiService: ApiService,
    private xmlService: XmlService,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.rooms = this.xmlService.getRoomList();
    this.apiService.getRoomById({ id: this.id}).subscribe(
      (res) => {
        this.room = res[0];
        for (let i = 1; i < this.room.length; i++) {
          if (this.room[i] === '1') {
            this.chosenFeatures.push(true);
          } else {
            this.chosenFeatures.push(false);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.roomtraveltime = this.xmlService.getTravelTime(this.id);
    if (this.roomtraveltime === undefined) {
      this.roomtraveltime = [];
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].attr.id !== this.id) {
        if (this.roomtraveltime.find( x => x.attr.room === this.rooms[i].attr.id) !== undefined) {
          const time = this.dateService.getTime(this.roomtraveltime.find( x => x.attr.room === this.rooms[i].attr.id).attr.value);
          this.values.push([this.rooms[i].attr.id, `${time}`]);
        } else {
          this.values.push([this.rooms[i].attr.id, '']);
        }
      }
    }
    this.limit = this.xmlService.getRoomById(this.id).attr.capacity;
  }

  updateRoom() {
    const data = {
      id: this.id,
      prises: this.chosenFeatures[0],
      labo: this.chosenFeatures[1],
      pc: this.chosenFeatures[2]
    };
    this.apiService.updateRoom(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.values.length; i++) {
      let time;
      if (this.values[i][1] !== '') {
        time = this.dateService.getTravelTime(this.values[i][1]);
      } else {
        time = '';
      }
      this.xmlService.addTravelTime(this.id, this.values[i][0], `${time}`);
      this.xmlService.addTravelTime(this.values[i][0], this.id, `${time}`);
    }
    this.xmlService.updateRoom(this.id, `${this.limit}`);
  }

}
