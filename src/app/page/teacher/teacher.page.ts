import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  userId: number = 0;
  isEvaluted = false;

  componet = EvaluacionPageModule;

  ngOnInit() {
    const state = this.route.getCurrentNavigation()?.extras?.state;
    if(state) {
      this.userId = state['userId'];
      console.log("UserId:",this.userId)
    }

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
  }

  logOut() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

  navigateToEvaluation(selectedTeacher: any) {
    this.modalRef.dismiss();
    this.setOpen(false, selectedTeacher);
    this.route.navigate(['/evaluacion'], { state: { teacher: selectedTeacher, idUser: this.userId} });
  }
}
