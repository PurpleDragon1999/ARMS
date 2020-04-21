import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  className: string = "";

  constructor() { }

  ngOnInit() {
  }

  changeOverlay(){
    if(this.className == "active")
      this.className = "";
    else
      this.className = "active";
  }

}
