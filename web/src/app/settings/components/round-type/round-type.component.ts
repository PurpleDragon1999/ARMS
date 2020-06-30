import { AppServicesService } from "src/app/services/app-services.service";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-round-type",
  templateUrl: "./round-type.component.html",
  styleUrls: ["./round-type.component.scss"],
})
export class RoundTypeComponent implements OnInit {
  ngOnInit() { }

  roundTypeForm: FormGroup;
  addRound: boolean = false;
  roundTypeList: any = [];

  constructor(
    private fb: FormBuilder,
    private _service: AppServicesService,
    private modalService: NgbModal
  ) {
    this.roundTypeForm = this.fb.group({
      roundTypes: this.fb.array([]),
    });
  }

  roundTypes(): FormArray {
    return this.roundTypeForm.get("roundTypes") as FormArray;
  }

  newRoundType(): FormGroup {
    return this.fb.group({
      roundName: "",
      criteria: this.fb.array([]),
      createdBy: this._service.tokenDecoder().userName,
      modifiedBy: this._service.tokenDecoder().userName
    });
  }

  addRoundType() {
    this.addRound = true;
    this.roundTypes().push(this.newRoundType());
  }

  loadRoundTypes() {
    return this._service.getAllRoundTypes().subscribe((response: any) => {
      this.roundTypeList = response.payload.data;
    });
  }

  deleteNewEntry(typeIndex){
    this.roundTypes().removeAt(typeIndex);
    if ((this.roundTypeForm.get('roundTypes').value.length)==0) {
      this.addRound = false;
    }
  }

  removeRoundType(typeIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = true;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });

    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this.deleteNewEntry(typeIndex);

      return this._service.deleteRoundType(typeIndex).subscribe(
          (response: any) => {
          this.loadRoundTypes();
          modalRef.componentInstance.success = response.body.success;
          modalRef.componentInstance.message = response.body.payload.message;
        },
       (error: HttpErrorResponse) => {
          modalRef.componentInstance.success = error.error.success;
          modalRef.componentInstance.message = error.error.payload.message;
        }
        );
    });
  }

  roundCriteria(typeIndex: number): FormArray {
    return this.roundTypes().at(typeIndex).get("criteria") as FormArray;
  }

  newCriterion(): FormGroup {
    return this.fb.group({
      criterion: "",
      createdBy: this._service.tokenDecoder().userName,
      modifiedBy: this._service.tokenDecoder().userName
    });
  }

  addRoundCriteria(typeIndex: number) {
    this.roundCriteria(typeIndex).push(this.newCriterion());
  }

  removeRoundCriteria(typeIndex: number, criteriaIndex: number) {
    this.roundCriteria(typeIndex).removeAt(criteriaIndex);
  }

  onSubmit() {  }
}
