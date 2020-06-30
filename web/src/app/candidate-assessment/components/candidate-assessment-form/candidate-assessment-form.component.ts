import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-candidate-assessment-form',
  templateUrl: 'candidate-assessment-form.component.html'
})
export class CandidateAssessmentFormComponent implements OnChanges {
  @Input()
  data: Array<{ roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number }>;

  @Input()
  criteriaOnTheBasisOfSelectedRound: any;

  dataConstructedForForm: Array<{ roundTypeName: string, roundId: number, criterias: Array<{ criteriaTypeId: number, criteriaName: string }> }> = [];

  selectedRoundId: number = null;

  @Output()
  storeAssessmentEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  getAssessmentEmitter: EventEmitter<number> = new EventEmitter<number>();

  formData: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.data.map((cur: { roundTypeName: string, criteriaName: string, roundId: number, criteriaTypeId: number }) => {
        const isNotNewRoundName = this.dataConstructedForForm.find((x) => x.roundTypeName === cur.roundTypeName);
        if (!isNotNewRoundName) {
          this.dataConstructedForForm.push({ roundTypeName: cur.roundTypeName, roundId: cur.roundId, criterias: [{ criteriaTypeId: cur.criteriaTypeId, criteriaName: cur.criteriaName }] });
          return;
        }

        isNotNewRoundName.criterias.push({ criteriaTypeId: cur.criteriaTypeId, criteriaName: cur.criteriaName });
      });
    }

    if (changes.criteriaOnTheBasisOfSelectedRound && changes.criteriaOnTheBasisOfSelectedRound.currentValue) {
      this.formData = {
        feedback: this.criteriaOnTheBasisOfSelectedRound.assessment.feedback,
        result: this.criteriaOnTheBasisOfSelectedRound.assessment.result ? '1' : '0',
        roundId: this.criteriaOnTheBasisOfSelectedRound.assessment.roundId,
        interviewPanelId: this.criteriaOnTheBasisOfSelectedRound.assessment.interviewPanelId,
        applicationId: this.criteriaOnTheBasisOfSelectedRound.assessment.applicationId,
        assessmentId: this.criteriaOnTheBasisOfSelectedRound.assessment.id,
      };

      this.criteriaOnTheBasisOfSelectedRound.criterias.map((criteria: any) => {
        this.formData['marks-' + criteria.criteriaTypeId] = criteria.marks;
        this.formData['remarks-' + criteria.criteriaTypeId] = criteria.remarks;
      });


    } else {
      this.formData = {
        feedback: '',
        result: null,
        roundId: null,
        interviewPanelId: null,
        applicationId: null,
        assessmentId: null
      }
    }
  }
  getAssessmentAndCriteriaAccordingToSelectedRound(selectedRound: number): void {
    this.selectedRoundId = selectedRound;
    this.getAssessmentEmitter.emit(this.selectedRoundId);
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



    this.storeAssessmentEmitter.emit(modifiedData);
  }
}
