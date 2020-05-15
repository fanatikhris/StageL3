import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueInfo',
  templateUrl: './ueInfo.component.html',
  styleUrls: ['./ueInfo.component.css']
})
export class UeInfoComponent implements OnInit {

  idUe: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idUe = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
