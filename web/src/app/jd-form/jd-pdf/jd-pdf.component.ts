import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jd-pdf',
  templateUrl: './jd-pdf.component.html',
  styleUrls: ['./jd-pdf.component.scss']
})
export class JdPdfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  //listening from jd-form
  makePdf(jdPdf:{jdFormObject}){
     console.log(jdPdf);
  
  }

}
