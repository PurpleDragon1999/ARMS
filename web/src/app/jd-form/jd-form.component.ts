import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-jd-form',
  templateUrl: './jd-form.component.html',
  styleUrls: ['./jd-form.component.scss']
})
export class JdFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  jdForm: FormGroup;
    submitted = false;

  ngOnInit() {
  
      this.jdForm = this.formBuilder.group({
        jdName: ['', Validators.required],
        appliedFor: ['', Validators.required],
        openingDate: ['', Validators.required],
        closingDate: ['', Validators.required],
        jobProfileDescription: ['', Validators.required],
        skills: ['', Validators.required],
        jobType: ['', Validators.required],
        eligibilityCriteria: ['', Validators.required],
        location: ['', Validators.required],
        salary: ['', Validators.required],
        vacancies: ['', Validators.required],
        applicants: ['', Validators.required]
        
    });
  }
  get formControls() { return this.jdForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.jdForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.jdForm.value))
}

}
