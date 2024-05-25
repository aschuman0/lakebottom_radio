import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Show, ShowDetail, Live, Page } from "./lakebottomTypes";

import {
  getLiveList,
  getPageById,
  getPageList,
  getShowDetail,
  getShowList,
} from "./lakebottomClients";

export const lakebottomApi = createApi({
  reducerPath: "lakebottomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["show", "pageContent"],
  endpoints: (build) => ({
    getShowList: build.query<Show[], void>({
      queryFn: async () => {
        try {
          const data = await getShowList();
          return { data };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["show"],
    }),
    getShowDetail: build.query<ShowDetail, string>({
      queryFn: async (id: string) => {
        try {
          const data = await getShowDetail(id);
          return { data };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["show"],
    }),
    getPageList: build.query<Page[], void>({
      queryFn: async () => {
        try {
          const data = await getPageList();
          return { data };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["pageContent"],
    }),
    getPageWithId: build.query<Page, string>({
      queryFn: async (id: string) => {
        try {
          const data = await getPageById(id);
          return { data };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["pageContent"],
    }),
    getLiveList: build.query<Live[], void>({
      queryFn: async () => {
        try {
          const data = await getLiveList();
          return { data };
        } catch (err) {
          throw err;
        }
      },
      providesTags: ["pageContent"],
    }),
  }),
});

export const {
  useGetShowListQuery,
  useGetPageListQuery,
  useGetLiveListQuery,
  useGetShowDetailQuery,
  useGetPageWithIdQuery,
} = lakebottomApi;
