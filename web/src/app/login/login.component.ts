import { EnvVarService } from './../utilities/env-var.service';
import { Router } from '@angular/router';
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
  profile: any;
  message: string;
  employeeData = {};

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private http: HttpClient,
    private loginService: LoginService,
    private _router: Router,
    private _env: EnvVarService) { }

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
        });
  }

  async loginFunction() {
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
      res => {
        if (res != null) {
          // window.localStorage.setItem(
          //   "x-auth-token",
          //   `${res.result.payload.data[""]}`
          // );
        
          window.localStorage.setItem(
            "Authorized",
            `${res.result.payload.authorized}`
          );
          window.localStorage.setItem(
            "Authorization",
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTE4OTcxNTAsImV4cCI6MTU5MTkyNTk1MCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTE4OTcxNTAsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.SuJuZMCiwDB15eSwzc93q9wky4EnF1j0yowRtwESlVosGO4lxlYkaP0NPw0BzMNyPlB2pQlv459iemNoA3UEbLeo3Kuq7XvKlCYIfg2lNnoIcE_jAkqkO96KPV33YXWS582VrZyipdrD-_0c0sOg8zy9tm6AfV5w4xTXMjtFV_df7YxdMtpsDzoeHMIUPAk5kGlHO1pa-4SplntRE88Vf-qtYQfqWgMwC2X7MWXzaAcOlqQElW0fSAgTn-jrBlPvaWVZ_X6XZvNZSjJ1z0a5bdZIha9627oO7YjyhSOI-M4dD5RyZM8uJhwINM4AYAg-ip8nTy0ww_g0znEaIbZrN1q6qDoVkomh7OyMLt2Mx7M4LW7Z5AvAiVQJksNrPjE5hIMlr5cLQVVnimr95avBy01SPfQCr4CtvQWPtrRHNMYPPCQPwBjBRKx2EbfotDVMMrhr2pzIrzEmhj6QC6wOV5V2NVio9YA2kcHbODewnqW7iBW_sC34bKK4VtGhAgEVjxrz1ejRs8LqUNieNRgMaxxbmOQLu9h7uzRN5-ngmy0JkUg37yd2JdihAq4yiAGzqPCu421UvUA_SB00GY5OnCiCjFesWSNNysn99DGqATuCH1F7g6tl3Zn9HEbkYED27itNdusNSWy0kuJBubMjH56Dxdv63MPna4RkmQRp9yQ'
          );
          let role = this.loginService.tokenDecoder().role;
      
          if (role == this._env.ADMIN) {
             this._router.navigate(['/admin']);
          }
          else if (role == this._env.SUPERUSER) {
            this._router.navigate(['/superuser']);
          }
          else if (role == this._env.EMPLOYEE) {
            this._router.navigate(['/employee']);
          }
        }
        this.message = res.result.payload.message


      }, err => {
        this.message = err.error.message
      }
    )

  }
  
}
