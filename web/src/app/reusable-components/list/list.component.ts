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
  pager: IPager;

  @Output()
  emitDelete: EventEmitter<IDataModal["data"]> = new EventEmitter<IDataModal["data"]>();

  @Output()
  emitSearch: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  emitOpenFileUploadModal: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  emitPaginatedResult: EventEmitter<number> = new EventEmitter<number>();

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
    this.emitPaginatedResult.emit(page);
  }
}
