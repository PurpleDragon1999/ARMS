import { IRoundPanel } from "./../models/panel.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { AppServicesService } from "src/app/services/app-services.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-schedule-interview",
  templateUrl: "./schedule-interview.component.html",
  styleUrls: ["./schedule-interview.component.scss"],
})
export class ScheduleInterviewComponent implements OnInit {
  interviewId: number;
  rounds: any[];
  employeeIds: number[] = [];

  //To handle navigation for panel
  active: string[] = ["active", "", ""];
  main = [];

  //To handle search results
  temp: any = [];
  searchData: any = [];
  list: boolean[] = [false, false, false];

  //To handle selected data
  tableData: IRoundPanel[] = [];

  error: any = { isError: false, errorMessage: "" };
  index: any;
  dateTimeForRounds: any[] = [];

  constructor(
    private _appService: AppServicesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.interviewId = parseInt(params.interviewId);
    });
    this._appService.getRoundsFromInterviewId(this.interviewId).subscribe(
      (res: any) => {
        this.rounds = res.payload.data;
        for (let i = 0; i < this.rounds.length; i++) {
          this.main.push(this.active);
          this.dateTimeForRounds.push({
            roundDate: this.rounds[i].roundDate.slice(0, 10),
            roundTime: this.rounds[i].roundTime.slice(0, 5),
          });
          this.searchData.push(this.temp);
          this.tableData.push({
            roundId: 0,
            panel1: {
              employees: [],
            },
            panel2: {
              employees: [],
            },
            panel3: {
              employees: [],
            },
          });
        }
      },
      (err) => {
        if (err.status == 401) {
          this._router.navigate(["/error/401"]);
        }
      }
    );
  }

  changeActive(index: number, panel: number) {
    this.main[index] = ["", "", ""];
    this.main[index][panel] = "active";
    this.searchData[index] = [];
    this.list[index] = false;
  }

  search(input: string, i: number) {
    if (input != "") {
      this._appService.searchEmployee(input).subscribe((res: any) => {
        this.searchData[i] = res.payload.data;
      });
    } else if (input === "") {
      this.searchData[i] = [];
      this.list[i] = false;
    }
    this.searchData[i].length == 0
      ? (this.list[i] = false)
      : (this.list[i] = true);
  }

  select(data: any, roundId: number, index: number) {
    data["status"] = "fas fa-clock text-warning";
    if (this.main[index][0] === "active") {
      this.tableData[index].roundId = roundId;
      if (
        this.tableData[index].panel1.employees.length < 2 &&
        !this.employeeIds.includes(data.id)
      ) {
        this.tableData[index].panel1.employees.push(data);
        this.employeeIds.push(data.id);
      }
    } else if (this.main[index][1] === "active") {
      this.tableData[index].roundId = roundId;
      if (
        this.tableData[index].panel2.employees.length < 2 &&
        !this.employeeIds.includes(data.id)
      ) {
        this.tableData[index].panel2.employees.push(data);
        this.employeeIds.push(data.id);
      }
    } else if (this.main[index][2] === "active") {
      this.tableData[index].roundId = roundId;
      if (
        this.tableData[index].panel3.employees.length < 2 &&
        !this.employeeIds.includes(data.id)
      ) {
        this.tableData[index].panel3.employees.push(data);
        this.employeeIds.push(data.id);
      }
    }
    console.log(this.tableData);

  }


  checkAvailability(index: number, panel: number) {
    let panelEmployees = [];
    let emailList = [];

    var roundDate = this.dateTimeForRounds[index].roundDate;
    var roundTime = this.dateTimeForRounds[index].roundTime;
    if (panel === 0) {
      panelEmployees = this.tableData[index].panel1.employees;
    } else if (panel === 1) {
      panelEmployees = this.tableData[index].panel2.employees;
    } else if (panel === 2) {
      panelEmployees = this.tableData[index].panel3.employees;
    }

    for (let i = 0; i < panelEmployees.length; i++) {
      emailList.push(panelEmployees[i].email);
    }

    if (emailList.length != 0)
      this.checkAvailabilityHelper(roundDate, roundTime, emailList);




  }
  checkAvailabilityHelper(roundDate, roundTime, emailList) {
    let data = [];

    var roundStartDateTime = roundDate + "T" + roundTime;
    var roundEndDateTime = new Date(roundStartDateTime);
    roundEndDateTime.setHours(roundEndDateTime.getHours() + 2);
    this._appService.checkAvailability(roundStartDateTime, roundEndDateTime, emailList).
      subscribe((res) => {

        for (let i = 0; i < res.value.length; i++) {
          data = res.value[i].scheduleItems;
          var availFlag = true;
          for (let j = 0; j < data.length; j++) {

            if (data[j].status === "busy") {
              availFlag = false;
              return false;
            }
          }

        }

      });

  }
  blockCalenderHelper(index, panel, roundDate, roundTime, emailList, userNames) {
    var roundStartDateTime = roundDate + "T" + roundTime;
    var roundEndDateTime = new Date(roundStartDateTime);
    roundEndDateTime.setHours(roundEndDateTime.getHours() + 2);
    this._appService.blockCalender(index, panel, roundStartDateTime, roundEndDateTime, emailList, userNames).
      subscribe((res) => {
        console.log(res);
      });
  }

  schedulePanelHelper(index: number) {
    let panelEmployees = [];


    var roundDate = this.dateTimeForRounds[index].roundDate;
    var roundTime = this.dateTimeForRounds[index].roundTime;
    for (let i = 0; i < 3; i++) {
      let emailList = [];
      let userNames = [];
      if (i === 0) {
        panelEmployees = this.tableData[index].panel1.employees;

      } else if (i === 1) {
        panelEmployees = this.tableData[index].panel2.employees;

      } else if (i === 2) {
        panelEmployees = this.tableData[index].panel3.employees;
      }
      for (let j = 0; j < panelEmployees.length; j++) {
        emailList.push(panelEmployees[j].email);
        userNames.push(panelEmployees[j].firstName + " " + panelEmployees[j].lastName);
      }

      if (emailList.length != 0)
        this.blockCalenderHelper(index, i, roundDate, roundTime, emailList, userNames);
    }
  }
  schedule() {
    for (let i = 0; i < this.tableData.length; i++) {
      this.schedulePanelHelper(i);
    }
  }
}
