//represents row in Tabular table

export type TableRow = {
  field: string;
  value: string;
  confirmed: boolean;
  clauses: string;
  id: number; //table row meta data
  sourceTable: string; //table row meta data
};