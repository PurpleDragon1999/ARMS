import { Component, OnInit } from "@angular/core";
import { EmployeeService } from '../../employee.service';
import { IResponse } from 'src/app/models/response.interface';
import { IEmployee } from '../../models/employee.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
    selector: 'app-employee',
    styleUrls: ['employee.component.scss'],
    templateUrl: 'employee.component.html'
})
export class EmployeeComponent implements OnInit{
    employees: IEmployee[] = [];
    columns: Array<String> = [];

    constructor(private employeeService: EmployeeService, private modalService : NgbModal){}

    ngOnInit(): void{
        this.employeeService.getAllEmployees().subscribe((res: IResponse) => {
            console.log(this.employees,res, 'response for all employees');
            if(res.payload.data){
                this.employees = res.payload.data;
                this.columns = ['name', 'email', 'employeeId', 'designation', 'role'];
            }
        });
    }

    openModal(dataModal: IDataModal) {
        console.log(dataModal, 'dataModal inside employeeComponet');

        if(dataModal.formType === 'update' && dataModal.data.employeeId){
            dataModal.data.employeeId = Number(
                dataModal.data.employeeId.toString().replace("CYG-", "")
            );   
        }
        else{
            dataModal.data = {};
        }

        const modalRef = this.modalService.open(EmployeeFormComponent);
        modalRef.componentInstance.formType = dataModal.formType;
        modalRef.componentInstance.data = dataModal.data;
        modalRef.componentInstance.closeModal.subscribe(() => {
            modalRef.close();
        })
    }
}