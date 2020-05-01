import { FileUploader } from 'ng2-file-upload';
import { AppServicesService } from 'src/app/services/app-services.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class AppNavBarComponent implements OnInit {

  classNameForToggle: string = "";
  flag: number = 0;
  name: string;
  role: string;

  adminBool: boolean = false;
  hrBool: boolean = false;

  constructor(private renderer: Renderer2,
              private authService: MsalService,
              private _service: AppServicesService) { }

  ngOnInit() {
    let data = this._service.tokenDecoder();
    this.name =  data.name;
    this.role = data.role;
    if(this.role == "admin"){
      this.adminBool = true;
    }
    else if(this.role == "hr"){
      this.hrBool = true;
    }
  }

  toggle(){
    if(this.classNameForToggle == "active")
      this.classNameForToggle = "";
    else
      this.classNameForToggle = "active";
  }

  toggleBig(){
    if(this.flag == 0){
      this.renderer.addClass(document.body, "sidebar-icon-only");
      this.flag = 1;
    }
    else{
      this.renderer.removeClass(document.body, "sidebar-icon-only");
      this.flag = 0;
    }
  }

  logout() {
    this.authService.logout();
  }

}
