import { Component, OnInit, Renderer2 } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  classNameForToggle: string = "";
  flag: number = 0;

  constructor(private renderer: Renderer2,
              private authService:MsalService) { }

  ngOnInit() {
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
