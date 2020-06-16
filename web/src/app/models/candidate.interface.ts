import { IJobDescription } from './jobDescription.interface';

export interface ICandidate {
  name: string;
  email: string;
  phone: string;
  identificationNo?: string;
}

export interface IApplication {
  education?: string;
  candidate: ICandidate;
  jobDescription: IJobDescription;
  experience: string;
}

export interface IAssessment {
  feedback: string;
  round: 
}