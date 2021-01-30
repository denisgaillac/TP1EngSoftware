import { LoadingService } from './../../services/loading.service';
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

  todo: Activity[] = [];

  doing: Activity[] = [];

  done: Activity[] = [];

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
  previousDoneStatus: DoneStatus;

  difficultyEnum = Difficulty;
  doneStatusEnum = DoneStatus;

  minDate: Date;
  formError: string;

  constructor(
    public modalService: ModalService,
    public localeService: BsLocaleService,
    private activitiesService: ActivitiesService,
    private loadingService: LoadingService
  ){
    this.localeService.use('pt-br');
    this.minDate = new Date();
  }

  async ngOnInit(): Promise<void> {
    //busando as atividades
    await this.loadingDelay(0);
    try{
      this.loadingService.show();
      await this.loadingDelay();
      let activitiesList = await this.activitiesService.getAll();
      this.todo = activitiesList.filter(act => act.doneStatus == DoneStatus.todo);
      this.doing = activitiesList.filter(act => act.doneStatus == DoneStatus.doing);
      this.done = activitiesList.filter(act => act.doneStatus == DoneStatus.done);
    }
    catch(err){
      console.log(err);
    }
    finally{
      this.loadingService.hide();
    }
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
      if(event.container.id == 'cdk-drop-list-0'){
        //tarefa movida para "a fazer"
        this.currentActivity = this.todo[event.currentIndex];
        this.currentActivity.doneStatus = DoneStatus.todo;
      } else if(event.container.id == 'cdk-drop-list-1'){
        //tarefa movida para "fazendo"
        this.currentActivity = this.doing[event.currentIndex];
        this.currentActivity.doneStatus = DoneStatus.doing;
      } else {
        //tarefa movida para "feito"
        this.currentActivity = this.done[event.currentIndex];
        this.currentActivity.doneStatus = DoneStatus.done;
      }
      this.saveEditedActivity(false);
    }
  }

  //funções de adicionar atividade
  onNewActivityClick(){
    this.currentActivity = {
      name: '',
      difficulty: Difficulty.easy,
      doneStatus: DoneStatus.todo,
      conclusionStatus: null,
      expirationDate: null,
      conclusionDate: null,
      idClass: 1 //a ser alterado quando o CRUD de matérias for implementado
    }
    this.formError = null;
    this.modalService.openModal(this.addActivityModal);
  }

  onSaveNewActivityClick(){
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
      this.modalService.closeModal();
      this.saveNewActivity();
    }
  }

  async saveNewActivity(){
    try{
      this.loadingService.show();
      await this.loadingDelay();
      let savedActivity = await this.activitiesService.save(this.currentActivity);
      this.todo.unshift(savedActivity);
    }
    catch (err){
      console.log(err);
    }
    finally{
      this.loadingService.hide();
    }
  }

  //funções de editar atividade
  onEditActivityClick(activity: Activity){
    this.currentActivity = Object.assign({}, activity);
    this.previousDoneStatus = activity.doneStatus;
    this.formError = null;
    this.modalService.openModal(this.editActivityModal);
  }

  onSaveEditedActivityClick(){
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
    if(this.currentActivity.doneStatus == DoneStatus.done){
      if(!this.currentActivity.conclusionDate || this.currentActivity.conclusionDate.toDateString() == new Date(undefined).toDateString()){
        console.log('Valor inválido no campo "Data de conclusão"');
        err = true;
      }
    } else {
      this.currentActivity.conclusionDate = null;
    }

    if(err){
      this.formError = "Preencha todos os campos do formulário para salvar";
    } else {
      this.formError = null;
      this.saveEditedActivity();
    }
  }

  async saveEditedActivity(changeColumn: boolean = true){
    try{
      this.loadingService.show();
      await this.loadingDelay();
      this.currentActivity.conclusionDate = this.currentActivity.expirationDate; //NÃO PODE SER NULL NO BANCO (será alterado)
      let savedActivity = await this.activitiesService.update(this.currentActivity);
      
      if(changeColumn){
        //removendo atividade da coluna antiga
        let index: number;
        switch(this.previousDoneStatus){
          case DoneStatus.todo:
            index = this.todo.indexOf(this.todo.find(act => act.id == savedActivity.id));
            this.todo.splice(index,1);
            break
          case DoneStatus.doing:
            index = this.doing.indexOf(this.doing.find(act => act.id == savedActivity.id));
            this.doing.splice(index,1);
            break
          case DoneStatus.done:
            index = this.done.indexOf(this.done.find(act => act.id == savedActivity.id));
            this.done.splice(index,1);
            break
        }

        //adicionando atividade na coluna nova
        switch(savedActivity.doneStatus){
          case DoneStatus.todo:
            this.todo.unshift(savedActivity);
            break
          case DoneStatus.doing:
            this.doing.unshift(savedActivity);
            break
          case DoneStatus.done:
            this.done.unshift(savedActivity);
            break
        }
      }

    }
    catch (err){
      console.log(err);
    }
    finally{
      this.loadingService.hide();
      this.modalService.closeModal();
    }
  }

  //funções de deletar atividade
  async onDeleteActivityClick(activity: Activity){
    try{
      this.loadingService.show();
      await this.loadingDelay();
      const deleteResult: any = await this.activitiesService.delete(activity.id);
      let index: number;
      switch(activity.doneStatus){
        case DoneStatus.todo:
          index = this.todo.indexOf(activity);
          this.todo.splice(index,1);
          break
        case DoneStatus.doing:
          index = this.doing.indexOf(activity);
          this.doing.splice(index,1);
          break
        case DoneStatus.done:
          index = this.done.indexOf(activity);
          this.done.splice(index,1);
          break
      }
      console.log(deleteResult.value); //notificar usuário
    }
    catch (err){
      console.log(err);
      console.log(err.error); //notificar usuário
    }
    finally{
      this.loadingService.hide();
    }
  }

  //funções gerais
  loadingDelay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}