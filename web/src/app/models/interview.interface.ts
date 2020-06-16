import { IJobDescription } from './jobDescription.interface';

export interface IInterview {
  datetime: Date;
  jobId: IJobDescription;
  noOfRounds: number;
}