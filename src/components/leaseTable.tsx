import { Lease } from "@/models/Lease";

export default function LeaseTable(props: Lease) {
return (
    <div>
        <h3> {props.title} </h3>
    </div>
);
}