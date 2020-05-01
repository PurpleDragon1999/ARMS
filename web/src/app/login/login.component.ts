import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login.service'
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  isIframe = false;
  loggedIn = false;
  profile:any;
  message:string;
  employeeData={};

  constructor(  
    private broadcastService: BroadcastService, 
    private authService: MsalService,
    private http: HttpClient,
    private loginService: LoginService) { }

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
      new Logger((logLevel, message, piiEnabled) => { }, {
        correlationId: CryptoUtils.createNewGuid(),
        piiLoggingEnabled: false,
      })
    );
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT).toPromise()
      .then(profile => {
          this.profile = profile;
          console.log(profile);
      });
  }
  
  loginFunction() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
    const idToken = window.localStorage.getItem("msal.idtoken");

    this.loginService.checkPermissions(idToken).subscribe(
      res => {
        if (res != null) {
          window.localStorage.setItem(
            "x-auth-token",
            `${res.payload.data["x-auth-token"]}`
          );
        }
        this.message = res.payload.message


      }, err => {
        this.message = err.payload.message
      }
    )

  }
}
