import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XmlService } from '../../../xml.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-studentInfo',
  templateUrl: './studentInfo.component.html',
  styleUrls: ['./studentInfo.component.css']
})
export class StudentInfoComponent implements OnInit {

  idSt;
  ueGlobalList = [];
  ueList = [];
  ueFiltre;

  constructor(
    private xmlService: XmlService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idSt = this.activatedRoute.snapshot.paramMap.get('id');
    this.ueGlobalList = this.xmlService.getStudentUesList(this.idSt);
    this.ueList = this.ueGlobalList;

  }



ueFilter() {
  this.ueList = this.ueGlobalList.filter( x => x.attr.id.match(`${this.ueFiltre}.*`));
}


}
