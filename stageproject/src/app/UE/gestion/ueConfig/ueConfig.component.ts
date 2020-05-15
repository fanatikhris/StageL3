import { types } from '../../../data';
import { UeManageService } from '../../../ueManage.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { XmlService } from '../../../xml.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueConfig',
  templateUrl: './ueConfig.component.html',
  styleUrls: ['./ueConfig.component.css']
})
export class UeConfigComponent implements OnInit {
  types = types;
  chosenTypes = [];
  ueId: any;
  constructor(
    private ueManageService: UeManageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.chosenTypes = [];
    this.ueId = this.ueManageService.getUeId();
    this.types.forEach( type => {
      this.chosenTypes.push(false);
    });
  }

  isValid() {
    let valid = true;
    this.chosenTypes.forEach( type => {
      if (type === true) {
        valid = false;
      }
    });
    return valid;
  }

  onSubmit() {
    this.ueManageService.setTypes(this.chosenTypes);
    this.router.navigate(['/ueCours']);
  }

}
