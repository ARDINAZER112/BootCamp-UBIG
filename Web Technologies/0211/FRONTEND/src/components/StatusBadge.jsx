import { capitalize, statusClass } from "../utils/format";

export default function StatusBadge({ status }) {
    return <span className={`badge ${statusClass(status)}`}>{capitalize(status)}</span>
}