import baseApi from "@/api/base";
import {Identifier, ListResponse, ObjectResponse, User} from "@/resources/user";
import {transformer} from "@/utils";

const identifierApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchIdentifiers: builder.query<Identifier[], void>({
            query: () => ({method: 'GET', url: '/identifiers'}),
            transformResponse: (response: ListResponse) => response.data.map((record) => <Identifier>transformer(record)),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({id}) => ({type: 'Identifier' as const, id})), 'Identifier']
                    : ['Identifier'],
        }),
        addIdentifier: builder.mutation<Identifier, { name: string }>({
            query: (body) => ({
                url: `/identifiers`, method: 'POST', body: {identifier: body}
            }),
            transformResponse: (response: ObjectResponse) => <Identifier>transformer(response),
            invalidatesTags: [{type: 'Identifier', id: 'IDENTIFIER_LIST'}]
        }),
        setDefaultIdentifier: builder.mutation<Identifier, { id: string; default: boolean }>({
            query: ({id, ...rest}) => ({
                url: `/identifiers/${id}`, method: 'PUT', body: {identifier: {...rest}}
            }),
            transformResponse: (response: ObjectResponse) => <Identifier>transformer(response),
            invalidatesTags: (result, error, {id}) => [{ type: 'Identifier', id }]
        }),
    }),
    overrideExisting: false
})

export const {useFetchIdentifiersQuery, useSetDefaultIdentifierMutation, useAddIdentifierMutation} = identifierApi
export default identifierApi
