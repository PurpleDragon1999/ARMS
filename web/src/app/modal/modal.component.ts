import { Output, EventEmitter, Input } from '@angular/core';
import { Component, OnInit, AfterViewInit, Injectable} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit {
 
  @Input() message : string="";

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  modalClose(){
    if (this.activeModal)
          this.activeModal.dismiss();
  }
}
