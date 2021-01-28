import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  //Construção do gráfico de Progresso
  optionsProgress = {
    //title: { text: 'Progresso' },
    legend: { data: ['Progresso Ideal', 'Progresso Real'] },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value' },
    series: [
      { name: 'Progresso Ideal', type: 'line', stack: 'Progresso Ideal', color: 'blue', data: [] },
      { name: 'Progresso Real', type: 'line', stack: 'Progresso Real', color: 'orange', data: [] },
    ]
  };

  //Construção do gráfico de Produtividade
  optionsYield = {
    //title: { text: 'Produtividade' },
    legend: { data: ['Taxa de Produtividade'] },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value' },
    series: [
      { name: 'Taxa de Produtividade', type: 'line', stack: 'Progresso Ideal', color: 'green', data: [] }
    ]
  };

  //Variáveis globais
  dataProgress: any[] = [];
  dataYield: any[] = [];

  constructor(
    public performanceService: PerformanceService
  ) { }

  async ngOnInit() {
    this.dataProgress = await this.performanceService.getProgress();
    this.dataYield = this.getYield(this.dataProgress);
    this.dataProgress.forEach(data => {
      this.optionsProgress.xAxis.data.push(data.day);
      this.optionsProgress.series[0].data.push(data.idealValue);
      this.optionsProgress.series[1].data.push(data.realValue);
    });
    this.dataYield.forEach(data => {
      this.optionsYield.xAxis.data.push(data.day);
      this.optionsYield.series[0].data.push(data.value);
    })
  }

  dateFilter(event) {
    console.log(event);
    let date: Date = new Date(event[0]);
    console.log(typeof date);
  }

  getYield(progress) {
    let dataYiels: any[] = [];
    for (let i = 1; i < progress.length; i++) {
      dataYiels.push({day: progress[i].day, value: progress[i-1].idealValue - progress[i].idealValue})
    }
    return dataYiels;
  }
}