import { AppServicesService } from "src/app/services/app-services.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { ModalComponent } from "src/app/reusable-components/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent implements OnInit {
  ngOnInit() {}

  locationForm: FormGroup;
  addLocations: Boolean = false;
  locationList: any;

  constructor(
    private fb: FormBuilder,
    private _service: AppServicesService,
    private modalService: NgbModal
  ) {
    this.locationForm = this.fb.group({
      locations: this.fb.array([]),
    });
  }

  loadLocations() {
    return this._service.getAllLocations().subscribe((response: any) => {
      this.locationList = response.payload.data;
    });
  }
  locations(): FormArray {
    return this.locationForm.get("locations") as FormArray;
  }

  newLocation(): FormGroup {
    return this.fb.group({
      locName: "",
    });
  }

  addLocation() {
    this.addLocations = true;
    this.locations().push(this.newLocation());
  }

  removeLocation(locIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    this.locations().removeAt(locIndex);
    if (locIndex == 0) {
      this.addLocations = false;
    }
    return this._service.deleteLocation(locIndex).subscribe(
      (response: any) => {
        this.loadLocations();
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
    console.log(this.locationForm.value);
  }
}
