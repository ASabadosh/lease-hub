import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { Lease } from '@/models/Lease'; 
import { LeaseFieldObject } from '@/models/LeaseFieldObject';
import { AdditionalLeaseFieldObject } from '@/models/AdditionalLeaseFieldObject';
import { getAdditionalLeaseFields } from '@/database/getAdditionalLeaseFields';

type LeaseTableProps = {
    lease: Lease;
    additional_lease_fields: AdditionalLeaseFieldObject[];
    };

const columns = [
  { title: "Field", field: "field"},
  { title: "Value", field: "value"},
  { title: "Confirmed", field: "confirmed"},
  { title: "Clauses", field: "clauses" }
];

function isLeaseFieldObject(value: unknown): value is LeaseFieldObject {
  return (
    typeof value === "object" &&
    value !== null &&
    "field" in value &&
    "value" in value &&
    "confirmed" in value &&
    "clauses" in value
  );
}

export default function LeaseTable({lease, additional_lease_fields}: LeaseTableProps) {
    let data: LeaseFieldObject[] = [];
    for (const [key, value] of Object.entries(lease)) {
        if (key === "id" || key === "title") {
            continue; // Skip the id and title fields
        }
        if (isLeaseFieldObject(value)) {
            data.push(value);
        } else {
            data.push({
                field: key, 
                value: "Field not found", 
                confirmed: false, 
                clauses: ""
            })
        }
    }
    if (additional_lease_fields.length !== 0) {
        for (const [key, value] of Object.entries(additional_lease_fields)) {
        data.push({
            field: value.field,
            value: value.value,
            confirmed: value.confirmed,
            clauses: value.clauses
        });
        }
    }

return (
    <ReactTabulator
 data={data}
 columns={columns}
 layout={"fitData"}
 />

);
}