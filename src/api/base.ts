import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BaseQueryApi} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import constants from "@/constants";

const prepareHeaders = (headers: Headers, _queryApi: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>) => {
    headers.set('Accept', `application/json`)
    headers.set('Content-Type', `application/json`)
    return headers
}

const baseQuery = fetchBaseQuery({
    baseUrl: constants.API_BASE_URL,
    prepareHeaders
})

const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['User'],
    baseQuery: baseQuery,
    endpoints: builder => ({}),
})

export default baseApi