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
    }),
    // Get all orders
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Order"],
    }),
    // Update order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/update-order/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order",],
    }),

    // Delete order by ID
    deleteOrderById: builder.mutation({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),



  }),

});
export const {
  useGetOrdersByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderByIdMutation


} = ordersApi;

export default ordersApi;