import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  Show,
  ShowDetail,
  Live,
  Page,
  LiveShoutcastInfo,
} from "./lakebottomTypes"

import {
  getLiveList,
  getPageById,
  getPageList,
  getShowDetail,
  getShowList,
  getStreamInfo,
  postShow,
  putLiveList,
  putPageList,
  putShow,
} from "./lakebottomClients"

export const lakebottomApi = createApi({
  reducerPath: "lakebottomApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["show", "pageContent"],
  endpoints: (build) => ({
    getShowList: build.query<Show[], void>({
      queryFn: async () => {
        try {
          const data = await getShowList()
          return { data }
        } catch (err) {
          throw err
        }
      },
      providesTags: ["show"],
    }),
    getShowDetail: build.query<ShowDetail, string>({
      queryFn: async (id: string) => {
        try {
          const data = await getShowDetail(id)
          return { data }
        } catch (err) {
          throw err
        }
      },
      providesTags: ["show"],
    }),
    getPageList: build.query<Page[], void>({
      queryFn: async () => {
        try {
          const data = await getPageList()
          return { data }
        } catch (err) {
          throw err
        }
      },
      providesTags: ["pageContent"],
    }),
    getPageWithId: build.query<Page, string>({
      queryFn: async (id: string) => {
        try {
          const data = await getPageById(id)
          return { data }
        } catch (err) {
          throw err
        }
      },
      providesTags: ["pageContent"],
    }),
    getLiveList: build.query<Live[], void>({
      queryFn: async () => {
        try {
          const data = await getLiveList()
          return { data }
        } catch (err) {
          throw err
        }
      },
      providesTags: ["pageContent"],
    }),
    putPageList: build.mutation<void, Page>({
      queryFn: async (page) => {
        try {
          const data = await putPageList(page)
          return { data }
        } catch (err) {
          throw err
        }
      },
      invalidatesTags: ["pageContent"],
    }),
    putLiveList: build.mutation<void, Live>({
      queryFn: async (live) => {
        try {
          const data = await putLiveList(live)
          return { data }
        } catch (err) {
          throw err
        }
      },
      invalidatesTags: ["pageContent"],
    }),
    putShow: build.mutation<void, Show>({
      queryFn: async (show) => {
        try {
          const data = await putShow(show)
          return { data }
        } catch (err) {
          throw err
        }
      },
      invalidatesTags: ["show"],
    }),
    postShow: build.mutation<void, FormData>({
      queryFn: async (show) => {
        try {
          const data = await postShow(show)
          return { data }
        } catch (err) {
          throw err
        }
      },
      invalidatesTags: ["show"],
    }),
    getStreamInfo: build.query<LiveShoutcastInfo, void>({
      queryFn: async () => {
        try {
          const data = await getStreamInfo()
          return { data }
        } catch (err) {
          throw err
        }
      },
    }),
  }),
})

export const {
  useGetShowListQuery,
  useGetPageListQuery,
  useGetLiveListQuery,
  useGetShowDetailQuery,
  useGetPageWithIdQuery,
  usePutPageListMutation,
  usePutLiveListMutation,
  usePutShowMutation,
  usePostShowMutation,
  useGetStreamInfoQuery,
} = lakebottomApi
