import { InterviewService } from './../services/interview.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  rounds: any[];
  columns: Array<string>;


  constructor(private service: InterviewService) { }


  ngOnInit() {
    this.getRounds();
  }

  getRounds(){    
    this.service.getRounds(97,1).subscribe((res: any) =>{
      this.rounds = res.result.payload.data;
      this.columns = ["roundNumber", "roundType", "roundDate", "roundTime"]
    })
  }


}
