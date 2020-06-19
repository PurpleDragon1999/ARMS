import { ModalComponent } from './../../../reusable-components/modal/modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { AppServicesService } from 'src/app/services/app-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-id-proof-type',
  templateUrl: './id-proof-type.component.html',
  styleUrls: ['./id-proof-type.component.scss']
})
export class IdProofTypeComponent implements OnInit {

  

  
  ngOnInit() {
  }

  idProofForm:FormGroup;
  addIdProofs:boolean=false;
  idProofList:any=[];

  constructor(private fb: FormBuilder,
    private _service:AppServicesService,
    private modalService:NgbModal) {
    this.idProofForm = this.fb.group({
      idProofs: this.fb.array([]) ,
    });
  }

  idProofs(): FormArray {
    return this.idProofForm.get("idProofs") as FormArray
  }

  newidProof(): FormGroup {
    return this.fb.group({
      idProofName: ''
    });
  }

  addIdProof() {
    this.addIdProofs = true;
    this.idProofs().push(this.newidProof());
  }
  
  loadIdProofTypes() {
    return this._service.getAllIdProofTypes().subscribe((response: any) => {
      this.idProofList = response.payload.data;
    });
  }

  removeidProof(idProofIndex: number) {
    const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

    modalRef.componentInstance.shouldConfirm = true;

    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    });
    this.idProofs().removeAt(idProofIndex);
    if (idProofIndex==0) {
      this.addIdProofs = false;
    }
   
    return this._service.deleteIdProofType(idProofIndex).subscribe((response: any) => {

      this.loadIdProofTypes();
      modalRef.componentInstance.success = response.body.result.success;
      modalRef.componentInstance.message = response.body.result.payload.message;
      }, (error: HttpErrorResponse) => {
        modalRef.componentInstance.success = error.error.success;
        modalRef.componentInstance.message = error.error.payload.message;
      }

    );
   
    
  }

  onSubmit() {
    console.log(this.idProofForm.value);
  }



}
