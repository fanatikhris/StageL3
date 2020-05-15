import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-roomInfo',
  templateUrl: './roomInfo.component.html',
  styleUrls: ['./roomInfo.component.css']
})
export class RoomInfoComponent implements OnInit {
  id;
  vue;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  setView(type) {
    // console.log(this.vue);
    this.vue = type;
  }
}
