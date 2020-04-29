import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeUploadComponent } from '../employee/components/employee-upload/employee-upload.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input()
  columns : Array<String> = [];

  @Input()
  data : Array<any> = [];

  @Output()
  emitOpenModal: EventEmitter<IDataModal> = new EventEmitter();

  constructor(private modalService: NgbModal) { }
  
  openModal(formType: IDataModal['formType'], data: IDataModal['data']) {
    console.log(formType, 'formType', data, 'data');
    this.emitOpenModal.emit({ formType, data });    
  }

  openUpload(){
    const modalRef = this.modalService.open(EmployeeUploadComponent);
  }
}
