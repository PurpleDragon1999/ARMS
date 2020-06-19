import { IJobDescription } from './jobDescription.interface';
import { IRound } from './round.interface';

export interface IInterview {
  datetime: Date;
  jobId: IJobDescription;
  noOfRounds: number;
}

export interface IInterviewPanel {
  name: string;
  roundId: IRound;
}