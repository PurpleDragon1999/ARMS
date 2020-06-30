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
  ngOnInit() { }

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
      locationName: "",
      createdBy: this._service.tokenDecoder().userName,
      modifiedBy: this._service.tokenDecoder().userName
    });
  }

  addLocation() {
    this.addLocations = true;
    this.locations().push(this.newLocation());
  }

  deleteNewEntry(locIndex){
    this.locations().removeAt(locIndex);
    if ((this.locationForm.get('locations').value.length)==0) {
      this.addLocations = false;
    }
  }

  removeLocation(locIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = true;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    
    modalRef.componentInstance.emitPerformRequest.subscribe(() => {
      this.deleteNewEntry(locIndex);
      
      return this._service.deleteLocation(locIndex).subscribe(
      (response: any) => {
        this.loadLocations();
        modalRef.componentInstance.success = response.body.success;
        modalRef.componentInstance.message =
          response.body.payload.message;
      },
      (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      }
      );
    });
  }


  onSubmit() {
    this._service.createLocation(this.locationForm.get('locations').value).subscribe((res:any) => {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = false;
      modalRef.componentInstance.success = res.success;
      modalRef.componentInstance.message = res.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
        
        this.locationForm.reset();
        this.addLocations = false;
        this.loadLocations();
      });
    })
  }
}
