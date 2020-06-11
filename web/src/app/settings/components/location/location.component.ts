import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

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
