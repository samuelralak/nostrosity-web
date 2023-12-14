const InlineTextInput = () => {
    return (
        <form className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
                <label htmlFor="email" className="sr-only">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-3.5 text-slate-900 ring-2 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                />
            </div>
            <button
                type="submit"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
                Save
            </button>
        </form>
    )
}

export default InlineTextInput
