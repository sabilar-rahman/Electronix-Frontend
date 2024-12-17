import { getBaseURL } from "@/utils/getBaseURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewsApi = createApi({
    reducerPath: "reviewsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/reviews`,
        credentials: "include",
    }),
    tagTypes: ["Reviews"],
    endpoints: (builder) => ({
        getReviewById: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: "GET",
            }),
            providesTags: (result) => result ? [{ type: "Reviews", id: result[0]?.email }] : [],
        }),

        getReviewCount: builder.query({
            query: () => ({
                url: `/total-reviews`,
                method: "GET",
            }),
            providesTags: ["Reviews"],
        }),

        postReview: builder.mutation({
            query: (reviewData) => ({
                url: "/post-review",
                method: "POST",
                body: reviewData,
                credentials: "include",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Reviews", id }],
        }),
    }),
});

export const { useGetReviewByIdQuery, useGetReviewCountQuery, usePostReviewMutation } = reviewsApi;

export default reviewsApi;
