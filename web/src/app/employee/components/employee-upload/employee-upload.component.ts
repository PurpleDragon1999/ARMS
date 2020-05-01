import { ModalComponent } from "../../../reusable-components/modal/modal.component";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

const URL = "http://localhost:3000/api/employee/bulk";

@Component({
  selector: "app-employee-upload",
  templateUrl: "./employee-upload.component.html",
  styleUrls: ["./employee-upload.component.scss"],
})
export class EmployeeUploadComponent implements OnInit {
  uploadProgress: Number = 0;
  isNotAllowedUploadType: Boolean = true;
  message: any;

  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "csvUpload",
    allowedMimeType: ["text/csv", "application/vnd.ms-excel"],
  });

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onProgressItem = (item, progress) => {
      this.uploadProgress = progress;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.uploader.clearQueue();
      let response = {
        item: item,
        status: status
      }
    };

    this.uploader.onSuccessItem = (item: any, response: string, status: number) => {
      let data = JSON.parse(response);
      this.message = data;
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.message = this.message;
      this.modalClose()
    }

    this.uploader.onWhenAddingFileFailed = function (item: any, filter: any, options: any, ) {
      this.isNotAllowedUploadType = true;
    };
  }



  modalClose(){
    if(this.activeModal)
      this.activeModal.dismiss()
  }
}
