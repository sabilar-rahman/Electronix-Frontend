import { getBaseURL } from "@/utils/getBaseURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/stats`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: (email) => `/user-stats/${email}`,
      providesTags: ["Stats"],
    }),
    getAdminStats: builder.query({
      query: () => `/admin-stats`,
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetAdminStatsQuery } = statsApi;

export default statsApi;