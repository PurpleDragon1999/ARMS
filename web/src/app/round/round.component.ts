import { UpdateInterviewComponent } from './../update-interview/update-interview.component';
import { ModalComponent } from './../reusable-components/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewService } from './../services/interview.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  rounds: any[];
  columns: Array<string>;
  id: number;
  append: number;


  constructor(private service: InterviewService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private router: Router) { }


  ngOnInit() {
    this.getRounds();
  }

  getRounds(){ 
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.append = params['append'];
      });   
    this.service.getRounds(this.id,this.append).subscribe((res: any) =>{
      this.rounds = res.payload.data;
      this.columns = ["roundNumber", "roundType", "roundDate", "roundTime"]
    })
  }

  deleteRound(data){
    let roundID= data.id;
    let id = data.interview.id;
    this.service.deleteRound(id,roundID).subscribe((res:any) =>{
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.shouldConfirm = true;
      modalRef.componentInstance.success = res.success;
      modalRef.componentInstance.message = res.payload.message;
      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();  
        });
    })
  }

  updateRound(data){
    const modalRef: NgbModalRef = this.modalService.open(UpdateInterviewComponent);
    modalRef.componentInstance.id = data.data.interview.id;
    modalRef.componentInstance.roundID = data.data.id;
    modalRef.componentInstance.isInterview = false;
    modalRef.componentInstance.isRounds = true;
    modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
      modalRef.close();
    //  this.getRounds();
    });
  }


}
