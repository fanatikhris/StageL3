import { Component, OnInit, Input } from '@angular/core';
import { XmlService } from '../../../xml.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-classView',
  templateUrl: './classView.component.html',
  styleUrls: ['./classView.component.css']
})
export class ClassViewComponent implements OnInit {

  @Input() idUe: any;
  classGlobalList = [];
  classList = [];
  classFiltre: any;


  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.classGlobalList = this.xmlService.getUeProbClasses(this.idUe);
    this.classList = this.classGlobalList;
  }

  classFilter(): void {
    this.classList = this.classGlobalList;
  }

}
