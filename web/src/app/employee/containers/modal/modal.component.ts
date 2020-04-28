import { Component, OnInit, Injectable} from '@angular/core';
import {
  NgbActiveModal,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
