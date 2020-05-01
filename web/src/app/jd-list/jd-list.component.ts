import { Component, OnInit } from "@angular/core";
import { AppServicesService } from "src/app/services/app-services.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-jd-list",
  templateUrl: "./jd-list.component.html",
  styleUrls: ["./jd-list.component.scss"],
})
export class JdListComponent implements OnInit {
  jobsList: string[];

  constructor(private _service: AppServicesService, private router: Router) {}

  ngOnInit() {
    this.loadJds();
  }

  loadJds() {
    return this._service.getAllJobs().subscribe((response: any) => {
      return (this.jobsList = response.payload.data);
    });
  }

  deleteJd(jobObjId: string) {
    this._service.deleteJd(jobObjId).subscribe((res) => {
      this.loadJds();
    });
  }

  downloadPdf(jdId) {
    this.router.navigate(["/jd-pdf", jdId]);
  }

  datecheck(closingDate){
    let currentDate = new Date().toISOString();
    if(closingDate <= currentDate)
      return 1;
    else return 0;
  }
}
