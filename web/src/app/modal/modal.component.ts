import { Output, EventEmitter, Input } from '@angular/core';
import { EmployeeService } from "../employee/employee.service";
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
 
  @Input() message : any;
  @Input() deleteFor :string;
  calleeService: any;
  requestRes: any;
  submitted : Boolean = false;

  constructor(public activeModal: NgbActiveModal,
              private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  modalClose(){
    if (this.activeModal)
          this.activeModal.dismiss();
  }

  performRequest(data){
    this.submitted = true;
    if(this.deleteFor=="employee"){
      this.calleeService = this.employeeService.deleteEmployee(data._id);
    }
    else{
      //add your services here for delete 
      //pass deleteFor from where this modal is being called
    }
    this.calleeService.subscribe(
      (res) => {
        this.requestRes = res; 
        console.log(this.requestRes)       
      },
      (error) => {
        this.requestRes = error.error;        
      }
    );
  }
}
