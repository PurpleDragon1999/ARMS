type FormType = "create" | "update" | "read"; 

export interface IDataModal {
  formType: FormType,
  data: any; 
}