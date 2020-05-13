import { Component, OnInit, Input } from '@angular/core';
import { XmlService } from '../../../xml.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-classView',
  templateUrl: './classView.component.html',
  styleUrls: ['./classView.component.css']
})
export class ClassViewComponent implements OnInit {

  @Input() idUe;
  classGlobalList = [];
  classList = [];
  classFiltre;


  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.classGlobalList = this.xmlService.getUeProbClasses(this.idUe);
    this.classList = this.classGlobalList;
  }

  classFilter() {
    this.classList = this.classGlobalList;
  }

}
