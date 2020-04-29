import { Component, OnInit } from '@angular/core';
import { AppServicesService } from 'src/app/services/app-services.service';


@Component({
  selector: 'app-jd-home',
  templateUrl: './jd-home.component.html',
  styleUrls: ['./jd-home.component.scss']
})
export class JdHomeComponent implements OnInit {
  jobsList: string[];

  constructor(private _service: AppServicesService) { }

  ngOnInit() {
    this.loadJds();
  }

  loadJds(){
    return this._service.getAllJobs().subscribe((response: any) => {  
      return (this.jobsList = response.payload.data);
    });
  }

}
