import { HttpErrorResponse } from '@angular/common/http';
import { IResponse } from 'src/app/models/response.interface';
import { CandidateService } from './../../candidate/services/candidate.service';
import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { IModelForPagination } from 'src/app/models/modelPagination.interface';
import { NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/reusable-components/modal/modal.component';
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent {
  checkedEntriesId : Array<number> = []
  isShowDiv : boolean = true

  @Input()
  title: string = '';

  @Input()
  columns: Array<string> = [];

  @Input()
  data: Array<any> = [];

  @Output()
  emitOpenModal: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  pager: any;

  @Output()
  emitDelete: EventEmitter<any["data"]> = new EventEmitter<any["data"]>();

  @Output()
  emitOpenFileUploadModal: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  emitPaginatedResult: EventEmitter<IModelForPagination> = new EventEmitter<IModelForPagination>();

  @Output()
  emitDownloadPdf: EventEmitter<string> = new EventEmitter<string>();

  openModal(formType: any["formType"], data?: any["data"]) {
    this.emitOpenModal.emit({ formType, data });
  }

  openFileUploadModal() {
    this.emitOpenFileUploadModal.emit();
  }

  deleteEntry(entry: any) {
    this.emitDelete.emit(entry);
  }

  setPageForPagination(character: string, page?: number) {
    this.emitPaginatedResult.emit({ page, character });
  }

  showPdf(id: string): void {
    this.emitDownloadPdf.emit(id);
  }

  checkAll(event) {
    if (this.data.every(entry => entry.checked == true)){
      this.data.forEach(entry => { entry.checked = false });
      this.checkedEntriesId = []
    }
      
    else{
      this.data.forEach(entry => { entry.checked = true });
      this.data.map(entry=>{
      this.checkedEntriesId.push(entry.id)
      })
      
    }
    
  }

  toggleDisplayDiv(){
    this.isShowDiv = !this.isShowDiv;
  }
}