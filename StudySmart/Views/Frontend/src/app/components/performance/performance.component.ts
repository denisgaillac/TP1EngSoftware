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
    title: { text: 'Progresso' },
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
    title: { text: 'Produtividade' },
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
  dataChart: any[];

  constructor(
    public performanceService: PerformanceService
  ) { }

  ngOnInit(): void {
    this.dataChart = this.performanceService.getData();
    this.dataChart.forEach(dt => {
      this.optionsProgress.xAxis.data.push(dt.day);
      this.optionsProgress.series[0].data.push(dt.idealValue);
      this.optionsProgress.series[1].data.push(dt.realValue);

      //Temporário
      this.optionsYield.xAxis.data.push(dt.day);
      this.optionsYield.series[0].data.push(dt.idealValue);
    });
  }

}