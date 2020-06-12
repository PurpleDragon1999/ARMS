import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-id-proof-type',
  templateUrl: './id-proof-type.component.html',
  styleUrls: ['./id-proof-type.component.scss']
})
export class IdProofTypeComponent implements OnInit {

  constructor() { }

  
  ngOnInit() {
  }

  locationForm:FormGroup;
  addLocations:Boolean=false;

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      locations: this.fb.array([]) ,
    });
  }

  locations(): FormArray {
    return this.locationForm.get("locations") as FormArray
  }

  newLocation(): FormGroup {
    return this.fb.group({
      locName: ''
    });
  }

  addLocation() {
    this.addLocations = true;
    this.locations().push(this.newLocation());
  }

  removeLocation(locIndex: number) {
    this.locations().removeAt(locIndex);
    if (locIndex==0) {
      this.addLocations = false;
    }
  }

  onSubmit() {
    console.log(this.locationForm.value);
  }



}
