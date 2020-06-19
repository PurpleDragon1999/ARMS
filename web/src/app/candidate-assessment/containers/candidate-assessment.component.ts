import { Component } from '@angular/core';
import { CandidateService } from 'src/app/candidate/services/candidate.service';
import { IResponse } from 'src/app/models/response.interface';

@Component({
    selector: 'app-candidate-assessment',
    templateUrl: 'candidate-assessment.component.html'
})
export class CandidateAssessmentComponent {
    constructor(private candidateService: CandidateService) {
        this.candidateService.getCandidate().subscribe((res: IResponse) => {
            console.log(res, 'Response');
        });
    }
}