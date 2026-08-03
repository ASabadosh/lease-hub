import type { LeaseFieldObject } from "./LeaseFieldObject";

//represents row from leases table in database
export type Lease = {
    id: number
    title: string;
    premises: LeaseFieldObject | null;
    term: LeaseFieldObject | null;
    rent: LeaseFieldObject | null;
    security_deposit: LeaseFieldObject | null;
    maintenance_and_repairs: LeaseFieldObject | null;
    utilities: LeaseFieldObject | null;
    insurance: LeaseFieldObject | null;
    taxes: LeaseFieldObject | null;
    surrender: LeaseFieldObject | null;
    holding_over: LeaseFieldObject | null;
    option_to_extend_lease: LeaseFieldObject | null;
    notices: LeaseFieldObject | null;
    attorney_fees: LeaseFieldObject | null;
}