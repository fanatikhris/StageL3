import { XmlService } from '../../../xml.service';
import { UeManageService } from '../../../ueManage.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueAjout',
  templateUrl: './ueAjout.component.html',
  styleUrls: ['./ueAjout.component.css']
})
export class UeAjoutComponent implements OnInit {

  form: FormGroup;

  constructor(
    private ueManageService: UeManageService,
    private formsBuilder: FormBuilder,
    private router: Router
  ) {

   }

  ngOnInit() {
    this.form = this.formsBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.ueManageService.setUe(this.form.get('name').value);
    this.router.navigate(['/ueConfig']);
  }


}
