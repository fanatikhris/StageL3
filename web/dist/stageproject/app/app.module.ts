import { TeacherCalendarComponent } from './teacher/calendar/teacherCalendar/teacherCalendar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './students/calendar/calendar/calendar.component';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import { RoomCalendarComponent } from './room/calendar/roomCalendar/roomCalendar.component';
import { UeCalendarComponent } from './UE/calendar/ueCalendar/ueCalendar.component';
import { StudentStatComponent } from './students/stat/studentStat/studentStat.component';
import { RoomStatComponent } from './room/stat/roomStat/roomStat.component';
import { UeStatComponent } from './UE/stat/ueStat/ueStat.component';
import { UeAjoutComponent } from './UE/gestion/ueAjout/ueAjout.component';
import { UeConfigComponent } from './UE/gestion/ueConfig/ueConfig.component';
import { UeCoursComponent } from './UE/gestion/ueCours/ueCours.component';
import { AddTimeComponent } from './time/gestion/addTime/addTime.component';
import { CreateRoomComponent } from './room/gestion/createRoom/createRoom.component';
import { AddRoomToCourseComponent } from './room/gestion/addRoomToCourse/addRoomToCourse.component';
import { CreateStudentComponent } from './students/gestion/createStudent/createStudent.component';
import { AddStudentCourseComponent } from './addStudentCourse/addStudentCourse.component';
import { TimeTravelComponent } from './time/gestion/timeTravel/timeTravel.component';
import { AddRoomUnavailabilityComponent } from './room/gestion/addRoomUnavailability/addRoomUnavailability.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SetOptimizationComponent } from './setOptimization/setOptimization.component';
import { AddDistributionComponent } from './addDistribution/addDistribution.component';
import { CreateTeacherComponent } from './teacher/gestion/createTeacher/createTeacher.component';
import { RoomViewComponent } from './room/vue/roomView/roomView.component';
import { UeViewComponent } from './UE/vue/ueView/ueView.component';
import { ClassViewComponent } from './class/vue/classView/classView.component';
import { ClassInfoComponent } from './class/vue/classInfo/classInfo.component';
import { TimeViewComponent } from './time/vue/timeView/timeView.component';
import { RoomClassViewComponent } from './room/vue/roomClassView/roomClassView.component';
import { RoomInfoComponent } from './room/vue/roomInfo/roomInfo.component';
import { RoomUpdateComponent } from './room/gestion/roomUpdate/roomUpdate.component';
import { UeInfoComponent } from './UE/vue/ueInfo/ueInfo.component';
import { ClassUeViewComponent } from './class/vue/classUeView/classUeView.component';
import { StudentUeViewComponent } from './students/vue/studentUeView/studentUeView.component';
import { StudentViewComponent } from './students/vue/studentView/studentView.component';
import { StudentInfoComponent } from './students/vue/studentInfo/studentInfo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TimeUnavailabilityViewComponent } from './time/vue/timeUnavailabilityView/timeUnavailabilityView.component';
import { TeacherViewComponent } from './teacher/view/teacherView/teacherView.component';
import { TeacherClassViewComponent } from './teacher/view/teacherClassView/teacherClassView.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TeacherStatComponent } from './teacher/stat/teacherStat/teacherStat.component';


registerLocaleData(localeFr, 'fr-FR');

@NgModule({
   declarations: [
      AppComponent,
      CalendarComponent,
      RoomCalendarComponent,
      UeCalendarComponent,
      StudentStatComponent,
      RoomStatComponent,
      UeStatComponent,
      UeAjoutComponent,
      UeConfigComponent,
      UeCoursComponent,
      AddTimeComponent,
      AddTimeComponent,
      CreateRoomComponent,
      AddRoomToCourseComponent,
      CreateStudentComponent,
      AddStudentCourseComponent,
      TimeTravelComponent,
      AddRoomUnavailabilityComponent,
      SetOptimizationComponent,
      AddDistributionComponent,
      CreateTeacherComponent,
      RoomViewComponent,
      UeViewComponent,
      ClassViewComponent,
      ClassInfoComponent,
      TimeViewComponent,
      RoomClassViewComponent,
      RoomInfoComponent,
      UeInfoComponent,
      ClassUeViewComponent,
      StudentUeViewComponent,
      StudentViewComponent,
      StudentInfoComponent,
      RoomUpdateComponent,
      TimeUnavailabilityViewComponent,
      TeacherViewComponent,
      TeacherClassViewComponent,
      TeacherCalendarComponent,
      TeacherStatComponent
   ],
   imports: [
      DragDropModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FullCalendarModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      RouterModule,
      NgbModule
   ],
   providers: [],
   exports: [
      RouterModule
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
