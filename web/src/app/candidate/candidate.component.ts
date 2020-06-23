import { AppServicesService } from 'src/app/services/app-services.service';
import { INewResponse } from 'src/app/models/newResponse.interface';
import { Component, OnInit } from "@angular/core";
import { CandidateService } from './services/candidate.service';
import { IResponse } from '../models/response.interface';
import { IModelForPagination } from '../models/modelPagination.interface';
import { ICandidate } from '../models/candidate.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BufferToPdf } from '../utils/bufferToPdf';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
@Component({
    selector: 'app-candidate',
    templateUrl: 'candidate.component.html',
    styleUrls: ['candidate.component.scss'],
    providers: [BufferToPdf]
})
export class CandidateComponent implements OnInit {
    candidates: ICandidate[];
    columns: Array<string>;
    pager: any;
    employeeId:any;
    jobId:any;
    constructor(private candidateService: CandidateService, 
                private bufferToPdf: BufferToPdf,
                private route:ActivatedRoute,
                private _service:AppServicesService) { }

    ngOnInit():any{
         this.employeeId=this._service.tokenDecoder().Id;
         this.callFunction();
         this.getRoundData();
    }
    callFunction():any{
        
    this.route.params
    .pipe(
        switchMap((params: Params) => {
            this.jobId=params.jobId;
            return this.candidateService.getApplications(params.jobId);
        })
     )
       .subscribe((res) => {
       
            this.candidates = res.payload.data
            this.columns = ["name", "email", "experience", "Job Position"];
    
        });
        
      }
      getRoundData(){
         this._service.getRound(this.jobId,this.employeeId).subscribe((res)=>{
             console.log(res);
         }
         )

      }
   


    getCandidates(jobId){
        this.candidateService.getApplications(jobId).subscribe((res: INewResponse)=>{
        this.candidates = res.payload.data
        this.columns = ["name", "email", "experience", "Job Position"];

        })
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

    downloadPdf(cv: string): void {
        let newPdfWindow = window.open("", "Print");

        let iframe = `<\iframe width='100%' height='100%' src="${cv}"><\/iframe>`;

        newPdfWindow.document.write(iframe);
    }
}