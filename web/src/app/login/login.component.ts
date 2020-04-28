import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isIframe = false;
  loggedIn = false;
  profile;

  constructor(
    private broadcastService: BroadcastService, 
    private authService: MsalService,
    private http: HttpClient) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();

    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkAccount();
    });

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }
      
      console.log('Redirect Success: ', response.accessToken);
    });
    this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
      console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));


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
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    console.log(isIE);
    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
    this.getProfile();
  
  }
   

}