import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.scss']
})
export class InterviewDetailComponent  {

  @Input()
  title: string = '';

  @Input()
  data: any = {};
}
