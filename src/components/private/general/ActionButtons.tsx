import {CheckIcon, PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";

interface Props {
    name: string;
    isEditing: boolean | undefined;
    toggleAction: (id: string) => void;
    submitActionHandler: () => void;
}

const ActionButtons = ({name, isEditing, toggleAction, submitActionHandler}: Props) => {
    const onToggleAction = () => toggleAction(name)

    const onSaveAction = () => {
        toggleAction(name)
        submitActionHandler()
    }

    if (isEditing) {
        return (
            <>
                <button type="button"
                        onClick={onToggleAction}
                        className="font-semibold text-slate-600 hover:text-slate-500 flex justify-center items-center"
                >
                    <XMarkIcon className="h-5 w-5"/> <span className="hidden sm:block">Cancel</span>
                </button>
                <button type="button"
                        onClick={onSaveAction}
                        className="font-semibold text-green-600 hover:text-green-500 flex justify-center items-center"
                >
                    <CheckIcon className="h-5 w-5"/> <span className="hidden sm:block">Save</span>
                </button>
            </>
        )
    }

    return (
        <button type="button"
                onClick={onToggleAction}
                className="font-semibold text-blue-600 hover:text-blue-500"
        >
            <PencilSquareIcon className="h-5 w-5"/>
        </button>
    )
}

export default ActionButtons
