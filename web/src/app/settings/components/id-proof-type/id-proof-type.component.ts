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
  addIdProofs:Boolean=false;

  constructor(private fb: FormBuilder) {
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

  removeidProof(idProofIndex: number) {
    this.idProofs().removeAt(idProofIndex);
    if (idProofIndex==0) {
      this.addIdProofs = false;
    }
  }

  onSubmit() {
    console.log(this.idProofForm.value);
  }



}
