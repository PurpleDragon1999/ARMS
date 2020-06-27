import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppServicesService } from '../services/app-services.service';
import { ModalComponent } from '../reusable-components/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { JobService } from '../services/job.service'
@Component({
  selector: 'app-email-list-modal',
  templateUrl: './email-list-modal.component.html',
  styleUrls: ['./email-list-modal.component.scss']
})
export class EmailListModalComponent implements OnInit {

  constructor(private _service: AppServicesService,
    private modalService: NgbModal,
    private jobService: JobService) { }

  @Input()
  jdObjId: string;

  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  emailList: string[];
  submitted = false;

  get inputEmail() {
    return this.userEmails.get('primaryEmail');
  }

  userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/)])
  });

  ngOnInit() {
    this.emailList = [];
  }

  handleSubmit() {
    this.jobService.sendMails(this.emailList, this.jdObjId).subscribe((res: any) => {
      this.modalClose(true);
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;

      modalRef.componentInstance.success = res.body.success;
      modalRef.componentInstance.message = res.body.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });

    },
      (error: HttpErrorResponse) => {
        const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.shouldConfirm = false;
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
      }
    );
  }

  // extracting list of emails
  extractEmailList(e) {
    this.emailList = [];
    const emails = e.split(',');
    emails.forEach(email => {
      if (email && email.length > 0) {
        this.emailList.push(email);
      }
    });
  }

  modalClose(rerender: boolean) {
    this.closeModal.emit(rerender);
  }


}
