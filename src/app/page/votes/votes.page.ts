import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.page.html',
  styleUrls: ['./votes.page.scss'],
})
export class VotesPage implements OnInit {

  public thirdPlace = { name: 'Alberto Jaramillo', place: "Tercer Lugar", score: 100 };
  public secondPlace = { name: 'Bianka Juarez', place: "Segundo Lugar", score: 200 };
  public firstPlace = { name: 'Ashli Acosta', place: "Primer Lugar", score: 300 };

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

}
