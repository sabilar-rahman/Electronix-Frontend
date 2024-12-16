import { getBaseURL } from "@/utils/getBaseURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/${email}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (OrderId) => ({
        url: `/order/${OrderId}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    })
  }),
});
export const { useGetOrdersByEmailQuery , useGetOrderByIdQuery} = ordersApi;

export default ordersApi;