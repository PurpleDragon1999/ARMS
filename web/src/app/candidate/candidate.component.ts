import { IResponse } from 'src/app/models/response.interface';
import { Component, OnInit } from "@angular/core";
import { CandidateService } from './services/candidate.service';
import { IModelForPagination } from '../models/modelPagination.interface';
import { ICandidate } from '../models/candidate.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BufferToPdf } from '../utils/bufferToPdf';
import { NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/reusable-components/modal/modal.component';

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

    constructor(private modalService: NgbModal,private candidateService: CandidateService, private bufferToPdf: BufferToPdf) { }

    ngOnInit(): void {
        this.getCandidates();
        //this.searchCandidate({ page: 1, character: '' });
    }

    deleteApplication(data ) {
        console.log(data, "data")
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

    getCandidates(){
        this.candidateService.getApplications().subscribe((res: IResponse)=>{
        this.candidates = res.payload.data
        this.columns = ["name", "email", "experience", "Job Position"];
        console.log(this.candidates)
        
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