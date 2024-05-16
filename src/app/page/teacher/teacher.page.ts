import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EvaluacionPageModule } from '../evaluacion/evaluacion.module';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.page.html',
  styleUrls: ['./teacher.page.scss'],
})
export class TeacherPage implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  @ViewChild('modalRef') modalRef: any;
  public teachers: any = [];
  isModalOpen = false;
  selectedTeacher: any;

  componet = EvaluacionPageModule;

  ngOnInit() {
    let url = "./../assets/data/teachers.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.teachers = result;
      console.log(result);
    })
  }

  setOpen(isOpen: boolean, teacher: any) {
    this.isModalOpen = isOpen;
    this.selectedTeacher = teacher;
    console.log(teacher)
  }

  logOut() {
    localStorage.clear()
    this.route.navigate(['login']);
  }
}
