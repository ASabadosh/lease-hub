import { Lease } from "@/models/Lease";

export default function LeasePreview(props: Lease) {
    return (
        <div className = "cursor-pointer rounded-sm border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">
            {props.title}
            </h3>
        </div>
    );
}