import {Data, ObjectResponse} from "@/resources/user";

/**
 *
 * @param classes
 */
export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

/**
 *
 * @param response
 */
export const transformer = (response: ObjectResponse | Data) => <unknown>('data' in response ? response.data : response).attributes

/**
 *
 * @param len
 */
export const generateCodeVerifier = (len = 128) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let result = ''

    for (let i = 0; i < len; i++) {
        result = `${result}${chars.charAt(Math.random() * chars.length)}`
    }

    return result
}
