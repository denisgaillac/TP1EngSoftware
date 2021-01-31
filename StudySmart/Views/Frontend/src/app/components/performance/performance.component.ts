import { Component, OnInit } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { LoadingService } from './../../services/loading.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

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
    public localeService: BsLocaleService,
    public performanceService: PerformanceService,
    private loadingService: LoadingService
  ) { }

  async ngOnInit() {
    try {
      this.loadingService.show();
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
      await this.loadingDelay();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.loadingService.hide();
    }
  }

  //Função para realizar busca dos valores de desempenho de acordo com o intervalo de data selecionado
  async dateFilter(event) {
    try {
      this.loadingService.show();
      await this.loadingDelay();
      await this.performanceService._getProgress(event);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.loadingService.hide();
    }
  }

  //Função para calcular os vaores do gráfico de desempenho
  getYield(progress) {
    let dataYiels: any[] = [];
    for (let i = 1; i < progress.length; i++) {
      dataYiels.push({day: progress[i].day, value: progress[i-1].idealValue - progress[i].idealValue})
    }
    return dataYiels;
  }

  //Função para gerar delay quando necessário
  loadingDelay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}