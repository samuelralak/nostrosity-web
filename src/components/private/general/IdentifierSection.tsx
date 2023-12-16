import SectionContainer from "@/components/private/general/SectionContainer";
import Identifiers from "@/components/Identifiers";

const IdentifierSection = () => {
    return (
        <SectionContainer title={'NIP-05 Identifiers'} subtitle={'Connect bank accounts to your account.'}>
            <Identifiers/>

            <div className="flex border-t border-gray-100 pt-6">
                <button type="button" className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    <span aria-hidden="true">+</span> Add nip-05 identifier
                </button>
            </div>
        </SectionContainer>
    )
}

export default IdentifierSection
