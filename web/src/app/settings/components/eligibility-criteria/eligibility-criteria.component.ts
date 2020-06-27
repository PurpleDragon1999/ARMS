import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { AppServicesService } from "src/app/services/app-services.service";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";

@Component({
  selector: "app-eligibility-criteria",
  templateUrl: "./eligibility-criteria.component.html",
  styleUrls: ["./eligibility-criteria.component.scss"],
})
export class EligibilityCriteriaComponent implements OnInit {
  ngOnInit() { }
  eligibilityCriterionForm: FormGroup;
  addEligibilityCriteria: Boolean = false;
  eligibilityCriterionList: any;

  constructor(
    private fb: FormBuilder,
    private _service: AppServicesService,
    private modalService: NgbModal
  ) {
    this.eligibilityCriterionForm = this.fb.group({
      eligibilityCriteria: this.fb.array([]),
    });
  }

  loadEligibilityCriteria() {
    return this._service
      .getAllEligibilityCriterias()
      .subscribe((response: any) => {
        this.eligibilityCriterionList = response.payload.data;
      });
  }
  eligibilityCriteria(): FormArray {
    return this.eligibilityCriterionForm.get(
      "eligibilityCriteria"
    ) as FormArray;
  }

  newEligibilityCriterion(): FormGroup {
    return this.fb.group({
      eligibilityName: "",
    });
  }

  addEligibilityCriterion() {
    this.addEligibilityCriteria = true;
    this.eligibilityCriteria().push(this.newEligibilityCriterion());
  }

  removeEligibilityCriterion(eligibilityIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    this.eligibilityCriteria().removeAt(eligibilityIndex);
    if (eligibilityIndex == 0) {
      this.addEligibilityCriteria = false;
    }
    return this._service.deleteEligibilityCriterion(eligibilityIndex).subscribe(
      (response: any) => {
        this.loadEligibilityCriteria();
        modalRef.componentInstance.success = response.body.result.success;
        modalRef.componentInstance.message =
          response.body.result.payload.message;
      },
      (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      }
    );
  }

  onSubmit() {

  }
}
