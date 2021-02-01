import { NotificationService } from './../../services/notification.service';
import { ClassesService } from 'src/app/services/classes.service';
import { LoadingService } from './../../services/loading.service';
import { ModalService } from '../../services/modal.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Class } from 'src/app/interfaces/Class';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  @ViewChild('addClass') public addClassModal: ElementRef;
  @ViewChild('editClass') public editClassModal: ElementRef;

  classes: Class[];

  currentClass: Class;

  formError: string;

  constructor(
    public modalService: ModalService,
    public loadingService: LoadingService,
    public classesService: ClassesService,
    public notificationService: NotificationService
  ) { }

  async ngOnInit(): Promise<void> {
    try{
      await this.loadingDelay(0);
      this.loadingService.show();
      await this.loadingDelay();
      this.classes = await this.classesService.getAll();
    }
    catch(err){
      console.log(err);
    }
    finally{
      this.loadingService.hide();
    }
  }

  //funções de adicionar matéria
  onNewClassClick(){
    this.currentClass = {
      name: ''
    }
    this.formError = null;
    this.modalService.openModal(this.addClassModal);
  }

  onSaveNewClassClick(){
    let err: boolean = false;
    if(!this.currentClass.name || this.currentClass.name == ""){
      console.log('Valor inválido no campo "Nome"');
      err = true;
    }

    if(err){
      this.formError = "Preencha todos os campos do formulário para salvar";
    } else {
      this.formError = null;
      this.modalService.closeModal();
      this.saveNewClass();
    }
  }

  async saveNewClass(){
    try{
      this.loadingService.show();
      await this.loadingDelay();
      let savedClass = await this.classesService.save(this.currentClass);
      this.classes.push(savedClass);
    }
    catch (err){
      console.log(err);
      this.notificationService.dangerMessage("Erro ao adicionar matéria");
    }
    finally{
      this.loadingService.hide();
    }
  }
  
  //funções de editar matéria
  onEditClassClick(item: Class){
    this.currentClass = Object.assign({},item);
    this.formError = null;
    this.modalService.openModal(this.editClassModal);
  }

  onSaveEditedClassClick(){
    let err: boolean = false;
    if(!this.currentClass.name || this.currentClass.name == ""){
      console.log('Valor inválido no campo "Nome"');
      err = true;
    }

    if(err){
      this.formError = "Preencha todos os campos do formulário para salvar";
    } else {
      this.formError = null;
      this.modalService.closeModal();
      this.saveEditedClass();
    }
  }

  async saveEditedClass(){
    try{
      this.loadingService.show();
      await this.loadingDelay();
      let savedActivity = await this.classesService.update(this.currentClass);
      let index = this.classes.indexOf(this.classes.find(c => c.id == this.currentClass.id));
      if(index >= 0){
        this.classes.splice(index, 1, savedActivity);
      } else{
        throw new Error('Index de matéria inválido');
      }
      this.notificationService.successMessage("Matéria atualizada com sucesso");
    }
    catch (err){
      console.log(err);
      this.notificationService.dangerMessage("Erro ao atualizar matéria");
    }
    finally{
      this.loadingService.hide();
    }
  }

  //funções de deletar atividade
  async onDeleteClassClick(item: Class){
    try{
      this.loadingService.show();
      await this.loadingDelay();
      const deleteResult: any = await this.classesService.delete(item.id);
      let index: number = this.classes.indexOf(item);
      this.classes.splice(index,1);
    }
    catch (err){
      console.log(err);
      this.notificationService.dangerMessage("Erro ao deletar matéria");
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
