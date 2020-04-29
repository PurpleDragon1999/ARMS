import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  constructor() { }
  
  openModal(formType: IDataModal['formType'], data: IDataModal['data']) {
    console.log(formType, 'formType', data, 'data');
    this.emitOpenModal.emit({ formType, data });    
  }
}
