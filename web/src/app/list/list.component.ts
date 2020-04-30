import { ModalComponent } from './../modal/modal.component';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { EmployeeUploadComponent } from "../employee/components/employee-upload/employee-upload.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  @Input()
  columns: Array<String> = [];

  @Input()
  data: Array<any> = [];

  @Output()
  emitOpenModal: EventEmitter<IDataModal> = new EventEmitter();

  @Input()
  pager: any = {};

  @Input()
  getEmployees: Function;

  @Input()
  searchEmployee: Function;

  @Output()
  delete: EventEmitter<IDataModal["data"]> = new EventEmitter();

  @Output()
  emitSearch: EventEmitter<String> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  openModal(formType: IDataModal["formType"], data: IDataModal["data"]) {
    this.emitOpenModal.emit({ formType, data });
  }

  openUpload() {
    const modalRef = this.modalService.open(EmployeeUploadComponent);
  }  

  setPage(page) {
<<<<<<< HEAD
    // this.valueChange.emit(this.page);
=======
>>>>>>> b91005ba3fc0b4976c6b47904e531440a5685c56
    this.getEmployees(page);
  }

  search(character) {
<<<<<<< HEAD
    // this.searchEmployee(character);
=======
>>>>>>> b91005ba3fc0b4976c6b47904e531440a5685c56
    this.emitSearch.emit(character);
  }

  deleteEntry(entry: any) {
    this.delete.emit(entry);
  }
}
