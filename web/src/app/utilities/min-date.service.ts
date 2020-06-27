import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MinDateService {

  constructor() { }

  dtToday:any=new Date(Date.now());
  minimumDate:string;
  setMinimumDate():string{
    var month = this.dtToday.getMonth() + 1;
    var day = this.dtToday.getDate();
    var year = this.dtToday.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
        day = '0' + day.toString();
    
    this.minimumDate= year + '-' + month + '-' + day;
    this.minimumDate=this.minimumDate.toString();
    return this.minimumDate;
  }
}
