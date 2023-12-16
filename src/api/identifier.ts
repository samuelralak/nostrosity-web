import baseApi from "@/api/base";
import {Identifier, ListResponse} from "@/resources/user";
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
    }),
    overrideExisting: false
})

export const {useFetchIdentifiersQuery} = identifierApi
export default identifierApi
