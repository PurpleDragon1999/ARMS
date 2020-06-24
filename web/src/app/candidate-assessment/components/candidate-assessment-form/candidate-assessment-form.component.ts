import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CandidateService } from 'src/app/candidate/services/candidate.service';
import { IResponse } from 'src/app/models/response.interface';

@Component({
    selector: 'app-candidate-assessment-form',
    templateUrl: 'candidate-assessment-form.component.html'
})
export class CandidateAssessmentFormComponent implements OnChanges {
  @Input()
  data: Array<{roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number}>;

  dataConstructedForForm: Array<{roundTypeName: string, roundId: number, criterias: Array<{ criteriaTypeId: number, criteriaName: string }>}> = [];

  selectedRoundId: number = null;

  @Output()
  storeAssessmentEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue) {
      this.data.map((cur: {roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number}) => {
        const isNotNewRoundName = this.dataConstructedForForm.find((x) => x.roundTypeName === cur.roundTypeName);
        if (!isNotNewRoundName) {
          this.dataConstructedForForm.push({ roundTypeName: cur.roundTypeName, roundId: cur.roundId, criterias: [{criteriaTypeId: cur.criteriaTypeId, criteriaName: cur.criteriaName}] });
          return;
        }

        isNotNewRoundName.criterias.push({criteriaTypeId: cur.criteriaTypeId, criteriaName: cur.criteriaName});
        console.log('inside NgOnChanges', this.data, this.dataConstructedForForm);
      });
    }
  }

  convertDataAccordingToApi(formValue: any): void {
    const modifiedData = {
      criterias: [],
      roundId: +formValue.roundId,
      feedback: formValue.feedback,
      result: +formValue.result,
    };

    for (const prop in formValue) {
      if (prop.split('-')[0] === 'marks') {
        const criteria = {
          criteriaTypeId: +prop.split('-')[1],
          marks: +formValue[prop],
          remarks: formValue['remarks-' + prop.split('-')[1]]
        };
        modifiedData.criterias.push(criteria);
      }
    }

    console.log(formValue, 'formValue', modifiedData);

    this.storeAssessmentEmitter.emit(modifiedData);
  }
}
