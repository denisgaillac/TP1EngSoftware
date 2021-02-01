import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PerformanceService } from '../../services/performance.service';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { LoadingService } from './../../services/loading.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { NotificationService } from '../../services/notification.service';
import { ModalService } from '../../services/modal.service';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  @ViewChild('infoModal') public infoModal: ElementRef;

  //Construção do gráfico de Progresso
  optionsProgress = {
    //title: { text: 'Progresso' },
    legend: { data: ['Burndown Ideal', 'Burndown Real'] },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value', name: 'Pontos (Un)',
      nameTextStyle: {
      color: "black",
      align: "right"
    }},
    series: [
      { name: 'Burndown Ideal', type: 'line', stack: 'Burndown Ideal', color: 'blue', data: [] },
      { name: 'Burndown Real', type: 'line', stack: 'Burndown Real', color: 'orange', data: [] },
    ]
  };

  //Construção do gráfico de Produtividade
  optionsYield = {
    //title: { text: 'Produtividade' },
    legend: { data: ['Taxa de Produtividade'] },
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value', name:"Pontos (Un)",       
      nameTextStyle: {
      color: "black",
      align: "right"
    }
    },
    series: [
      { name: 'Taxa de Produtividade', type: 'line', stack: 'Progresso Ideal', color: 'green', data: [] }
    ]
  };

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  //Variáveis globais
  dataProgress: any[];
  dataYield: any[] = [];
  view: boolean = true;

  constructor(
    public localeService: BsLocaleService,
    public performanceService: PerformanceService,
    public notificationService: NotificationService,
    private loadingService: LoadingService,
    private modalService: ModalService
  ) { }

  //Função executada ao iniciar componente
  async ngOnInit() {
    this.bsValue.setDate(this.bsValue.getDate() - 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  //Função que calcula o número total de pontos e faz uma chamada para a formatação dos valores
  TotalDifficulty(dataProgress) {
    let total: number = 0;
    for (let i=0; i < dataProgress.length; i++) {
      total += dataProgress[i].idealValue;
    }
    let data: any = this.changeData(dataProgress, total);
    console.log(data);
    return data
  }

  //Função que muda o formato dos valores para se adequar ao gráfico
  changeData(dataProgress, total) {
    let totalIdeal = total;
    let totalReal = total;
    dataProgress.forEach(dp => {
      let aux1: any[] = dp.date.split("-");
      let aux2: any[] = aux1[2].split("T");
      dp.date = aux2[0] + "/" + aux1[1];

      dp.idealValue = totalIdeal - dp.idealValue;
      totalIdeal = dp.idealValue;
      dp.realValue = totalReal - dp.realValue;
      totalReal = dp.realValue;
    });
    return dataProgress;
  }

  //Função para construir os gráficos
  async chartBuilder(data) {
    try {
      this.clearCharts();
      this.loadingService.show();
      let dataProgress = this.TotalDifficulty(data);
      this.dataYield = this.getYield(dataProgress);
      dataProgress.forEach(data => {
        this.optionsProgress.xAxis.data.push(data.date);
        this.optionsProgress.series[0].data.push(data.idealValue);
        this.optionsProgress.series[1].data.push(data.realValue);
      });
      this.dataYield.forEach(data => {
        this.optionsYield.xAxis.data.push(data.date);
        this.optionsYield.series[0].data.push(data.value);
      })
      await this.loadingDelay();
      this.notificationService.successMessage("Os gráficos foram atualizados");
    }
    catch (err) {
      this.notificationService.dangerMessage("Não foi possível carregar os gráficos");
      console.log(err);
    }
    finally {
      this.view = true;
      this.loadingService.hide();
    }
  }

  //Função para limpar os gráficos e plotar valores atualizados
  clearCharts() {
    this.view = false;
    this.optionsProgress.xAxis.data = [];
    this.optionsProgress.series[0].data = [];
    this.optionsProgress.series[1].data = [];
    this.optionsYield.xAxis.data = [];
    this.optionsYield.series[0].data = [];
  }

  //Função para realizar busca dos valores de desempenho de acordo com o intervalo de data selecionado
  async dateFilter(event) {
    try {
      this.loadingService.show();
      let data: any = await this.performanceService.getProgress({initialDate: event[0], finalDate: event[1]});
      this.clearCharts();
      this.chartBuilder(data);
      this.loadingDelay();
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
      dataYiels.push({date: progress[i].date, value: progress[i-1].realValue - progress[i].realValue})
    }
    return dataYiels;
  }

  openInfoModal() {
    this.modalService.openModal(this.infoModal);
  }

  //Função para gerar delay quando necessário
  loadingDelay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}