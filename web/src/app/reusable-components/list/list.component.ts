import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  @Input()
  title: string = '';

  @Input()
  columns: Array<String> = [];

  @Input()
  data: Array<any> = [];

  @Output()
  emitOpenModal: EventEmitter<IDataModal> = new EventEmitter<IDataModal>();

  @Input()
  pager: any = {};

  @Output()
  emitDelete: EventEmitter<IDataModal["data"]> = new EventEmitter<IDataModal["data"]>();

  @Output()
  emitSearch: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  emitOpenFileUploadModal: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  emitPaginatedResult: EventEmitter<string> = new EventEmitter<string>();

  openModal(formType: IDataModal["formType"], data: IDataModal["data"]) {
    this.emitOpenModal.emit({ formType, data });
  }

  openFileUploadModal() {
    this.emitOpenFileUploadModal.emit();
  }

  search(character: string) {
    this.emitSearch.emit(character);
  }

  deleteEntry(entry: any) {
    this.emitDelete.emit(entry);
  }

  setPageForPagination(page: number) {
    this.emitPaginatedResult.emit(page.toString());
  }
}
