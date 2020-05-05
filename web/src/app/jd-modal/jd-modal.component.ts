import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppServicesService } from "../services/app-services.service";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-jd-modal',
  templateUrl: './jd-modal.component.html',
  styleUrls: ['./jd-modal.component.scss']
})
export class JdModalComponent implements OnInit {

  @Input()
  jdUpdateId : string

  constructor( private formBuilder: FormBuilder,
    private _service: AppServicesService,
    private router: Router,
    private modalService:NgbModal,
    private _router:Router) {}

    ngOnInit() {
      
    }
  }