import { TokenDecoderService } from './../utilities/token-decoder.service';
import { UpdateCandidateComponent } from './../update-candidate/update-candidate.component';
import { ListComponent } from './../reusable-components/list/list.component';
import { Router } from '@angular/router';
import { UrltoFile } from './../utils/urlToFile';
import { IResponse } from 'src/app/models/response.interface';
import { AppServicesService } from 'src/app/services/app-services.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { CandidateService } from './services/candidate.service';
import { IModelForPagination } from '../models/modelPagination.interface';
import { ICandidate } from '../models/candidate.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BufferToPdf } from '../utils/bufferToPdf';
import { NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/reusable-components/modal/modal.component';
import {  ActivatedRoute, Params } from "@angular/router";

import { switchMap } from "rxjs/operators";
@Component({
    selector: 'app-candidate',
    templateUrl: 'candidate.component.html',
    styleUrls: ['candidate.component.scss'],
    providers: [UrltoFile, BufferToPdf],

})
export class CandidateComponent  {
    //candidates: ICandidate[];
    candidates : any
    columns: Array<string>;
    pager: any;
    file : any;
    resumeDetails : any
    employeeId:any;
    jobId:any = 0;
    roundData:any;
    role : string;
    constructor(private candidateService: CandidateService, 
                private bufferToPdf: BufferToPdf,
                private route:ActivatedRoute,
                private _service:AppServicesService,
                private router : Router,
                private urltoFile: UrltoFile,
                private modalService: NgbModal) { }

    ngOnInit():any{
         this.employeeId=this._service.tokenDecoder().Id;
         this.role = this._service.tokenDecoder().role;
         this.getCandidates();
         if (this.role=="Employee"){
          this.getRoundData();
         }
    }
    getCandidates(){
    this.route.params
    .pipe(
        switchMap((params: Params) => {
            this.jobId=params.jobId;
            return this.candidateService.getApplications(this.jobId);
        })
     )
       .subscribe((res) => { 
            this.candidates = res.payload.data
            this.columns = ["name", "email", "experience", "Job Position", "status"];
            if (this.candidates.length > 0){
              this.candidates.forEach(entry=>{
                entry.checked = false
              })
            }
        });
        
      }

      getRoundData(){
         this._service.getRound(this.jobId,this.employeeId).subscribe((res)=>{
            this.roundData=res.payload.data;
         }
         )
      }

    deleteApplication(data ) {
        let id = data.id
        const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    
        modalRef.componentInstance.shouldConfirm = true;
    
        modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
          modalRef.close();
        });
        modalRef.componentInstance.emitPerformRequest.subscribe(() => {
          this.candidateService.deleteApplication(id).subscribe((res : IResponse)=>{
            this.getCandidates()
            modalRef.componentInstance.success = res.success;
            modalRef.componentInstance.message = res.payload.message;
            }, (error ) => {
              modalRef.componentInstance.success = error.error.success;
              modalRef.componentInstance.message = error.error.payload.message;
          })
      });
      }

    searchCandidate(event: IModelForPagination) {
        this.candidateService.searchCandidate(event.page, event.character).subscribe((res: IResponse) => {
            this.candidates = res.payload.data.dataList;
            this.candidates.forEach((candidate: any) => {
                candidate.pdf = this.bufferToPdf.bufferToPdf(candidate.cv.data);
                if (candidate.appliedFor)
                    candidate.appliedFor = candidate.appliedFor.jdTitle;
            });
            this.columns = ["name", "email", "appliedFor", "experience"];
            this.pager = res.payload.data.pager;
        }, (error: HttpErrorResponse) => {
        });
    }

    getResume(id : number){
        this.candidateService.getResume(id).subscribe((res : IResponse)=>{
          if (res.success==true){
           
            this.resumeDetails = res.payload.data[0]
            let cv = this.resumeDetails.cv ? 
            "data:application/" +
            this.resumeDetails.name.split(".")[1] +
            ";base64," +
            this.resumeDetails.cv
                        : null;
            this.urltoFile.urltoFile(
            cv,
            this.resumeDetails.name,
            "application/octet-stream"
                      ).then(file=> {
            this.file = file;
            this.openResume()
                      });
          }
          else{
              this.router.navigate(['error', 500])
          }
        })
        
      }

    openResume(){
        let fileType = this.resumeDetails.name.split(".")[1];
        const blob = new Blob([this.file], { type:"application/" + fileType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    updateCandidate(data){
      const modalRef: NgbModalRef = this.modalService.open(UpdateCandidateComponent);
      modalRef.componentInstance.applicationId = data.data.id;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
    }

    shortlisting(data: any): void{
      this.candidateService.shorlistCandidates(data.jdId, data.checkedEntriesId, data.isShortlisted).subscribe((res:IResponse)=>{
      
        this.openResponseModal(res);
        if (res.success == true){
          this.getCandidates();
        }
      }, error =>{
        console.log(error)
      })
    }
    openResponseModal(res : IResponse){
      const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = res.success;
      modalRef.componentInstance.message = res.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
      })
    }
}