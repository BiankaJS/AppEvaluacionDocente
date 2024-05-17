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
  teacher: string[] = [];
  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit() {
    let url = "./../assets/data/teachers.json";
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.teachers = result;

    this.teachers.map((t: Teacher) => {
      console.log(t)
      console.log(t['first_name'])
      this.teacher.push(...t['first_name']);
    });
    })
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
        axisTick: {show: false},
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