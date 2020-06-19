import { EnvVarService } from "./../utilities/env-var.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Logger, CryptoUtils } from "msal";
const GRAPH_ENDPOINT = "https://graph.microsoft.com/v1.0/me";

import { HttpClient } from "@angular/common/http";
import { LoginService } from "../services/login.service";

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
    console.log("inside login")
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
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2RTcyQjI1MTM1NUJGODFDOTA5QTVEQ0UzQTNENUIwNEI5OTMxMDEiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJKdWNySlJOVnY0SEpDYVhjNDZQVnNFdVpNUUUifQ.eyJuYmYiOjE1OTIzNzgzOTYsImV4cCI6MTU5MjQwNzE5NiwiaXNzIjoiaHR0cHM6Ly9ocm1zLWlkZW50aXR5LWRldi5henVyZXdlYnNpdGVzLm5ldCIsImF1ZCI6WyJhY2NvdW50IiwibG1zIl0sImNsaWVudF9pZCI6ImhybXNtb2JpbGUiLCJzdWIiOiJlMmM4MjdmOC1lMzk0LTQ1ZDctOTZiZi04OTVjMDRlZWZhY2YiLCJhdXRoX3RpbWUiOjE1OTIzNzgzOTYsImlkcCI6ImxvY2FsIiwibmFtZSI6Ik1heXVyaSIsImxhc3RfbmFtZSI6IkJoYWRhbmUiLCJlbWFpbCI6Im1heXVyaS5iaGFkYW5lQGN5Z3JwLmNvbSIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJhY2NvdW50IiwibG1zIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInBhc3N3b3JkIl19.HBphfFCaxl6X4LNY7o17Vz4jhHP0MG6r_AZ-zsJL2-54gi1jlal3CMHr6Al7Hpq3axY2aEgDecCzl0X-nJ1M48X_B3Va0ayfgzjSAAaKeOpyR8du0npPt91MvFBLdWSa4W6Jf-rSuCgyxJQqcpQnLEDp5xGnC9sGAwYkd18f5PuKLGnVlXejDoOf4604PrRgEhmWO3_xVbLCy9YJfz8zzCITiCs6uLutI2xx66EzPj8syaEzQO-c_rJAjAo9ftvXxkydqdS_K6RlwDxMuYhmHicUfoTkUKjFSdRAg3-DAypsqTlbKXe6pdAlIm9n5gt5XasRbx6YQKcHk2KeI07b1D1p-KGOYDpUjwik1ZIQNBXB5JSii3t_mcoVhYm9jyddZ-dT30vAIb0UrbRjlE-US0xiX1Axf0JTT3MyNkeSL5vxR9GQYaWJU-W36W64BJOshb8Cyaw_pHK1KdaNJIU2kM33WU1hD3P3vQXkYO6ySzbamAU9oU0RLT4BNjfBXN8r3LnM38zu0sUTr0g4W3ykzVYdz0ITjNZzHOXeqQ1UarNaglRiPFNZ_UrOWWSAgect6nS-632h4GulFQEkK1PjFHtbYQRDlvjJ_yH41OXpHC4ab6xpBxSNSKz8pyiAgN2sR071pav92K3ybc3-6-3nlOL6EBLBRBQOFO-ac-_F1TI"
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
        this.message = res.result.payload.message;
      },
      (err) => {
        this.message = err.error.message;
      }
    );
  }
}
