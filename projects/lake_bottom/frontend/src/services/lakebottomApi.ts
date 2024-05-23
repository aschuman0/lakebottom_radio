import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShowSong, Show, Song, Live, Page } from "./lakebottomTypes";

export const lakebottomApi = createApi({
  reducerPath: "lakebottomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["show", "page", "live"],
  endpoints: (builder) => ({
    getShowList: builder.query<Show[], void>({
      query: () => "shows",
    }),
  }),
});

export const { useGetShowListQuery } = lakebottomApi;
