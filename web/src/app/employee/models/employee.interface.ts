type Designation = 'intern' | 'consultant1' | 'consultant2' | 'associate1' | 'associate2' | 'manager';
type Role = 'admin' | 'hr' | 'interviewer';
type Gender = 'male' | 'female';

export interface IEmployee{
    name: String;
    designation: Designation;
    role: Role;
    email: String;
    employeeId: Number;
    password: String;
    gender: Gender;
}