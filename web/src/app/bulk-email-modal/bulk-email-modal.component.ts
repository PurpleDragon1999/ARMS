import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bulk-email-modal',
  templateUrl: './bulk-email-modal.component.html',
  styleUrls: ['./bulk-email-modal.component.scss']
})
export class BulkEmailModalComponent implements OnInit {

  constructor() { }
  sendEmailForm: FormGroup;

  emailList: string [];

  ngOnInit(): void {
    this.emailList = [];
    const toAddress = new FormControl('', [
      Validators.required,
      Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/)
    ]);

    this.sendEmailForm = new FormGroup({
      toAddress: toAddress
    });
  }

  extractEmailList(e) {
    this.emailList = [];
    if (this.sendEmailForm.valid) {
      let emails = e.split(',');
      emails.forEach(email => {
        if (email && email.length > 0) {
          this.emailList.push(email);
        }
      });
    }
    console.log(this.emailList);
  }

}
