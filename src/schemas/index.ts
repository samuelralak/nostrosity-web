import {z} from "zod";

export const PasswordSchema = z
    .object({
        password: z.string().min(6),
    })
