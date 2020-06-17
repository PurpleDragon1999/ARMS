import { IJobDescription } from './jobDescription.interface';
import { IRound } from './round.interface';
import { IInterviewPanel } from './interview.interface';

export interface ICandidate {
  name: string;
  email: string;
  phone: string;
  identificationNo?: string;
  experience: string;
  aadhar: string;
  file: string;
  skills: string;
  selection: string;
  appliedFor: string;
  status: string;
  flag: number,
  cv: string;
  nationality: string;
  idProofTypeId: number;
  jobId: number;
  education: string;
  experienceInYears: string;
  experienceInMonths: string;
  appliedForJdId: string,
  createdBy: string,
  modifiedBy: string
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
