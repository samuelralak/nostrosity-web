import baseApi from "@/api/base";
import {ObjectResponse, User, UserPayload} from "@/resources/user";
import {transformer} from "@/utils";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<User, string>({
            query: (pubkey: string) => ({method: 'GET', url: `/users/${pubkey}`}),
            transformResponse: (response: ObjectResponse) => <User>transformer(response),
            invalidatesTags: (_result, _error, pubkey) => [{type: 'User', pubkey}]
        }),
        createUser: builder.mutation<User, UserPayload>({
            query: (payload: UserPayload) => ({method: 'POST', url: '/users', body: payload}),
            transformResponse: (response: ObjectResponse) => <User>transformer(response),
            invalidatesTags: [{type: 'User', id: 'USER_LIST'}]
        }),
    }),
    overrideExisting: false
})

export const {useCreateUserMutation} = userApi
export default userApi
