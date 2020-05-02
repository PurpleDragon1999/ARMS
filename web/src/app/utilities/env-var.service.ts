import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvVarService {

  constructor() { }

  ADMIN:string = "admin";
  HR: string = "hr";
  INTERVIEWER: string = "user";
}
