import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { FileItem, FileUploader, ParsedResponseHeaders } from "ng2-file-upload";
import { ModalComponent } from "../../../reusable-components/modal/modal.component";

const URL = "http://localhost:3000/api/employee/bulk";

@Component({
  selector: "app-employee-upload",
  templateUrl: "./employee-upload.component.html",
  styleUrls: ["./employee-upload.component.scss"],
})
export class EmployeeUploadComponent implements OnInit {
  uploadProgress: Number = 0;
  isNotAllowedUploadType: Boolean = true;

  @Output()
  closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal
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
    };

    this.uploader.onSuccessItem = (item: any, response: string, status: number) => {
      this.modalClose(true);
      let data = JSON.parse(response);
      const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

      modalRef.componentInstance.shouldConfirm = false;

      modalRef.componentInstance.success = data.success;
      modalRef.componentInstance.message = data.payload.message;

      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
    }

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.modalClose(false);
      let data = JSON.parse(response);
      const modalRef: NgbModalRef = this.modalService.open(ModalComponent);

      modalRef.componentInstance.shouldConfirm = false;

      modalRef.componentInstance.success = data.success;
      modalRef.componentInstance.message = data.payload.message;

      modalRef.componentInstance.closeModal.subscribe((rerender: boolean) => {
        modalRef.close();
      });
    };

    this.uploader.onWhenAddingFileFailed = () => {

    };
  }

  modalClose(rerender: boolean): void {
    this.closeModal.emit(rerender);
  }
}
