import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  ngOnInit() {}

  roundTypeForm: FormGroup;
  addRound: Boolean = false;

  constructor(private fb: FormBuilder) {
    this.roundTypeForm = this.fb.group({
      roundTypes: this.fb.array([]),
    });
  }

  roundTypes(): FormArray {
    return this.roundTypeForm.get("roundTypes") as FormArray;
  }

  newRoundType(): FormGroup {
    return this.fb.group({
      firstName: "",
      criteria: this.fb.array([]),
    });
  }

  addRoundType() {
    console.log("Adding a round type");
    this.addRound = true;
    this.roundTypes().push(this.newRoundType());
  }

  removeRoundType(typeIndex: number) {
    this.roundTypes().removeAt(typeIndex);
    if (typeIndex == 0) {
      this.addRound = false;
    }
  }

  roundCriteria(typeIndex: number): FormArray {
    return this.roundTypes().at(typeIndex).get("criteria") as FormArray;
  }

  newCriterion(): FormGroup {
    return this.fb.group({
      criterion: "",
    });
  }

  addRoundCriteria(typeIndex: number) {
    this.roundCriteria(typeIndex).push(this.newCriterion());
  }

  removeRoundCriteria(typeIndex: number, criteriaIndex: number) {
    this.roundCriteria(typeIndex).removeAt(criteriaIndex);
  }

  onSubmit() {
    console.log(this.roundTypeForm.value);
  }
}
