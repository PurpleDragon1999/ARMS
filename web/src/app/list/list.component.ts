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
    console.log(formType, "formType", data, "data");
    this.emitOpenModal.emit({ formType, data });
  }

  openUpload() {
    const modalRef = this.modalService.open(EmployeeUploadComponent);
  }

  setPage(page) {
    console.log(page, "set page called");
    // this.valueChange.emit(this.page);
    this.getEmployees(page);
    console.log(this.getEmployees, "my funcccccccccccc");
    console.log(this.pager, "pager");
  }

  search(character) {
    console.log(character, this.searchEmployee, "character");
    // this.searchEmployee(character);
    this.emitSearch.emit(character);
  }

  deleteEntry(entry: any) {
    console.log(entry, "entry");
    this.delete.emit(entry);
  }
}
