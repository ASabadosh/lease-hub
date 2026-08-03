//represents object within field of leases table
// or row from additional_lease_fields table without id and lease_id
export type LeaseFieldObject = {
  field: string;
  value: string;
  confirmed: boolean;
  clauses: string;
};