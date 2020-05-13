import { ApiService } from '../../../api.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { UeManageService } from '../../../ueManage.service';
import { Component, OnInit } from '@angular/core';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ueCours',
  templateUrl: './ueCours.component.html',
  styleUrls: ['./ueCours.component.css']
})
export class UeCoursComponent implements OnInit {
  types = [];
  cours = [];
  ueId: any;
  teachers = [];
  tCourses = [];
  allTypesHaveCourse: boolean[] = [];
  parents = [];
  id: any;
  parentval: any;
  form: FormGroup;

  constructor(
    private ueManageService: UeManageService,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getTeachers().subscribe(
      (res) => {
        this.teachers = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.ueId = this.ueManageService.getUeId();
    this.types = this.ueManageService.getTypes();
    this.types.forEach( _ => {
      this.allTypesHaveCourse.push(false);
    });
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      groupe: ['', Validators.required],
      teacher: ['', Validators.required],
      nb: ['', Validators.required],
    });

  }


  arrayMap(num: any)  {
    return Array(num).keys();
  }

  setParents() {
    this.parents = [];
    const indexOfParents = this.types.indexOf(this.form.get('type').value) - 1;
    if (indexOfParents >= 0) {
      this.cours.forEach(classe => {
        const id = classe.attr.id.split('_');
        if (id[1] === this.types[indexOfParents]) {
          this.parents.push(classe.attr.id);
        }
      });
    }
  }


  addCours() {
    if (
      this.cours
      .find( x =>
        x.attr.id === `${this.ueManageService.getUeId()}_${this.form.get('type').value}_${this.form.get('groupe').value}`
      ) === undefined) {


      this.tCourses.push({
        teacher: `${this.form.get('teacher').value}`,
        course: `${this.ueManageService.getUeId()}_${this.form.get('type').value}_${this.form.get('groupe').value}`
      });
      if (this.parentval === undefined) {
        this.cours.push({
          attr: {
            id: `${this.ueManageService.getUeId()}_${this.form.get('type').value}_${this.form.get('groupe').value}`,
            limit: `${this.form.get('nb').value}`
          }
        });
      } else {
        this.cours.push({
          attr: {
            id: `${this.ueManageService.getUeId()}_${this.form.get('type').value}_${this.form.get('groupe').value}`,
            limit: `${this.form.get('nb').value}`,
            parent: this.parentval
          }
        });
      }
      const index = this.types.indexOf(this.form.get('type').value);
      this.allTypesHaveCourse[index] = true;

      this.form = this.formBuilder.group({
        type: ['', Validators.required],
        groupe: ['', Validators.required],
        teacher: ['', Validators.required],
        nb: ['', Validators.required],
      });
      this.parents = [];
    } else  {
      alert('Ce cours existe déjà');
    }


  }

  isValid() {
    return ( this.form.get('type').value === '' || this.form.get('groupe').value === '' || this.form.get('nb').value === '' || this.form.get('teacher').value === '' );
  }

  saveCours() {
    let allset = true;
    this.allTypesHaveCourse.forEach( elem => {
      if (elem === false) {
        alert('Tous les types n\'ont pas de cours !');
        allset = false;
      }
    });

    if (allset) {
      this.ueManageService.addCours(this.cours);
      this.apiService.setTeacherCourse(this.tCourses).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
      this.tCourses = [];
      this.cours = [];
      this.allTypesHaveCourse = [];
      this.types = [];
      this.ueManageService.reset();
    }
  }


}
