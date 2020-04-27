import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{HttpClient,HttpHeaders} from '@angular/common/http'

const LOGIN_API="http://localhost:3000/api/checkvalidemployee"
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
};
 
  
  checkPermissions(idToken):Observable<any>{
     return this.http.post<any>(LOGIN_API,{idToken},{...this.httpOptions});

  }

}
