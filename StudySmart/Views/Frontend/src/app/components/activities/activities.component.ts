import { ActivitiesService } from './../../services/activities.service';
import { Activity, Difficulty, DoneStatus } from '../../interfaces/Activity';
import { ModalService } from '../../services/modal.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})

export class ActivitiesComponent implements OnInit, OnDestroy {
  
  @ViewChild('addActivity') public addActivityModal: ElementRef;
  @ViewChild('editActivity') public editActivityModal: ElementRef;

  todo: Activity[] = [
    {
      id: 1,
      name: 'Testinho ES',
      difficulty: Difficulty.easy,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      expirationDate: null,
      conclusionDate: null,
      idClass: null
    },
    {
      id: 1,
      name: 'Ex RNA',
      difficulty: Difficulty.medium,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      expirationDate: null,
      conclusionDate: null,
      idClass: null
    },
    {
      id: 1,
      name: 'Trabalho ES',
      difficulty: Difficulty.hard,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      expirationDate: null,
      conclusionDate: null,
      idClass: null
    }
  ];

  doing: Activity[] = [
    {
      id: 1,
      name: 'Trabalho ES',
      difficulty: Difficulty.hard,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      expirationDate: null,
      conclusionDate: null,
      idClass: null
    }
  ];

  done: Activity[] = [
    {
      id: 1,
      name: 'Trabalho ES',
      difficulty: Difficulty.hard,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      // expirationDate: new Date("2021-02-01").toLocaleString("en-US", {timeZone: "Europe/London"}),
      expirationDate: null,
      conclusionDate: null,
      idClass: null
    }
  ];

  currentActivity: Activity = {
    id: 0,
    name: '',
    difficulty: Difficulty.easy,
    doneStatus: DoneStatus.todo,
    conclusionStatus: null,
    expirationDate: null,
    conclusionDate: null,
    idClass: null
  };

  difficultyEnum = Difficulty;
  doneStatusEnum = DoneStatus;

  minDate: Date;
  formError: string;

  constructor(
    public modalService: ModalService,
    public localeService: BsLocaleService,
    private activitiesService: ActivitiesService
  ){
    this.localeService.use('pt-br');
    this.minDate = new Date();
  }

  async ngOnInit(): Promise<void> {
    let activitiesList: Activity[] = await this.activitiesService.getAll();
    console.log(activitiesList);
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
      let movedItem: Activity;
      if(event.container.id == 'cdk-drop-list-0'){
        //tarefa movida para "a fazer"
        movedItem = this.todo[event.currentIndex];
        movedItem.doneStatus = DoneStatus.todo;
      } else if(event.container.id == 'cdk-drop-list-1'){
        //tarefa movida para "fazendo"
        movedItem = this.doing[event.currentIndex];
        movedItem.doneStatus = DoneStatus.doing;
      } else {
        //tarefa movida para "feito"
        movedItem = this.done[event.currentIndex];
        movedItem.doneStatus = DoneStatus.done;
      }
      console.log(movedItem);
    }
  }

  onNewActivityClick(){
    this.currentActivity = {
      id: 0,
      name: '',
      difficulty: Difficulty.easy,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      expirationDate: null,
      conclusionDate: null,
      idClass: null
    }
    this.formError = null;
    this.modalService.openModal(this.addActivityModal);
  }

  onEditActivityClick(activity: Activity){
    this.currentActivity = Object.assign({}, activity);
    this.formError = null;
    this.modalService.openModal(this.editActivityModal);
  }

  onSaveActivityClick(){
    console.log(this.currentActivity);
    let err: boolean = false;
    if(!this.currentActivity.name || this.currentActivity.name == ""){
      console.log('Valor inválido no campo "Nome"');
      err = true;
    }
    if(!this.currentActivity.expirationDate || this.currentActivity.expirationDate.toDateString() == new Date(undefined).toDateString()){
      console.log('Valor inválido no campo "Data de entrega"');
      err = true;
    }
    if(err){
      this.formError = "Preencha todos os campos do formulário para salvar";
    } else {
      this.formError = null;
      this.saveActivity();
    }
  }

  saveActivity(){
    console.log('salvando...');
  }

}