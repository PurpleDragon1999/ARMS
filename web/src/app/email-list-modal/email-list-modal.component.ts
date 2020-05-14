import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-list-modal',
  templateUrl: './email-list-modal.component.html',
  styleUrls: ['./email-list-modal.component.scss']
})
export class EmailListModalComponent implements OnInit {

  constructor() { }

  get inputEmail() {
    return this.userEmails.get('primaryEmail');
    }

  emailList: string [];
  submitted = false;


    userEmails = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/)])
    });

  ngOnInit() {
        this.emailList = [];
  }

    handleSubmit() {
      this.submitted = true;

    // stop here if form is invalid
      if (this.userEmails.invalid) {
      return;
    }

      alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.userEmails.value));
    }

    ModalClose() {
      alert("Modal close here");
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

}
