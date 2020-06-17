import { EnvVarService } from "./../utilities/env-var.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Logger, CryptoUtils } from "msal";

const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me";

import { HttpClient } from "@angular/common/http";
import { LoginService } from "../services/login.service";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isIframe = false;
  loggedIn = false;
  profile: any;
  message: string;
  employeeData = {};

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private http: HttpClient,
    private loginService: LoginService,
    private _router: Router,
    private _env: EnvVarService
  ) {}

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.broadcastService.subscribe("msal:loginSuccess", () => {
      this.checkAccount();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error("Redirect Error: ", authError.errorMessage);
        return;
      }
    });
    this.authService.setLogger(
      new Logger((logLevel, message, piiEnabled) => {}, {
        correlationId: CryptoUtils.createNewGuid(),
        piiLoggingEnabled: false,
      })
    );
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  getProfile() {
    this.http
      .get(GRAPH_ENDPOINT)
      .toPromise()
      .then((profile) => {
        this.profile = profile;
      });
  }

  async loginFunction() {
    // this.loginService.login().subscribe((res) => console.log(res));
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;
    if (isIE) {
      let object = await this.authService.loginRedirect();
    } else {
      let object = await this.authService.loginPopup();
    }

    const idToken = window.localStorage.getItem("msal.idtoken");

    this.loginService.checkPermissions(idToken).subscribe(
      (res) => {
        if (res != null) {
          window.localStorage.setItem(
            "x-auth-token",
            `${res.payload.data["x-auth-token"]}`
          );
          window.localStorage.setItem(
            "Authorization",
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE4NTY1MTcsImV4cCI6MTU5MTg4NTMxNywiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTE4NTY1MTcsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.EUKKXiBo2aSt4xtjvW3X0tGT4kmB1QNfq4IWCSei0XtM-s5BCQ-iizSn3ZH7HbDH1GsV-nGdwarYWbFhOQrixO3axiu5B7cGffFEJcJFMK4bf9AQX5wcODZbUOwZCMpeSZs1uGLtTo67aFvLNRRBKxtpDl6vA90sxRTDHVVf11xqry89x4CVU8ZdHh_1tMJJBaoow9pcB_i_SDkXhfH5MqJ38vV6VeK0C6USV46Ojxm6AEf6akQZWyaEB6fe1jGD7H8qbtOS32zSUQzI7jhADGSPxzx3lnNfD7LVzA0qAvsRaB2BvSOyLCE_dedp2BMJi50tL4xDtoX-3Th2rtj_C66NVEcWjhDNyUK27qLuvVnvMjwu1XYjby5dctbSMuInH0X8Qzvjj_yH560RP9E9DMVoPGVWVESiQbFM9jXZqFSObwT4JRD8wSX8ZBk-SLEWjwocCXySUpDelTtGvwH5V_hiGb36y1h4CJAkAhfwlhXrw_Vsi_WAzSVpJsnKLSGtP-PGT2c8-g9XNdefH7M_AnT0wzAkQMBzU-yrpUTKnGONJ4YsdDJD9EnI32MWSPSJamjf5HAdqsp2KAEnhZq5KHB67KxcD2Luo6TM2V9aZvvLCxR5JzwBqEvrn4_wmwC8HleiDpcYM2DkVY3wHjKRaYSr8wiWphNlpxa_uDYxiV4'
          );
          let role = this.loginService.tokenDecoder().role;
          if (role == this._env.ADMIN) {
            this._router.navigate(["/admin"]);
          } else if (role == this._env.SUPERUSER) {
            this._router.navigate(["/superuser"]);
          } else if (role == this._env.EMPLOYEE) {
            this._router.navigate(["/employee"]);
          }
        }
        this.message = res.payload.message;
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }
}
