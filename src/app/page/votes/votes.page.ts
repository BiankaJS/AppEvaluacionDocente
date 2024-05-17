import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { getEvaluaciones } from 'src/main'; // Asegúrate de ajustar la importación según tu estructura de proyecto
import { Observable } from 'rxjs';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.page.html',
  styleUrls: ['./votes.page.scss'],
})
export class VotesPage implements OnInit {
  public teachers = [];
  public thirdPlace = { name: '', place: "Tercer Lugar", score: 0 };
  public secondPlace = { name: '', place: "Segundo Lugar", score: 0 };
  public firstPlace = { name: '', place: "Primer Lugar", score: 0 };

  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
    this.loadTeachersAndEvaluations();
  }

  async loadTeachersAndEvaluations() {
    try {
      // Cargar lista de maestros
      let url = "./../assets/data/teachers.json";
      let data: Observable<any> = this.http.get(url);
      data.subscribe(result => {
        this.teachers = result;
        console.log(result);

        // Cargar evaluaciones después de obtener la lista de maestros
        this.loadEvaluations();
      });

    } catch (error) {
      console.error("Error loading data:", error);
      // Manejar el error aquí, como mostrar un mensaje al usuario
    }
  }

  async loadEvaluations() {
    try {
      // Cargar evaluaciones
      const evaluations = await getEvaluaciones();
      this.calculateScores(this.teachers, evaluations);
    } catch (error) {
      console.error("Error loading evaluations:", error);
      // Manejar el error aquí, como mostrar un mensaje al usuario
    }
  }

  calculateScores(teachers: any[], evaluations: any[]) {
    const teacherScores: { [teacherId: number]: { name: string, score: number } } = {};

    // Map teacher IDs to names for easy lookup
    const teacherMap = new Map(teachers.map(teacher => [teacher.id, `${teacher.first_name} ${teacher.last_name}`]));

    // Initialize teacher scores
    teachers.forEach(teacher => {
      teacherScores[teacher.id] = { name: teacherMap.get(teacher.id) || 'N/A', score: 0 };
    });

    // Calculate total scores
    evaluations.forEach(evaluation => {
      const teacherId = evaluation.TeacherId;
      const totalScore = evaluation.Questions.reduce((acc: any, question: any) => acc + parseInt(question.rating), 0);
      if (teacherScores[teacherId]) {
        teacherScores[teacherId].score += totalScore;
      }
    });

    // Sort teachers by score
    const sortedTeachers = Object.values(teacherScores).sort((a, b) => b.score - a.score);

    // Assign top 3 places with safe checks
    if (sortedTeachers.length > 0) {
      this.firstPlace = { ...sortedTeachers[0], place: 'Primer Lugar' };
    } else {
      this.firstPlace = { name: 'N/A', score: 0, place: 'Primer Lugar' };
    }

    if (sortedTeachers.length > 1) {
      this.secondPlace = { ...sortedTeachers[1], place: 'Segundo Lugar' };
    } else {
      this.secondPlace = { name: 'N/A', score: 0, place: 'Segundo Lugar' };
    }

    if (sortedTeachers.length > 2) {
      this.thirdPlace = { ...sortedTeachers[2], place: 'Tercer Lugar' };
    } else {
      this.thirdPlace = { name: 'N/A', score: 0, place: 'Tercer Lugar' };
    }
  }

  logOut() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}