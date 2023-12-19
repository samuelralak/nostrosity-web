import {z} from "zod";

export const PasswordSchema = z
    .object({
        password: z.string().min(6),
    })

export const IdentifierSchema = z.object({
    name: z.string().min(3).max(20).regex(/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/).refine((username) => username.toLowerCase(), {
        message: 'Transformed to lowercase',
    })
})
