import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor(
  private http: HttpClient
) { }

apilink = 'http://localhost/web/api/';

getRooms() {
  return this.http.get(this.apilink + 'getrooms.php');
}

getRoomById(id) {
  return this.http.post(this.apilink + 'getroombyid.php', id);
}

updateRoom(data) {
  return this.http.post(this.apilink + 'updateroom.php', data);
}

addRoom(data): Observable<any> {
  return this.http.post(this.apilink + 'postroom.php', data);
}

addTeacher(id): Observable<any> {
  return this.http.post(this.apilink + 'postteacher.php', id);
}

getTeachers(): Observable<any> {
  return this.http.get(this.apilink + 'getteachers.php');
}

setTeacherCourse(data): Observable<any> {
  return this.http.post(this.apilink + 'postteachercourse.php', data);
}

getCourseTeacher(data): Observable<any> {
  return this.http.post(this.apilink + 'getcourseteacher.php', data);
}

getTeacherCourse(): Observable<any> {
  return this.http.get(this.apilink + 'getteachercourse.php');
}

getTeacherCourseById(data): Observable<any> {
  return this.http.post(this.apilink + 'getteachercoursebyid.php', data);
}

saveModifiedFile(data) {
  return this.http.post(this.apilink + 'savemodifiedfile.php', data);
}

saveFile(data) {
  return this.http.post(this.apilink + 'savefile.php', data);
}

// fonction premettant de charger les fichier xml
loadXML(file: string) {
  return this.http.get(file, // recupere le contenu de file de manière asynchrone
    {
      headers: new HttpHeaders() // on precise que l'on recupère des données d'un fichier XML
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'),
      responseType: 'text' // les données récupérées seront sous forme d'une string
    });

}
}
