import baseApi from "@/api/base";
import {User, UserPayload, UserResponse} from "@/resources/user";

const transformer = (response: UserResponse) => <unknown>response.data.attributes

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<User, string>({
            query: (pubkey: string) => ({method: 'GET', url: `/users/${pubkey}`}),
            transformResponse: (response: UserResponse) => <User>transformer(response),
            invalidatesTags: (_result, _error, pubkey) => [{type: 'User', pubkey}]
        }),
        createUser: builder.mutation<User, UserPayload>({
            query: (payload: UserPayload) => ({method: 'POST', url: '/users', body: payload}),
            transformResponse: (response: UserResponse) => <User>transformer(response),
            invalidatesTags: [{type: 'User', id: 'USER_LIST'}]
        }),
    }),
    overrideExisting: false
})

export default userApi
