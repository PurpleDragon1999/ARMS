import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvVarService {

  constructor() { }

  ADMIN: string = "Admin";
  EMPLOYEE: string = "Employee";
  SUPERUSER: string = "SuperAdministrator";
}
