import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {

  constructor(private http: HttpClient) { }
  public teachers: any = [];

  ngOnInit() {
    let url = "./../assets/data/teachers.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.teachers = result;
      console.log(result);
    })
  }

}
