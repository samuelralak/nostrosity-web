export interface Token {
    tokenType: string;
    accessToken: string;
    expiresIn?: number;
    scope?: string;
    refreshToken?: string;
}
