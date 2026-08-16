"use client";
import "react-tabulator/lib/css/tabulator.min.css";
import { ReactTabulator, ColumnDefinition, } from "react-tabulator";
import { Lease } from "@/models/Lease";
import { TableRow } from "@/models/TableRow";
import { AdditionalLeaseField } from "@/models/AdditionalLeaseField";
import styles from "./leaseTable.module.css";
import { addAdditionalLeaseField } from "@/database/addAdditionalLeaseField";
import { updateDatabase } from "@/database/updateDatabase";

type LeaseTableProps = {
  lease: Lease;
  additional_lease_fields: AdditionalLeaseField[];
  onFieldAdded: (newField: AdditionalLeaseField) => void;
  onTableUpdated: (cell: any, property: keyof TableRow) => void;
};

function isLeaseFieldObject(value: unknown): value is TableRow {
  return (
    typeof value === "object" &&
    value !== null &&
    "field" in value &&
    "value" in value &&
    "confirmed" in value &&
    "clauses" in value
  );
}

export default function LeaseTable({ lease, additional_lease_fields, onFieldAdded, onTableUpdated}: LeaseTableProps) {
    const columns: ColumnDefinition[] = [
    {
        title: "Key Information",
        field: "field",
        formatter: "textarea",
        widthGrow: 1,
        variableHeight: true,
        headerSort: false,
        editor: "input",
        cellEdited: function(cell: any) {
            updateDatabase(cell, "field");
            onTableUpdated(cell, "field");
        },
        cssClass: "break-words-cell",
    },
    {
        title: "Value",
        field: "value",
        formatter: "textarea",
        widthGrow: 3,
        variableHeight: true,
        headerSort: false,
        editor: "input",
        cellEdited: function(cell: any) {
            updateDatabase(cell, "value");
            onTableUpdated(cell, "value");
        },
        cssClass: "break-words-cell",
    },
    {
        title: "Confirmed",
        field: "confirmed",
        formatter: "tickCross",
        editor: "tickCross",
        widthGrow: 1,
        headerSort: false,
        cellEdited: function(cell: any) {
            updateDatabase(cell, "confirmed");
            onTableUpdated(cell, "confirmed");
        },
    },
    {
        title: "Clauses",
        field: "clauses",
        formatter: "textarea",
        widthGrow: 1,
        variableHeight: true,
        headerSort: false,
        editor: "input",
        cellEdited: function(cell: any) {
            updateDatabase(cell, "clauses");
            onTableUpdated(cell, "clauses");
        },
        cssClass: "break-words-cell",
    },
    {
        title: "ID",
        field: "id",
        visible: false,
    },
    {
        title: "Source",
        field: "sourceTable",
        visible: false,
    },
  ];
  const data: TableRow[] = [];

  for (const [key, value] of Object.entries(lease)) {
    if (key === "id" || key === "title") {
      continue; // Skip the id and title fields
    }
    if (isLeaseFieldObject(value)) {
      data.push({
        field: value.field,
        value: value.value,
        confirmed: value.confirmed,
        clauses: value.clauses,
        id: lease.id,
        sourceTable: "leases",
      });
    }
  }
  if (additional_lease_fields.length !== 0) {
    for (const field of additional_lease_fields) {
      data.push({
        field: field.field,
        value: field.value,
        confirmed: field.confirmed,
        clauses: field.clauses,
        id: field.id, // if source table = "additional_lease_fields", id is row id
        sourceTable: "additional_lease_fields",
      });
    }
  }

  async function handleAddRowClick(lease: Lease) {
    const new_field = await addAdditionalLeaseField(lease);

    if (new_field != null) {
      onFieldAdded(new_field);
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
      <button
        onClick={() => handleAddRowClick(lease)}
        className="h-10 w-full border border-gray-200 rounded-b-md text-sm font-medium text-blue-600 cursor-pointer transition-colors hover:bg-blue-50"
      >
        + Add Row
      </button>
    </div>
  );
}