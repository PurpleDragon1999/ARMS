import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-jd-pdf',
  templateUrl: './jd-pdf.component.html',
  styleUrls: ['./jd-pdf.component.scss']
})
export class JdPdfComponent implements OnInit {
  @Input()jdObj:any;
  constructor() { }

  ngOnInit() {
   
  }
  //listening from jd-form
  makePdf(jdPdf:{jdFormObject}){
    
  
  }

}
