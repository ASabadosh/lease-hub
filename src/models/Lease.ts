import type { LeaseFieldObject } from "./TableRow";

//represents row from leases table in database
export type Lease = {
  id: number;
  title: string;
  "Premises": LeaseFieldObject | null;
  "Term": LeaseFieldObject | null;
  "Rent": LeaseFieldObject | null;
  "Security Deposit": LeaseFieldObject | null;
  "Maintenance and Repairs": LeaseFieldObject | null;
  "Utilities": LeaseFieldObject | null;
  "Insurance": LeaseFieldObject | null;
  "Taxes": LeaseFieldObject | null;
  "Surrender": LeaseFieldObject | null;
  "Holding Over": LeaseFieldObject | null;
  "Option to Extend Lease": LeaseFieldObject | null;
  "Notices": LeaseFieldObject | null;
  "Attorney Fees": LeaseFieldObject | null;
};
