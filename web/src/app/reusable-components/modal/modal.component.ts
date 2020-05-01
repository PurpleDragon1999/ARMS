import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeService } from "../../employee/employee.service";
import { HttpErrorResponse } from '@angular/common/http';
import { IResponse } from 'src/app/models/response.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() message: any;
  @Input() deleteFor: string;
  calleeService: any;
  requestRes: any;
  submitted: boolean = false;

  constructor(public activeModal: NgbActiveModal,
    private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  performRequest(data) {
    this.submitted = true;
    if (this.deleteFor == "employee") {
      this.calleeService = this.employeeService.deleteEmployee(data._id);
    }
    else {
      //add your services here for delete 
      //pass deleteFor from where this modal is being called
    }
    this.calleeService.subscribe(
      (res: IResponse) => {
        this.requestRes = res;

      },
      (error: HttpErrorResponse) => {
        this.requestRes = error.error;
      }
    );
  }

  simpleCloseModal() {
    this.activeModal.dismiss();
  }

  modalClose(rerender: boolean): void {
    console.log(rerender);
    this.closeModal.emit(rerender);
  }
}
