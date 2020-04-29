import { IEmployee } from './../employee/models/employee.interface';
import { EmployeeFormComponent } from '../employee/components/employee-form/employee-form.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, OnChanges, SimpleChange, EventEmitter, SimpleChanges, AfterContentInit, AfterViewInit, Output } from '@angular/core';

type FormType = "create" | "update" | "read"; 

interface IDataModal {
  formType: FormType,
  data: any; 
}

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
  data : Array<any> = [];

  @Output()
  emitOpenModal: EventEmitter<IDataModal> = new EventEmitter();

  constructor() { }
  
  ngOnInit(): void{
    console.log(this.data, this.columns, 'Inside ngOnInit');
  }
  
  openModal(formType: FormType, data: any) {
    console.log(formType, 'formType', data, 'data');
    this.emitOpenModal.emit({ formType, data });    
  }
}
