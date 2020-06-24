import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.scss"],
})
export class ErrorPageComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {}
  errorCode: string;
  errorMessage: string;

  ngOnInit() {
    this._activatedRoute.params.subscribe((param) => {
      this.errorCode = param.errorCode;
    });
    if (this.errorCode === "404") {
      this.errorMessage = "The page you’re looking for was not found.";
    } else if (this.errorCode === "401") {
      this.errorMessage = "You are not authorized to enter this application.";
    }
  }
}
