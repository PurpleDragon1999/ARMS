import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

const DOTNET_LOGIN_API = "http://localhost:40802/api/login";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  getToken(): string {
    //return localStorage.getItem('x-auth-token');
    return localStorage.getItem("Authorized");
  }

  tokenDecoder(): any {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken());
  }

  checkPermissions(idToken): Observable<any> {
    console.log("inside dotnet")
    return this.http.post<any>(
      DOTNET_LOGIN_API,
      { idToken },
      { ...this.httpOptions }
    );
  }
}
