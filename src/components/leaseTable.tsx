import "react-tabulator/lib/css/tabulator.min.css";
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator';
import { Lease } from '@/models/Lease'; 
import { LeaseFieldObject } from '@/models/LeaseFieldObject';
import { AdditionalLeaseFieldObject } from '@/models/AdditionalLeaseFieldObject';
import styles from './leaseTable.module.css';
import { addAdditionalLeaseField } from "@/database/addAdditionalLeaseField";


type LeaseTableProps = {
    lease: Lease;
    additional_lease_fields: AdditionalLeaseFieldObject[];
    };

const columns = [
    { 
        title: "Key Information", 
        field: "field",
        formatter: "textarea", 
        widthGrow: 1,
        variableHeight: true,
        headerSort: false,
    },
    { 
        title: "Value", 
        field: "value", 
        formatter: "textarea", 
        widthGrow: 3, 
        variableHeight: true,
        headerSort: false,
    },
    { 
        title: "Confirmed", 
        field: "confirmed",
        formatter: "tickCross",
        widthGrow: 1,
        headerSort: false,
    },
    { 
        title: "Clauses", 
        field: "clauses",
        formatter: "textarea", 
        widthGrow: 1, 
        variableHeight: true,
        headerSort: false,
    },
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

async function handleClick(lease: Lease) {
    addAdditionalLeaseField(lease);
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
    <div className="flex flex-col p-5 bg-white">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-5">
            {lease.title}
        </h1>
        <div className={styles.wrapper}>
            <ReactTabulator
                data={data}
                columns={columns}
                options={{
                    layout: "fitColumns",
                    height: "470px",
                }}
            />
        </div>
        <button onClick={() => handleClick(lease)} className="h-10 w-full border border-gray-200 rounded-b-md text-sm font-medium text-blue-600 cursor-pointer transition-colors hover:bg-blue-50">
        + Add Row
        </button>
    </div>
);
}