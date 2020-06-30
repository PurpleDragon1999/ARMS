import { error } from 'util';
import { AppServicesService } from 'src/app/services/app-services.service';
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
export class ListComponent implements OnInit{
  checkedEntriesId : Array<number> = []
  isShowDiv : boolean = true
  role : string

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

  @Input()
  optionalCardData : any = {}

  @Output()
  emitDelete: EventEmitter<any["data"]> = new EventEmitter<any["data"]>();

  @Output()
  emitOpenFileUploadModal: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  emitPaginatedResult: EventEmitter<IModelForPagination> = new EventEmitter<IModelForPagination>();

  @Output()
  emitDownloadPdf: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  emitShortlist: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService : NgbModal,private _service : AppServicesService, private candidateService: CandidateService){
  }

  ngOnInit(){
    this.role = this._service.tokenDecoder().role
  }

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

  checkSpecific(event, applicationId : number){
    this.data.forEach(entry=>{
      if (entry.id==applicationId){
        if ( !this.checkedEntriesId.includes(applicationId) && entry.checked == false){
          // entry.checked = true;
          this.checkedEntriesId.push(applicationId)
        }
        else{
          // entry.checked = false;
          let idIndex = this.checkedEntriesId.indexOf(applicationId);  
          //if its exists in array
          if (idIndex > -1) {  
            this.checkedEntriesId.splice(idIndex, 1);
          }
        }
      }
    })
    
  }

  check(event, isChecked : boolean){
    
    if (isChecked == false){
      this.data.forEach(entry => { entry.checked = false });
      this.checkedEntriesId = []

    }
    else {
         this.data.forEach(entry => { entry.checked = true });
         this.checkedEntriesId = [];
         this.data.map(entry=>{
         this.checkedEntriesId.push(entry.id)
         })
    }
    
  }

  shorlisting(isShortlisted : boolean){
    this.emitShortlist.emit({ jdId: this.data[0].jobId, checkedEntriesId: this.checkedEntriesId, isShortlisted });
  }

  toggleDisplayDiv(){
    this.isShowDiv = !this.isShowDiv;
  }
}