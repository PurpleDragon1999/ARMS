import { AppServicesService } from 'src/app/services/app-services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.scss']
})
export class ScheduleInterviewComponent implements OnInit {

  @ViewChild("interviewDate", {static: false}) interviewDate: ElementRef;
  @ViewChild("interviewTime", {static: false}) interviewTime: ElementRef;

  active1: string = "active";
  active2: string = "";
  active3: string = "";

  currentDate: String;
  date: Date = new Date();
  scheduleForm: FormGroup;
  submitted: boolean = false;

  searchData: any = [];
  list: boolean = false;

  panel1: any = [];
  panel2: any = [];
  panel3: any = [];

  tableData: any = this.panel1;

  error: any = { isError: false, errorMessage: "" };

  constructor(
    private formBuilder: FormBuilder,
    private _appService: AppServicesService) { }

  ngOnInit() {
    this.currentDate = this.date.toISOString().substr(0, 10);

    this.scheduleForm = this.formBuilder.group({
      interviewDate: ["", Validators.required],
      interviewTime: ["", Validators.required]
    });
  }

  get formControls() {
    return this.scheduleForm.controls;
  }

  schedule(){
    this.submitted = true;
    if (this.scheduleForm.invalid) {
      return;
    }
    else if((this.scheduleForm.controls["interviewDate"].value) < this.currentDate){
      console.log("condition true");
      this.error = {
        isError: true,
        errorMessage: "Invalid Date"
      };
      return;  
    }
  }

  changeActive(panelNo: number){
    this.tableData = [];
    if(panelNo == 1){
      this.active1 = "active";
      this.active2 = this.active3 = "";
      this.tableData = this.panel1;
    }
    else if(panelNo == 2){
      this.active2 = "active";
      this.active1 = this.active3 = "";
      this.tableData = this.panel2;
    }
    else{
      this.active3 = "active";
      this.active1 = this.active2 = "";
      this.tableData = this.panel3;
    }
  }

  search(input: string){
    if(input != ""){
      this._appService.searchCandidates(input, "false").subscribe(res => {
        this.searchData = res.payload.data;
      });
    }
    else if(input === ""){
      this.searchData = [];
      this.list = false;
    }
    (this.searchData.length == 0) ? this.list = false : this.list = true;
    console.log(this.searchData, this.list);
  }

  select(data: any){
    if(this.active1 == "active"){
      if(this.panel1.length < 2)
        this.panel1.push(data);
    }
    else if(this.active2 == "active"){
      if(this.panel2.length < 2){
        this.panel2.push(data);
      }
    }
    else if(this.active3 == "active"){
      if(this.panel3.length < 2){
        this.panel3.push(data);
      }
    }
  }
}
