import { map } from "rxjs/operators";
import { IRoundPanel } from "./../models/panel.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { AppServicesService } from "src/app/services/app-services.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModalComponent } from "../reusable-components/modal/modal.component";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-schedule-interview",
  templateUrl: "./schedule-interview.component.html",
  styleUrls: ["./schedule-interview.component.scss"],
})
export class ScheduleInterviewComponent implements OnInit {
  interviewId: number;
  jobId: number;
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

  // Counters for tracking calendar blocking
  completed: number = 0;
  incompleted: number = 0;

  constructor(
    private _appService: AppServicesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.interviewId = parseInt(params.interviewId);
      this.jobId = parseInt(params.jobId);
    });
    this._appService.getRoundsFromInterviewId(this.interviewId).subscribe(
      (res: any) => {
        console.log(res);
        this.rounds = res.payload.data;
        for (let i = 0; i < this.rounds.length; i++) {
          this.main.push(this.active);
          this.dateTimeForRounds.push({
            roundDate: this.rounds[i].roundDate.slice(0, 10),
            roundTime: this.rounds[i].roundTime.slice(0, 5),
          });
          this.searchData.push(this.temp);
          this.tableData.push({
            roundId: this.rounds[i].id,
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

    //If data for panels exists, then simply assign data to tabledata in sync
  }

  //Function to handle toggle between Panels
  changeActive(index: number, panel: number) {
    this.main[index] = ["", "", ""];
    this.main[index][panel] = "active";
    this.searchData[index] = [];
    this.list[index] = false;
  }

  //Function to search employees
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

  //Function to add selected employee in table
  select(data: any, roundId: number, index: number) {
    data["status"] = "fas fa-clock text-warning";
    if (this.main[index][0] === "active") {
      // this.tableData[index].roundId = roundId;
      if (
        this.tableData[index].panel1.employees.length < 2 &&
        !this.employeeIds.includes(data.id)
      ) {
        this.tableData[index].panel1.employees.push(data);
        this.employeeIds.push(data.id);
      }
    } else if (this.main[index][1] === "active") {
      // this.tableData[index].roundId = roundId;
      if (
        this.tableData[index].panel2.employees.length < 2 &&
        !this.employeeIds.includes(data.id)
      ) {
        this.tableData[index].panel2.employees.push(data);
        this.employeeIds.push(data.id);
      }
    } else if (this.main[index][2] === "active") {
      // this.tableData[index].roundId = roundId;
      if (
        this.tableData[index].panel3.employees.length < 2 &&
        !this.employeeIds.includes(data.id)
      ) {
        this.tableData[index].panel3.employees.push(data);
        this.employeeIds.push(data.id);
      }
    }
  }

  //Both these functions checks the availability of employees for meeting
  checkAvailability(index: number, panel: string) {
    let emailList = [];

    var roundDate = this.dateTimeForRounds[index].roundDate;
    var roundTime = this.dateTimeForRounds[index].roundTime;
    let panelEmployees = this.tableData[index][panel].employees;

    for (let i = 0; i < panelEmployees.length; i++) {
      emailList.push(panelEmployees[i].email);
    }

    if (emailList.length != 0) {
      this.checkAvailabilityHelper(
        index,
        panel,
        roundDate,
        roundTime,
        emailList
      );
    }
  }

  checkAvailabilityHelper(
    index: number,
    panel: string,
    roundDate,
    roundTime,
    emailList
  ) {
    var roundStartDateTime = roundDate + "T" + roundTime;
    var roundEndDateTime = new Date(roundStartDateTime);
    roundEndDateTime.setHours(roundEndDateTime.getHours() + 2);

    this._appService
      .checkAvailability(roundStartDateTime, roundEndDateTime, emailList)
      .subscribe((res) => {
        console.log(res);
        for (let i = 0; i < res.value.length; i++) {
          let items = res.value[i].scheduleItems;
          let id = res.value[i].scheduleId;
          if (items.length != 0) {
            items.map((item) => {
              if (item.status != "free") {
                this.tableData[index][panel].employees.map((e) => {
                  if (e.email == id) {
                    e.status = "fas fa-times-circle text-red";
                  }
                });
              } else {
                this.tableData[index][panel].employees.map((e) => {
                  if (e.email == id) {
                    e.status = "fas fa-check-circle text-green";
                  }
                });
              }
            });
          } else {
            this.tableData[index][panel].employees.map((e) => {
              if (e.email == id) {
                e.status = "fas fa-check-circle text-green";
              }
            });
          }
        }
      });
  }

  blockCalenderHelper(
    index,
    panel,
    roundDate,
    roundTime,
    emailList,
    userNames
  ) {
    var roundStartDateTime = roundDate + "T" + roundTime;
    var roundEndDateTime = new Date(roundStartDateTime);
    roundEndDateTime.setHours(roundEndDateTime.getHours() + 2);
    this._appService
      .blockCalender(
        index,
        panel,
        roundStartDateTime,
        roundEndDateTime,
        emailList,
        userNames
      )
      .subscribe(
        (res) => {
          console.log("Sent to - " + userNames);
          this.completed += 1;
        },
        (err: any) => {
          console.log("Not sent to - " + userNames);
          this.incompleted += 1;
        }
      );
  }

  modal(success: boolean, message: string, redirect: boolean) {
    const modalRef = this._modalService.open(ModalComponent);
    modalRef.componentInstance.shouldConfirm = false;
    modalRef.componentInstance.success = success;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
      if (redirect) {
        this._router.navigate([]);
      }
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
        userNames.push(
          panelEmployees[j].firstName + " " + panelEmployees[j].lastName
        );
      }

      if (emailList.length != 0)
        this.blockCalenderHelper(
          index + 1,
          i + 1,
          roundDate,
          roundTime,
          emailList,
          userNames
        );
    }
  }

  saveData() {
    this.updateRoundtime();
  }

  sendAlerts() {
    for (let i = 0; i < this.tableData.length; i++) {
      this.schedulePanelHelper(i);
    }
    if (this.incompleted === 0) {
      this.modal(true, "Alerts successfully sent !", true);
    } else {
      this.modal(
        false,
        `${this.completed} alerts sent successfully. ${this.incompleted} alerts pending`,
        false
      );
    }
  }

  createPanels() {
    let mainObject = {
      rounds: [],
    };
    for (let i = 0; i < this.tableData.length; i++) {
      let obj = {
        roundId: this.tableData[i].roundId,
        panel: [],
      };
      let tmp = ["panel1", "panel2", "panel3"];
      for (let j = 0; j < tmp.length; j++) {
        let empIds = this.getEmployeesId(i, tmp[j]);
        if (empIds.length != 0) {
          obj.panel.push({
            employeesId: empIds,
          });
        }
      }
      if (obj.panel.length != 0) {
        mainObject.rounds.push(obj);
      }
    }
    // Call the service here
    this._appService.createPanel(mainObject, this.jobId).subscribe(
      (res: any) => {
        this.modal(true, "Records saved in database", false);
      },
      (err: any) => {
        this.modal(false, "Error while saving Panels", false);
      }
    );
  }

  updateRoundtime() {
    let mainObject = [];
    for (let i = 0; i < this.tableData.length; i++) {
      mainObject.push({
        roundId: this.tableData[i].roundId,
        roundDate: this.dateTimeForRounds[i].roundDate,
        roundTime: this.dateTimeForRounds[i].roundTime,
      });
    }
    this._appService.updateRoundTime(mainObject).subscribe(
      (res: any) => {
        this.createPanels();
      },
      (err) => {
        this.modal(false, "Error occured while updating time", false);
      }
    );
  }

  getEmployeesId(index: number, panel: string) {
    let temp = [];
    if (this.tableData[index][panel].employees.length != 0) {
      this.tableData[index][panel].employees.map((e) => temp.push(e.id));
    }
    return temp;
  }

  //Function to remove employee from the tabel
  removeFromTable(index: number, panel: string, empId: number) {
    this.tableData[index][panel].employees = this.tableData[index][
      panel
    ].employees.filter(function (value, index, arr) {
      return value.id != empId;
    });
    this.employeeIds = this.employeeIds.filter((value, index, arr) => {
      return value != empId;
    });
  }
}
