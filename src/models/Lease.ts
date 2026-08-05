import type { LeaseFieldObject } from "./LeaseFieldObject";

//represents row from leases table in database
export type Lease = {
  id: number;
  title: string;
  "Premises": LeaseFieldObject;
  "Term": LeaseFieldObject;
  "Rent": LeaseFieldObject;
  "Security Deposit": LeaseFieldObject;
  "Maintenance and Repairs": LeaseFieldObject;
  "Utilities": LeaseFieldObject;
  "Insurance": LeaseFieldObject;
  "Taxes": LeaseFieldObject;
  "Surrender": LeaseFieldObject;
  "Holding Over": LeaseFieldObject;
  "Option to Extend Lease": LeaseFieldObject;
  "Notices": LeaseFieldObject;
  "Attorney Fees": LeaseFieldObject;
};
