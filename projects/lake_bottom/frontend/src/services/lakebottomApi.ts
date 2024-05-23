import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Show, Song, Live, Page } from "./lakebottomTypes";

export const lakebottomApi = createApi({
  reducerPath: "lakebottomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["show", "pageContent"],
  endpoints: (builder) => ({
    getShowList: builder.query<Show[], void>({
      query: () => "show/",
      providesTags: ["show"],
    }),
    getPageList: builder.query<Page[], void>({
      query: () => "page/",
      providesTags: ["pageContent"],
    }),
    getLiveList: builder.query<Live[], void>({
      query: () => "live/",
      providesTags: ["pageContent"],
    }),
  }),
});

export const { useGetShowListQuery, useGetPageListQuery, useGetLiveListQuery } =
  lakebottomApi;
