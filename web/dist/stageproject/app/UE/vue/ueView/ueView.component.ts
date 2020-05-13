import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueView',
  templateUrl: './ueView.component.html',
  styleUrls: ['./ueView.component.css']
})
export class UeViewComponent implements OnInit {

  ueGlobalList = [];
  ueList = [];
  ueFiltre;


  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.ueGlobalList = this.xmlService.getUeList();
    this.ueList = this.ueGlobalList;
  }

  ueFilter() {
    this.ueList = this.ueGlobalList.filter( x => x.attr.id.match(`${this.ueFiltre}.*`));
  }

}
