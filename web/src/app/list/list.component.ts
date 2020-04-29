import { IEmployee } from './../employee/models/employee.interface';
import { EmployeeFormComponent } from '../employee/components/employee-form/employee-form.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, OnChanges, SimpleChange, EventEmitter, SimpleChanges, AfterContentInit, AfterViewInit, Output } from '@angular/core';

type FormType = "create" | "update" | "read"; 

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  formType: FormType;
  

  @Input()
  columns : Array<String> = [];

  @Input()
  employees : Array<any> = [];

  @Input()
  pager : any = {}

  @Input()
  getEmployees : Function;

  @Output() valueChange = new EventEmitter();
  page : number = 1

  constructor(private modalService : NgbModal) { }
  
  ngOnInit(): void{
    console.log(this.employees, this.columns, 'Inside ngOnInit');
  }
    openModal(formType: FormType, employee: IEmployee) {
      this.formType = formType;
      const modalRef = this.modalService.open(EmployeeFormComponent);
      modalRef.componentInstance.formType = this.formType;
      modalRef.componentInstance.employee = employee;
      modalRef.componentInstance.closeModal.subscribe(() => {
        modalRef.close();
      })
    }

    setPage(page){
      console.log(page, "set page called")
      this.page = page
      // this.valueChange.emit(this.page);
      this.getEmployees(page)
      console.log(this.getEmployees, "my funcccccccccccc")

    }
}
