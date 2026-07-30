import { Lease } from "@/models/Lease";
import { title } from "process";

type LeasePreviewProps = {
    id: number;
    title: string;
}


export default function LeasePreview(props: LeasePreviewProps) {
    return (
        <div>
            <h3 className="text-left text-sm font-semibold text-gray-900">
            {props.title}
            </h3>
        </div>
    );
}