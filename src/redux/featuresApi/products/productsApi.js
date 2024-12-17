import { getBaseURL } from "@/utils/getBaseURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/products`,
        credentials: "include",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: ({category, color, minPrice, maxPrice, page = 1, limit = 10}) => {
                const queryParams = new URLSearchParams({
                    category: category || "",
                    color: color || "",
                    minPrice: minPrice || "",
                    maxPrice: maxPrice || "",
                    page: page.toString(),
                    limit: limit.toString(),
                });
                return `/?${queryParams}`;
            },
            providesTags: ["Products"],
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{
                type: "Products", id
            }], // there need to be change
        }),
        AddProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
                credentials: "include",
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation({
            query: (id, updateProduct) => ({
                url: `/update-product/${id}`,
                method: "PATCH",
                body: updateProduct,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/delete-product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{
                type: "Products", id
            }],
        })
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,

} = productsApi;

export default productsApi;
