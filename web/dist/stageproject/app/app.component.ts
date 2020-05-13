import { CsvService } from './csv.service';
import { Location } from '@angular/common';
import { DateService } from './date.service';
import { XmlService } from './xml.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stageproject';
  isLoad: boolean;
  dateSet: boolean;
  file: File;
  date = '';
  isCollapsed: boolean;

  constructor(public xmlService: XmlService, private dateService: DateService, private location: Location, private csvService: CsvService) {
    this.dateService.dateSet.subscribe(value => this.dateSet = value); // permet de savoir si la date est enregistrer
    this.xmlService.isLoad.subscribe(value => this.isLoad = value); // permet de savoir lorsque les fichiers sont chargés
    this.xmlService.init(); // chargement des données XML
    this.csvService.csvfile = '';
    this.isCollapsed = true;
  }
  // Lors du click sur le bouton pour valider la date, si le format est correct on l'envoie à dateService,
  // sinon on le signale à l'utilisateur
  initDate() {
    if (this.date.match('[0-9]{4}-[0-9]{2}-[0-9]{2}') && this.date.length === 10) {
      this.dateService.initDate(this.date); // si le format de la date rentrée est correcte,
                                                                         // on la met comme point de départ de l'edt
    } else {
      alert('Mauvais format de date');
    }
  }


  handle(files: FileList) {
      this.file = files.item(0);
  }

  afficher() {
    console.dir(this.xmlService.datas);
  }
  initCsv() {
    this.csvService.setFile(this.file);
    this.csvService.getCsvFile();
  }
  toXml() {
    this.xmlService.saveXml();
  }

  goBack() {
    this.location.back();
  }
}
