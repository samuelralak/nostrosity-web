import {useFetchIdentifiersQuery} from "@/api/identifier";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import IdentifierLoader from "@/components/Identifiers/IdentifierLoader";

const Identifiers = () => {
    const {data: identifiers, isLoading} = useFetchIdentifiersQuery()

    if (isLoading) {
        return <IdentifierLoader />
    }

    return (
        <ul role="list"
            className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6"
        >
            {identifiers?.map((identifier) => (
                <li key={identifier.id} className="flex justify-between gap-x-6 py-6">
                    <div className="font-medium text-slate-900">{identifier.value}</div>
                    <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                        <DocumentDuplicateIcon className="h-5 w-5"/>
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Identifiers
