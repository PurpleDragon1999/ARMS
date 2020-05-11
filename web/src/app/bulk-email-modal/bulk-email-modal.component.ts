import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { Validators, AbstractControl, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bulk-email-modal',
  templateUrl: './bulk-email-modal.component.html',
  styleUrls: ['./bulk-email-modal.component.scss']
})
export class BulkEmailModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }

  emailList: string [];

  @Output() handle: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.emailList = [];
    // const toAddress = new FormControl('', [
    //   Validators.required,
    //   Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/)
    // ]);

    // this.sendEmailForm = new FormGroup({
    //   toAddress: toAddress
    // });
  }
  handleSubmit() {
    this.activeModal.close(this.emailList);
    }

    ModalClose() {
      this.activeModal.close();
    }

  extractEmailList(e) {
   this.emailList = [];
   const emails = e.split(',');
   emails.forEach(email => {
        if (email && email.length > 0) {
          this.emailList.push(email);
      }
    });

   console.log(this.emailList);
  }

}
