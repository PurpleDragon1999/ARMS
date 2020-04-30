import { Component, OnInit } from '@angular/core';
import { AppServicesService } from './../services/app-services.service';


@Component({
  selector: 'app-jd-list',
  templateUrl: './jd-list.component.html',
  styleUrls: ['./jd-list.component.scss']
})
export class JdListComponent implements OnInit {

  constructor(private _service: AppServicesService) { }
  
  ngOnInit() {

  }

}
