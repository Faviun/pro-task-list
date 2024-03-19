import {apiSlice} from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/signin',
                method: 'POST',
                body: {...credentials}
            }),
        }),
        getTasks: builder.mutation({
            query: (credentials = 'PENDING') => ({
                url: `/tasks?page=0&size=10&filter=${credentials}`,
                method: 'GET',
            })
        })
    })
})

// @ts-ignore
export const {useLoginMutation, useGetTasksMutation} = authApiSlice;