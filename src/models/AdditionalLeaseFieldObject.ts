export type AdditionalLeaseFieldObject = {
    id: number;
    lease_id: number;
    field: string;
    value: string;
    confirmed: boolean;
    clauses: string;
};