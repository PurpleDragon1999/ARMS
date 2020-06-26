import { Component, OnInit } from '@angular/core';
import { IResponse } from 'src/app/models/response.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateAssessmentService } from '../candidate-assessment.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../reusable-components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-candidate-assessment',
  templateUrl: 'candidate-assessment.component.html'
})
export class CandidateAssessmentComponent implements OnInit {
  constructor(private candidateAssessmentService: CandidateAssessmentService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) { }

  applicationData: any;
  criteriaData: Array<{ roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number }> = new Array<{ roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number }>();

  criteriaOnTheBasisOfSelectedRound: any;

  ngOnInit(): void {
    let getApplication$: Observable<IResponse> = new Observable<IResponse>();
    let getCriteria$: Observable<IResponse> = new Observable<IResponse>();
    this.route.params.subscribe((params) => {
      getApplication$ = this.candidateAssessmentService.getApplication(params.jdId, params.candidateId);
      getCriteria$ = this.candidateAssessmentService.getCriteriaType(params.jdId);
    });

    getApplication$.subscribe((res: IResponse) => {
      this.applicationData = res.payload.data;
      if (!this.applicationData) {
        this.router.navigate(['/candidate']);
      }
    });

    getCriteria$.subscribe((res: IResponse) => {
      this.criteriaData = res.payload.data;
    });
  }

  storeAssessment(data: any) {
    data.applicationId = this.applicationData.applicationId;

    this.candidateAssessmentService.storeAssessment(data).subscribe((res: IResponse) => {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = res.success;
      modalRef.componentInstance.message = res.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
    }, (error: HttpErrorResponse) => {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = error.error.success;
      modalRef.componentInstance.message = error.error.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
    });
  }

  getAssessment(roundId: number): void {

    this.candidateAssessmentService.getAssessment({ roundId, applicationId: this.applicationData.applicationId }).subscribe((res: IResponse) => {

      this.criteriaOnTheBasisOfSelectedRound = res.payload.data;
    });
  }
}
