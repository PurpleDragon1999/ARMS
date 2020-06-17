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
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTIzMzI3OTYsImV4cCI6MTU5MjM2MTU5NiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTIzMzI3OTYsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.jyYdEZukAYeNZ-yVjg9TiItzoHnU_95QIp8_TGQhW8XceylQ8EfGGbvVJzs70dJX7R7eYI5FVD6c0O1wwvpIC2zRUOWpc6g4q06wL2W7iB6MN-v3u8o3qpDOorUDdFz-3Kuw5P9jA6UFYWLApRIQpt0eLsuVY4rIf5xi-mDvm8lO9Tb8tZ34lkuYv9NIx9R2UzyWrVlSjz8gzTCSR7gmoTPjE4mAEeka6TuOIC4mZu8krwENT1v3nIdCM_tS2lArk9ixPBX1J-LJ-V7TsiHwXDBW7bdLPgGvB6zMEd4uQvIfZAmAUduQ_QV_ZFf6f7GY1tT0fFqtacKtD_zv2zcWavjIuhVYbtI0oN4PGKyjvIZUmyTIuO9mxKMS3x0DnI1KVPhXrld5XrI1x2QNSa6pO1766ubnrhpAKjlKr1Rl3luS33ubearghsFNPioPrRaj8MEpDUonxAH2r_lLUIxKXEXP7G1x0QGB1HFpA4PpteZHRYZSFLzsOuMtPWduseWZONlNMGapmsK3p35iwDcMqZFVY5uYCLiEKg-qNuB9Ywz_6j43ZqMoblHSQ8IuHvd4mLyutVfGClbq6dVD-RKA2lR6S8-UF6Q8C5puIGBvhahwLOTV-A98HBw3OfDhqYYXbpso3N5M0wWQDQqAbCOpw88a6IZxHXo7-s2U_Yw71-4'
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
