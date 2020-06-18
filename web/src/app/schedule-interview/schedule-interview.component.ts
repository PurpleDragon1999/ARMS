import { AppServicesService } from "src/app/services/app-services.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
interface round {
  roundID: number;
  panel: panel[];
}

interface panel {
  panelName: string;
  panel: number[];
}

@Component({
  selector: "app-schedule-interview",
  templateUrl: "./schedule-interview.component.html",
  styleUrls: ["./schedule-interview.component.scss"],
})
export class ScheduleInterviewComponent implements OnInit {
  rounds = [
    {
      roundId: 1,
      name: "Aptitude",
    },
    {
      roundId: 2,
      name: "Technincal",
    },
    {
      roundId: 3,
      name: "Managerial",
    },
  ];

  //To handle navigation for panel
  active: string[] = ["active", "", ""];
  main = [];

  //To handle search results
  searchData: any = [];
  list: boolean = false;

  //To handle selected data

  tableData: any = [];
  roundsData: round[];
  roundData = [
    {
      roundId: 1,
      panel1: {
        panelName: "",
        employeesId: [],
      },
      panel2: {
        panelName: "",
        employeesId: [],
      },
      panel3: {
        panelName: "",
        employeesId: [],
      },
    },
  ];

  error: any = { isError: false, errorMessage: "" };

  constructor(private _appService: AppServicesService) {}

  ngOnInit() {
    for (let i = 0; i < this.rounds.length; i++) {
      this.main.push(this.active);
    }
    console.log(this.main);
  }

  changeActive(index: number, panel: number) {
    this.main[index] = ["", "", ""];
    this.main[index][panel] = "active";
  }

  search(input: string) {
    if (input != "") {
    
    } else if (input === "") {
      this.searchData = [];
      this.list = false;
    }
    this.searchData.length == 0 ? (this.list = false) : (this.list = true);
    console.log(this.searchData, this.list);
  }

  select(data: any, roundId: number, index: number) {
    if (index == 0) {
      if (this.main[index][0] === "active") {
        this.roundData[0].roundId = roundId;
        this.roundData[0].panel1.panelName = "Java";
        if (this.roundData[0].panel1.employeesId.length < 2) {
          this.roundData[0].panel1.employeesId.push(data.id);
        }
      } else if (this.main[index][1] === "active") {
        this.roundData[1].roundId = roundId;
        this.roundData[1].panel2.panelName = "Java";
        if (this.roundData[1].panel2.employeesId.length < 2) {
          this.roundData[1].panel2.employeesId.push(data.id);
        }
      } else if (this.main[index][2] === "active") {
        this.roundData[2].roundId = roundId;
        this.roundData[2].panel3.panelName = "Java";
        if (this.roundData[2].panel3.employeesId.length < 2) {
          this.roundData[2].panel3.employeesId.push(data.id);
        }
      }
    }
  }
}
