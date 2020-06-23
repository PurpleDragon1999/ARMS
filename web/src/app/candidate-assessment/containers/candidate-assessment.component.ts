import {Component, OnInit} from '@angular/core';
import { CandidateService } from 'src/app/candidate/services/candidate.service';
import { IResponse } from 'src/app/models/response.interface';
import {ActivatedRoute} from '@angular/router';
import {CandidateAssessmentService} from '../candidate-assessment.service';

@Component({
    selector: 'app-candidate-assessment',
    templateUrl: 'candidate-assessment.component.html'
})
export class CandidateAssessmentComponent implements OnInit {
    constructor(private candidateAssessmentService: CandidateAssessmentService, private route: ActivatedRoute) {}

    applicationData: any;

    ngOnInit() {
      console.log('Inside NgOnInit');
      this.route.params.subscribe(params => {
        console.log(params, 'params');
        this.candidateAssessmentService.getApplication(params.jdId, params.candidateId).subscribe((res: IResponse) => {
          console.log(res);
          this.applicationData = res.payload.data;
        });
      });
    }
}
