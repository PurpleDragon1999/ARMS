import { IJobDescription } from './jobDescription.interface';
import { IRound } from './round.interface';
import { IInterviewPanel } from './interview.interface';

export interface ICandidate {
  name: string;
  email: string;
  phone: string;
  identificationNo?: string;
  experience: number;
  aadhar: string;
  file: string;
  skills: string;
  selection: string;
  appliedFor: string;
  status: string;
  flag: number,
  cv: string;
}

export interface IApplication {
  education?: string;
  candidate: ICandidate;
  jobDescription: IJobDescription;
  experience: string;
}

export interface IAssessment {
  feedback: string;
  round: IRound;
  application: IApplication;
  result: boolean;
  interviewPanelId: IInterviewPanel;
}
