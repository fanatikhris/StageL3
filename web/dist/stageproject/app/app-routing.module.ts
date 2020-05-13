import { TeacherViewComponent } from './teacher/view/teacherView/teacherView.component';
import { StudentInfoComponent } from './students/vue/studentInfo/studentInfo.component';
import { StudentViewComponent } from './students/vue/studentView/studentView.component';
import { UeInfoComponent } from './UE/vue/ueInfo/ueInfo.component';
import { RoomViewComponent } from './room/vue/roomView/roomView.component';
import { RoomInfoComponent } from './room/vue/roomInfo/roomInfo.component';
import { ClassInfoComponent } from './class/vue/classInfo/classInfo.component';
import { UeViewComponent } from './UE/vue/ueView/ueView.component';
import { CreateTeacherComponent } from './teacher/gestion/createTeacher/createTeacher.component';
import { AddDistributionComponent } from './addDistribution/addDistribution.component';
import { SetOptimizationComponent } from './setOptimization/setOptimization.component';
import { AddRoomUnavailabilityComponent } from './room/gestion/addRoomUnavailability/addRoomUnavailability.component';
import { TimeTravelComponent } from './time/gestion/timeTravel/timeTravel.component';
import { AddStudentCourseComponent } from './addStudentCourse/addStudentCourse.component';
import { CreateStudentComponent } from './students/gestion/createStudent/createStudent.component';
import { AddRoomToCourseComponent } from './room/gestion/addRoomToCourse/addRoomToCourse.component';
import { CreateRoomComponent } from './room/gestion/createRoom/createRoom.component';
import { AddTimeComponent } from './time/gestion/addTime/addTime.component';
import { UeCoursComponent } from './UE/gestion/ueCours/ueCours.component';
import { UeConfigComponent } from './UE/gestion/ueConfig/ueConfig.component';
import { UeAjoutComponent } from './UE/gestion/ueAjout/ueAjout.component';
import { StudentStatComponent } from './students/stat/studentStat/studentStat.component';
import { RoomCalendarComponent } from './room/calendar/roomCalendar/roomCalendar.component';
import { CalendarComponent } from './students/calendar/calendar/calendar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UeCalendarComponent } from './UE/calendar/ueCalendar/ueCalendar.component';
import { RoomStatComponent } from './room/stat/roomStat/roomStat.component';
import { UeStatComponent } from './UE/stat/ueStat/ueStat.component';
import { TeacherClassViewComponent } from './teacher/view/teacherClassView/teacherClassView.component';
import { TeacherCalendarComponent } from './teacher/calendar/teacherCalendar/teacherCalendar.component';
import { TeacherStatComponent } from './teacher/stat/teacherStat/teacherStat.component';


const routes: Routes = [
  { path: 'studentCalendar', component: CalendarComponent},
  { path: 'studentStat', component: StudentStatComponent },
  { path: 'roomCalendar', component: RoomCalendarComponent },
  { path: 'roomStat', component: RoomStatComponent },
  { path: 'teacherStat', component: TeacherStatComponent },
  { path: 'ueCalendar', component: UeCalendarComponent },
  { path: 'ueStat', component: UeStatComponent },
  { path: 'ue/ajoutUe', component: UeAjoutComponent },
  { path: 'ueConfig', component: UeConfigComponent },
  { path: 'ueCours', component: UeCoursComponent },
  { path: 'ajoutTime/:id', component: AddTimeComponent },
  { path: 'roomView/createSalle', component: CreateRoomComponent },
  { path: 'ajoutSalle/:id', component: AddRoomToCourseComponent },
  { path: 'studentView/createStudent', component: CreateStudentComponent },
  { path: 'addStudentCourse', component: AddStudentCourseComponent },
  { path: 'addTravelTime', component: TimeTravelComponent },
  { path: 'addRoomUnavailability/:id', component: AddRoomUnavailabilityComponent },
  { path: 'setOpti', component: SetOptimizationComponent},
  { path: 'ajoutDistribution', component: AddDistributionComponent},
  { path: 'teacherView/createTeacher', component: CreateTeacherComponent},
  { path: 'ue', component: UeViewComponent},
  { path: 'ue/:id', component: UeInfoComponent},
  { path: 'class/:id', component: ClassInfoComponent},
  { path: 'room/:id', component: RoomInfoComponent},
  { path: 'roomView', component: RoomViewComponent},
  { path: 'studentView', component: StudentViewComponent},
  { path: 'studentInfo/:id', component: StudentInfoComponent},
  { path: 'teacherView', component: TeacherViewComponent},
  { path: 'teacher/:id', component: TeacherClassViewComponent},
  { path: 'teacherCalendar', component: TeacherCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
