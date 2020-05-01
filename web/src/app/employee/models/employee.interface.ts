type Designation = 'intern' | 'consultant1' | 'consultant2' | 'associate1' | 'associate2' | 'manager';
type Role = 'admin' | 'hr' | 'interviewer';
// type Gender = 'male' | 'female';

export interface IEmployee{
    _id?: String;
    name: String;
    designation: Designation;
    role: Role;
    email: String;
    employeeId: Number;
    profileImageUrl?: File;
}