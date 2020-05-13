import { Component, OnInit, Input } from '@angular/core';
import { XmlService } from '../../../xml.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-classUeView',
  templateUrl: './classUeView.component.html',
  styleUrls: ['./classUeView.component.css']
})
export class ClassUeViewComponent implements OnInit {

  @Input() idUe;
  classGlobalList = [];
  classList = [];
  classFiltre;


  constructor(
    private xmlService: XmlService
  ) { }

  ngOnInit() {
    this.classGlobalList = this.xmlService.getUeProbClasses(this.idUe);
    console.log(this.classGlobalList);
    this.classList = this.classGlobalList;
  }

  classFilter() {
    this.classList = this.classGlobalList.filter( x => x.attr.id.match(`${this.classFiltre}.*`));
  }

}
