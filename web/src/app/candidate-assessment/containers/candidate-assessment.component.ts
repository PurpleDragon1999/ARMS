import {Component, OnInit} from '@angular/core';
import { IResponse } from 'src/app/models/response.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CandidateAssessmentService} from '../candidate-assessment.service';
import { map, switchMap } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-candidate-assessment',
    templateUrl: 'candidate-assessment.component.html'
})
export class CandidateAssessmentComponent implements OnInit {
    constructor(private candidateAssessmentService: CandidateAssessmentService, private route: ActivatedRoute) {}

    applicationData: any;
    criteriaData: Array<{roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number}> = new Array<{roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number}>();

    ngOnInit(): void {
      let getApplication$: Observable<IResponse> = new Observable<IResponse>();
      let getCriteria$: Observable<IResponse> = new Observable<IResponse>();
      this.route.params.subscribe((params) => {
        getApplication$ = this.candidateAssessmentService.getApplication(params.jdId, params.candidateId);
        getCriteria$ = this.candidateAssessmentService.getCriteriaType(params.jdId);
      });

      getApplication$.subscribe((res: IResponse) => {
          console.log(res, 'getApplication');
          this.applicationData = res.payload.data;
      });

      getCriteria$.subscribe((res: IResponse) => {
        console.log(res, 'getCriteria');
        this.criteriaData = res.payload.data;
      });
    }

  storeAssessment(data: any) {
      data.applicationId = this.applicationData.applicationId;
      console.log(data, 'data');

      this.candidateAssessmentService.storeAssessment(data).subscribe((res: IResponse) => {
        console.log(res, 'Response');
      });
  }
}
