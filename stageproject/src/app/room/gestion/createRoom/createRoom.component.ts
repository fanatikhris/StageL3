import { DateService } from './../../../date.service';
import { features } from '../../../data';
import { ApiService } from '../../../api.service';
import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-createRoom',
  templateUrl: './createRoom.component.html',
  styleUrls: ['./createRoom.component.css']
})
export class CreateRoomComponent implements OnInit {
  rooms;
  features = features;
  chosenFeatures: boolean[];
  id = '';
  nb = 0;
  values = [];

  constructor(
    private apiService: ApiService,
    private xmlService: XmlService,
    private dateService: DateService,
  ) { }

  ngOnInit() {
    this.rooms = this.xmlService.getRoomList();
    this.rooms.forEach( _ => {
      this.values.push('');
    });
    this.chosenFeatures = [];
    for (const _ of this.features) {
      this.chosenFeatures.push(false);
    }
  }

  addRoom() {
    const data = {
      id: this.id,
      prises: this.chosenFeatures[0],
      labo: this.chosenFeatures[1],
      pc: this.chosenFeatures[2]
    };
    this.apiService.addRoom(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.xmlService.addRoom(this.id, `${this.nb}`);
    // tslint:disable-next-line: prefer-for-of
    console.log(this.id);
    for (let i = 0; i < this.rooms.length; i++) {
      if (this.values[i] !== '') {
        const time = this.dateService.getTravelTime(this.values[i]);
        this.xmlService.addTravelTime(this.id, this.rooms[i].attr.id, time);
        this.xmlService.addTravelTime(this.rooms[i].attr.id, this.id, time);
      }
    }
    this.chosenFeatures.forEach(feat => {
      feat = false;
    });
    this.id = '';
    this.nb = 0;

  }

}
