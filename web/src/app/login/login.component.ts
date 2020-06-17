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
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTI0MDI0MjQsImV4cCI6MTU5MjQzMTIyNCwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJhMzhkZjNmYi0wOTZlLTQ1OGMtODljMS0xMmNkNjM4Y2Q5NjYiLCJhdXRoX3RpbWUiOjE1OTI0MDI0MjQsImlkcCI6ImxvY2FsIiwibmFtZSI6IlNvbmFsaSIsImxhc3RfbmFtZSI6IkNoYXdsYSIsImVtYWlsIjoic29uYWxpLmNoYXdsYUBjeWdycC5jb20iLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIiwiYWNjb3VudCIsImxtcyIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.AAqmv_d7uiaRFQ6arOIrth1oXTO8k0sqEll2XlQCTwynSxjx8PFoTZh2iokV2cA-JZG9cBcwvTu3X9BLX1hlxdl_UtMCfLVYYC09zngPl4hhQcUke6q-cJ8BjmJKOu5ifalUXzaAYg2oMunIgsZUbfARpQyTxkyq_5TjFzYpvAUmzbtlKSVv33KcZqPUDFMaYGm5WqY7zR9CfwEtoUVb7do5Mj_wCtmU2PCGbAiGXFzNyDeY4ccftvT_gkZnyf6NMSeQglAV-V8zu_hphNNXGoHM1mdtmclldGXZl_W6E8gf_j_S9lhOJZJvlZADBbYxRiS6GADnEj1nVqH5oawKinH1wuProABhv1q9IOhSaQVj63sOwIpkd_cK4sRe2x2Ekn3rUneibiXkWb-JO6Tc1t5yVjt9wPh1yjkFuUn0xUNH9-W1OZkjWzkJ9FA3bZyUhIpmb33E8uLrUKRHUncxcTdI4rgj0Moi2G1leky0r87W0UHqGoOx9I0E20cUldiuLjHlF5f3_gcBslfJZ7hYth64DgLbkZHfsjNvhX8xEWgR7eEhprd-wX8FiMYMqF4Z5PfSIwpEfaf863w7FWn3z08rVbyH6KOvKySCF-VEA2-wGsF6k0W-uM2pYA151M3S3A5IxBytAD9brjnghzLiReSdeOM_Jj4JJVK91GDUGxQ'
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
