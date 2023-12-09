const constants: {
    API_BASE_URL: string | undefined,
    CLIENT_ID: string | undefined,
    STORAGE_KEY: string
} = {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
    STORAGE_KEY: '_nstr_session'
}

export default constants
