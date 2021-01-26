import { Activity } from '../../interfaces/Activity';
import { ModalService } from '../../services/modal.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit, OnDestroy {
  
  @ViewChild('addActivity') public addActivityModal: ElementRef;

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

  newActivity: Activity = {
    name: '',
    difficulty: 1,
    status: 'todo'
  }

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.modalService.closeModal();
  }

  //implementando lista drag and drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onNewActivityClick(){
    this.newActivity = {
      name: '',
      difficulty: 1,
      status: 'todo'
    }
    this.modalService.openModal(this.addActivityModal);
  }

  onSaveActivityClick(){
    console.log(this.newActivity);
  }

}