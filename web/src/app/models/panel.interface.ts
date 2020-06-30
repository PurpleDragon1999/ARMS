export interface IRoundPanel {
  roundId: number;
  panel1?: IPanel;
  panel2?: IPanel;
  panel3?: IPanel;
}

interface IPanel {
  employees: IEmployee[];
}

interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}
