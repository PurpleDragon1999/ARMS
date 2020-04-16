import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor() { }

  //Regarding tokens

  getToken(): string {
    return localStorage.getItem('');
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(localStorage.getItem(''));
  }

  // For making HTTP calls

}
