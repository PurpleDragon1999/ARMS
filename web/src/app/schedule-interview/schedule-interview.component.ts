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
  ) {}

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
  }

  blockCalendar(index: number) {
    console.log("Date: " + this.dateTimeForRounds[index].roundDate);
    console.log("Time: " + this.dateTimeForRounds[index].roundTime);
  }

  schedule() {}
}
