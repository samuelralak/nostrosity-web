import baseApi from "@/api/base";
import {ObjectResponse, User, UserPayload} from "@/resources/user";
import {transformer} from "@/utils";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        queryUser: builder.query<boolean, string | null>({
            query: (pubkey: string) => ({method: 'GET', url: `/users/${pubkey}`}),
        }),
        createUser: builder.mutation<User, UserPayload>({
            query: (payload: UserPayload) => ({method: 'POST', url: '/users', body: payload}),
            transformResponse: (response: ObjectResponse) => <User>transformer(response),
            invalidatesTags: [{type: 'User', id: 'USER_LIST'}]
        }),
        sigInUser: builder.mutation<User, { pubkey: string, password: string }>({
            query: ({pubkey, password}) => ({
                method: 'POST', url: '/auth/sign_in', body: {user: {pubkey, password}}
            }),
            transformResponse: (response: Record<string, any>) => (<User>{
                    id: response.id,
                    pubkey: response.pubkey,
                    npub: response.npub,
                    createdAt: response.created_at,
                    updatedAt: response.updated_at
                }
            ),
            invalidatesTags: [{type: 'User', id: 'USER_LIST'}]
        })
    }),
    overrideExisting: false
})

export const {useCreateUserMutation, useQueryUserQuery, useSigInUserMutation} = userApi
export default userApi
