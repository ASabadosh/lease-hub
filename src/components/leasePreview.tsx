import { Lease } from "@/models/Lease";

export default function LeasePreview(props: Lease) {
    return (
        <div>
            <h3 className="text-left text-sm font-semibold text-gray-900">
            {props.title}
            </h3>
        </div>
    );
}