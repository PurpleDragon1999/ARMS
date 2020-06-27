import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FileUploader } from "ng2-file-upload";
import { AppServicesService } from "src/app/services/app-services.service";
import { Component, OnInit, Renderer2 } from "@angular/core";
import { MsalService } from "@azure/msal-angular";
import { EnvVarService } from "../utilities/env-var.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class AppNavBarComponent implements OnInit {
  classNameForToggle: string = "";
  flag: number = 0;
  name: string;
  role: string;

  adminBool: boolean = false;
  superuserBool: boolean = false;
  employeeBool: boolean = false;

  constructor(
    private renderer: Renderer2,
    private authService: MsalService,
    private _service: AppServicesService,
    private _env: EnvVarService,
    private router: Router
  ) {}

  ngOnInit() {
    let data = this._service.tokenDecoder();
    this.name = data.firstName + " " + data.lastName;
    this.role = data.role;
    if (this.role == this._env.SUPERUSER) {
      this.superuserBool = true;
      this.adminBool = true;
    } else if (this.role == this._env.ADMIN) {
      this.adminBool = true;
    } else if (this.role == this._env.EMPLOYEE) {
      this.employeeBool = true;
    }
  }

  toggle() {
    if (this.classNameForToggle == "active") this.classNameForToggle = "";
    else this.classNameForToggle = "active";
  }

  toggleBig() {
    if (this.flag == 0) {
      this.renderer.addClass(document.body, "sidebar-icon-only");
      this.flag = 1;
    } else {
      this.renderer.removeClass(document.body, "sidebar-icon-only");
      this.flag = 0;
    }
  }

  toggleActive() {}

  logout() {
    this.authService.logout();
    localStorage.removeItem("Authorized");
    this.router.navigate(["login"]);
  }
}