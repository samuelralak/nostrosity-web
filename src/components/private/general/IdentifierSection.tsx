import SectionContainer from "@/components/private/general/SectionContainer";
import Identifiers from "@/components/Identifiers";
import constants from "@/constants";
import {FormEvent, ReactNode, useState} from "react";
import ActionButtons from "@/components/private/general/ActionButtons";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {IdentifierSchema} from "@/schemas";
import {useAddIdentifierMutation} from "@/api/identifier";

const IdentifierSection = () => {
    const [addNipIdentifier, setAddNipIdentifier] = useState<{ name: string }>()
    const [addIdentifier] = useAddIdentifierMutation()
    const {
        register,
        handleSubmit,
        formState: {errors, isDirty, isValid, isSubmitting}
    } = useForm({resolver: zodResolver(IdentifierSchema)})

    const onNameInput = (event: FormEvent<HTMLInputElement>) => {
        const currentTarget = event.target as HTMLInputElement
        setAddNipIdentifier(({...addNipIdentifier, name: currentTarget.value}))
    }

    const onIdentifierNameSubmit: SubmitHandler<FieldValues> = async ({name}) => {
        const result = await addIdentifier({name})
        console.log({result})
    }

    return (
        <SectionContainer title={'NIP-05 Identifiers'} subtitle={''}>
            <Identifiers/>
            {addNipIdentifier ? (
                <div className="divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                    <div className="flex justify-between gap-x-6 py-6 items-center w-full">
                        <div>
                            <div
                                className="flex rounded-lg ring-2 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                                <input
                                    {...register('name')}
                                    type="text"
                                    className="block flex-1 border-0 bg-transparent py-4 pl-2 text-slate-900 placeholder:text-slate-400 focus:ring-0 text-sm sm:leading-6"
                                    placeholder="e.g jack"
                                />
                                <span
                                    className="flex select-none items-center pr-3 text-slate-500 text-sm font-medium">{constants.IDENTIFIER_DOMAIN}</span>
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">{errors.name.message as ReactNode}</p>
                            )}
                        </div>

                        <div className="flex gap-x-2 items-center">
                            <ActionButtons name={'name'}
                                           isEditing={addNipIdentifier?.name !== undefined}
                                           toggleAction={(_) => setAddNipIdentifier(undefined)}
                                           submitActionHandler={handleSubmit(onIdentifierNameSubmit)}
                            />
                        </div>


                    </div>
                </div>
            ) : (
                <div className="flex border-t border-slate-100 pt-6">
                    <button type="button" onClick={() => setAddNipIdentifier({name: ''})}
                            className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500">
                        <span aria-hidden="true">+</span> Add nip-05 identifier
                    </button>
                </div>
            )}
        </SectionContainer>
    )
}

export default IdentifierSection
