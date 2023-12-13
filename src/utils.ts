import {Data, ObjectResponse} from "@/resources/user";
import {nip19} from "nostr-tools";

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

/**
 *
 * @param key
 */
export const validatePrivateKey = (key: string): 'nsec' | 'hex' | false => {
    const hexRegex = /^[0-9a-fA-F]+$/;
    const nsecRegex = /^nsec\d+[a-zA-Z0-9]+$/;

    if (hexRegex.test(key) && key.length === 64) {
        return 'hex'
    }

    if (nsecRegex.test(key)) {
        return 'nsec'
    }

    return false
}

/**
 *
 * @param nsec
 */
export const decodeNsec = (nsec: `nsec1${string}`): string => {
    const {data} = nip19.decode(nsec)
    return data
}
