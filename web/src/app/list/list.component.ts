import { AdminFormComponent } from './../employee/containers/employee-form/employee-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

type FormType = "create" | "update" | "read"; 

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  formType: FormType;
  coloumns : any
  usersArray : any
  values : any

  constructor(private modalService : NgbModal, private AdminFormComponent:AdminFormComponent) { }

  ngOnInit() {
    this.assignValues()
    }

    assignValues(){
      this.coloumns = ["Name", "EmployeeId", "Designation", "Email", "Mobile"]
      this.usersArray = [
        {name:"Shivani Bansall", employeeId: "CGI1", designation:"Intern", email:"shivani.bansal@cygrp.com", mobile:"987654321"},
        {name:"Sonali Chawla", employeeId: "CGY1", designation:"Associate2", email:"sonali.chawla@cygrp.com", mobile:null},
      ]

      this.values = this.usersArray.map(user=>{
        console.log(user, "myUser")
        this.values = Object.values(user)
        return this.values
      })
      console.log(this.values, "values")
    }

    openModal(formType: FormType) {
      this.formType = formType;
      const modalRef = this.modalService.open(AdminFormComponent);
      modalRef.componentInstance.formType = this.formType;
      // modalRef.componentInstance.formType = this.formType;
    }

    // openModal(){
    //   this.modalService.open(AdminFormComponent)
    // }



}
