import { IJobDescription } from './jobDescription.interface';
import { IRound } from './round.interface';
import { IInterviewPanel } from './interview.interface';

export interface ICandidate {
    name: string;
    email: string;
    phone : string;
    experience: string;
    nationality : string;
    identificationNo: string;
    idProofTypeId : number;
    jobId: number;
    education : string;
    file : string;
    experienceInYears : string;
    experienceInMonths : string;
    appliedForJdId : string,
    appliedForPosition : string,
    createdBy : string,
    modifiedBy : string
   
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
