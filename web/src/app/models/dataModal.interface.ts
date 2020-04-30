type FormType = "create" | "update" | "read"; 

interface IDataModal {
  formType: FormType,
  data: any; 
}