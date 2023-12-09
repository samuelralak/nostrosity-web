'use server'

export const basicAuthToken = async (clientId: string): Promise<[string | undefined, boolean]> => {
    const clientSecret = process.env.CLIENT_SECRET

    if (clientSecret) {
        const credentials = `${clientId}:${clientSecret}`
        const encoded = Buffer.from(credentials).toString('base64')
        return [encoded, true]
    }

    return [undefined, false]
}
