import { IInterview } from './interview.interface';

export interface IRoundType {
    roundName: string;
}

export interface IRound {
    roundType: IRoundType;
    interview: IInterview;
}