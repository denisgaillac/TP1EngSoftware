import { Injectable } from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  private modalRef: NgbModalRef;
  
  constructor(private modalService: NgbModal) { }

  openModal(content, modalSize = 'md') {
    this.modalRef = this.modalService.open(content, {size: modalSize, centered: true});
  }

  closeModal(){
    if(this.modalRef){
      this.modalRef.close();
    }
  }

}
