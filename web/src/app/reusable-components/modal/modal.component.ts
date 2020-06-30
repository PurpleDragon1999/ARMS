import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EmployeeService } from "../../employee/employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import { IResponse } from "src/app/models/response.interface";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  emitPerformRequest: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  shouldConfirm: boolean;

  // @Input()
  // sendAlert: boolean;

  @Input() success: boolean;
  @Input() message: string;

  submitted: boolean = false;

  constructor() {}

  ngOnInit() {}

  performRequest() {
    this.submitted = true;
    this.shouldConfirm = false;
    // this.sendAlert = false;
    this.emitPerformRequest.emit();
  }

  modalClose(rerender: boolean): void {
    this.closeModal.emit(rerender);
  }
}
