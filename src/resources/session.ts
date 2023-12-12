import {Token} from "@/resources/token";
import {User} from "@/resources/user";

export interface AppSession {
    token: Token | undefined;
    user: User & {
        isLoggedIn: boolean;
        signerMethod?: "nip07" | "nip46" | "privateKey";
    } | undefined;
    privateKeys: {
        nsec: string;
        hex: string;
    } | undefined
}
