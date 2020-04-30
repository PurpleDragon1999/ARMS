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

  @Output()
  delete: EventEmitter<IDataModal["data"]> = new EventEmitter();

  @Output()
    emitPage : EventEmitter<number> = new EventEmitter();

  @Output()
  emitSearch: EventEmitter<String> = new EventEmitter();
  
  constructor(private modalService: NgbModal) {}

  openModal(formType: IDataModal["formType"], data: IDataModal["data"]) {
    this.emitOpenModal.emit({ formType, data });
  }

  openUpload() {
    const modalRef = this.modalService.open(EmployeeUploadComponent);
  }

  setPage(page : number) {
    console.log(page, "page")
    this.emitPage.emit(page)
  
  }

  search(character : string) {
    this.emitSearch.emit(character);
  }

  deleteEntry(entry: any) {
    this.delete.emit(entry);
  }
}
