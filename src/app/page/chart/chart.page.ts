import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  public teachers: any = [];
  public questions: any = [];
  teacher: string[] = [];
  questionIds: number[] = []; // Array to hold question IDs
  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit() {
    let url = "./../assets/data/teachers.json";
    let urlQuestions = "./../assets/data/questions.json";
    let data: Observable<any> = this.http.get(url);
    let questionsData: Observable<any> = this.http.get(urlQuestions);

    data.subscribe(result => {
      this.teachers = result;

      // Map the first names of teachers to an array
      this.teacher = this.teachers.map((t: Teacher) => t.first_name);
    });

    questionsData.subscribe(result => {
      this.questions = result;

      // Map the question IDs to an array
      this.questionIds = this.questions.map((q: any) => q.id);

      // Initialize options after data is loaded
      this.options = {
        legend: {
          data: this.teacher
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.questionIds // Use the question IDs here
          }
        ],
        series: this.generateSeriesData() // Call a function to generate series data
      };
    });
  }

  // Function to generate series data based on teacher information
  generateSeriesData(): any[] {
    let seriesData: any[] = [];
    this.teachers.forEach((teacher: Teacher, index: number) => {
      seriesData.push({
        name: teacher.first_name,
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: teacher.degree // Assuming 'scores' is an array of data for each teacher
      });
    });
    return seriesData;
  }

  logOut() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

  options: EChartsOption = {
    legend: {
      data: this.teacher
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: []
      }
    ],
    series: [
      {
        name: 'Maestro01',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: [200, 170, 240, 244, 200, 210]
      },
      {
        name: 'Maestro02',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: [320, 302, 341, 390, 450, 420]
      },
      {
        name: 'Maestro03',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: [200, 170, 240, 244, 220, 210]
      },
      {
        name: 'Maestro04',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: [200, 240, 244, 200, 220, 210]
      },
      {
        name: 'Maestro05',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: [200, 170, 240, 200, 220, 210]
      },
      {
        name: 'Maestro06',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        data: [200, 170, 240, 244, 200, 220]
      }
    ]
  };
}

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  urlImage: string;
  phone: string;
  office_location: string;
  years_of_experience: number;
  degree: string;
  schedules: string[];
}
