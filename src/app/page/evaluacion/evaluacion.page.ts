import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  close() {
    this.route.navigate(['home/teacher']);
  }
}
