export interface UserResponse {
    data: {
        id: string;
        attributes: Record<string, never>
    }
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
        }
    }
}

export interface User {
    id: string;
    pubkey: string;
    npub: string;
    createdAt: string;
    updatedAt: string;
}