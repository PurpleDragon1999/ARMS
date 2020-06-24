import { AppServicesService } from "./../services/app-services.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RoleGuardService implements CanActivate {
  constructor(private _router: Router, private _service: AppServicesService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem("Authorized")) {
      const user = this._service.tokenDecoder().role;
      if (user === next.data.role) {
        return true;
      }
      // navigate to not found page
      this._router.navigate(["/error/404"]);
      return false;
    } else {
      this._router.navigate(["/login"]);
      return false;
    }
  }
}
