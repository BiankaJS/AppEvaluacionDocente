import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.clear()
    this.route.navigate(['login']);
  }

  options: EChartsOption = {
    legend: {
      data: ['Maestro01', 'Maestro02', 'Maestro03', 'Maestro04', 'Maestro05', 'Maestro06']
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
        data: ['Pregunta01', 'Pregunta02', 'Pregunta03', 'Pregunta04', 'Pregunta05', 'Pregunta06']
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
