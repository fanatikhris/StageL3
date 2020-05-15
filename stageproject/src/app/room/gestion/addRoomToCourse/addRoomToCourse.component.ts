import { features } from '../../../data';
import { ApiService } from '../../../api.service';
import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-addRoomToCourse',
  templateUrl: './addRoomToCourse.component.html',
  styleUrls: ['./addRoomToCourse.component.css']
})
export class AddRoomToCourseComponent implements OnInit {

  idRoom;
  rooms;
  possibleRooms = [];
  idCours;
  idUe;
  subpart;
  pref;
  features = features;
  chosenFeatures: boolean[];

  id;

  constructor(
    private xmlService: XmlService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getRooms().subscribe(
      (res) => {
        this.rooms = res;
        this.setRooms();
      },
      (err) => {
        console.log(err);
      }
    );
    this.chosenFeatures = [];
    for (const _ of this.features) {
      this.chosenFeatures.push(false);
    }
   
    this.idUe = this.xmlService.getUeById(this.id);
   
    this.setCours();
    
    // console.log(this.xmlService.datas[1].problem[0].courses[0].course[0]);

  }

  setCours() {
    this.subpart = this.idUe.config[0].subpart.find( x => x.class.find( y => y.attr.id === this.id));
    
    this.idCours = this.subpart.class.find( x => x.attr.id === this.id);
  }

  isValid() {
    return this.idUe === undefined || this.idCours === undefined || this.pref === undefined || this.idRoom === undefined || this.idRoom === 'Choix';
  }

  setRooms() {
    this.possibleRooms = [];
    this.rooms.forEach(room => {
      let isSelectable = true;
      // tslint:disable-next-line: prefer-for-of
      for ( let i = 0; i < this.chosenFeatures.length ; i++) {
        if (this.chosenFeatures[i] === true && room[i + 1] === '0') {
          isSelectable = false;
          break;
        }
      }

      if (isSelectable) {
        this.possibleRooms.push(room);
      }
    });
    this.idRoom = undefined;
  }

  reset() {
    this.idRoom = undefined;
    this.pref = undefined;
    this.chosenFeatures.forEach(feat => {
      feat = false;
    });
  }

  addRoom() {
    const room = {
      attr: {
        id: this.idRoom,
        penalty: `${this.pref}`
      }
    };
    this.xmlService.addRoomToClass(this.idUe, this.subpart, this.idCours, room);
    this.reset();
  }

}
