import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import SectionContainer from "@/components/private/general/SectionContainer";
import {useFetchIdentifiersQuery} from "@/api/identifier";

const IdentifierSection = () => {
    const {data: identifiers} = useFetchIdentifiersQuery()
    console.log({identifiers})

    return (
        <SectionContainer title={'NIP-05 Identifiers'} subtitle={'Connect bank accounts to your account.'}>
            <ul role="list"
                className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                {identifiers?.map((identifier) => (
                    <li key={identifier.id} className="flex justify-between gap-x-6 py-6">
                        <div className="font-medium text-slate-900">{identifier.value}</div>
                        <button type="button" className="font-semibold text-blue-600 hover:text-blue-500">
                            <DocumentDuplicateIcon className="h-5 w-5"/>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    <span aria-hidden="true">+</span> Add nip-05 identifier
                </button>
            </div>
        </SectionContainer>
    )
}

export default IdentifierSection