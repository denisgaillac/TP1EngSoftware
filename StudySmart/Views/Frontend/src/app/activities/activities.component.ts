import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  todo = [
    'Prova de RNA',
    'Lista de LP',
    'Exercício 2 de RP',
    'Testinho 6 de ES',
    'Assistir às aulas de IBD'
  ];

  doing = [
    'Trabalho de ES',
    'TP de RNA'
  ];

  done = [
    'Exercício 1 de RP',
    'Testinho 5 de ES',
    'Aula 5 de ES'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

}
