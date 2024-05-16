import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {

  constructor(private http: HttpClient, private route: Router) { }
  public questions: any = [];

  ngOnInit() {
   let url = "./../assets/data/questions.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.questions = result;
      console.log(result);
    })
  }

  close() {
    this.route.navigate(['home/teacher']);
  }

  submitEvaluation() {
    // Aquí va la lógica para enviar la evaluación
    console.log("Evaluación enviada");
    // Por ejemplo, podrías enviar los datos a un servidor usando HttpClient
  }
}
