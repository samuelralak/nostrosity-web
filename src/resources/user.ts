export interface Data {
    id: string;
    attributes: Record<string, never>
}

export interface ObjectResponse {
    data: Data
}

export interface ListResponse {
    data: Data[]
}

export interface UserPayload {
    user: {
        id?: string;
        npub: string;
        pubkey: string;
        password: string;
        identifiers_attributes: {
            id?: string;
            name: string;
            default?: boolean;
        }[]
    }
}

export interface User {
    id: string;
    pubkey: string;
    npub: string;
    createdAt: string;
    updatedAt: string;
}

export interface Identifier {
    id: string;
    default: boolean;
    name: string;
    value: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
