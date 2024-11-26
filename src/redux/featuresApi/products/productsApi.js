import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (category, color, minPrice, maxPrice, page = 1, limit = 10) => {
                const queryParam = new URLSearchParams({
                    category: category || "",
                    color: color || "",
                    minPrice: minPrice || "",
                    maxPrice: maxPrice || "",
                    page: page.toString,
                    limit: limit.toString,
                })
                return`/?${queryParam}`

            }
        }),
    }),

})

export const { useGetAllProductsQuery} = productsApi

export default productsApi;