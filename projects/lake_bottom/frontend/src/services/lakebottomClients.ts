import { axiosInstance as axiosWithAuth } from "./loginApi"
import axios from "axios"
import {
  Show,
  ShowDetail,
  ShowCreate,
  Page,
  Live,
  LiveShoutcastInfo,
} from "./lakebottomTypes"

export async function getShowList(): Promise<Show[]> {
  const response = await axiosWithAuth.get("/api/show/")
  return response.data
}

export async function getShowDetail(id: string): Promise<ShowDetail> {
  const response = await axiosWithAuth.get(`/api/show_detail/${id}/`)
  return response.data
}

export async function getPageList(): Promise<Page[]> {
  const response = await axiosWithAuth.get("/api/page/")
  return response.data
}

export async function getPageById(id: string): Promise<Page> {
  const response = await axiosWithAuth.get(`/api/page/${id}/`)
  return response.data
}

export async function getLiveList(): Promise<Live[]> {
  const response = await axiosWithAuth.get(`/api/live/`)
  return response.data
}

export async function putPageList(page: Page): Promise<void> {
  const response = await axiosWithAuth.put(`/api/page/${page.page_name}/`, {
    ...page,
  })
  return response.data
}

export async function putLiveList(live: Live): Promise<void> {
  const response = await axiosWithAuth.put(`/api/live/${live.name}/`, {
    ...live,
  })
  return response.data
}

export async function putShow(show: Show): Promise<void> {
  const response = await axiosWithAuth.put(`/api/show/${show.slug}/`, {
    ...show,
  })
  return response.data
}

export async function postShow(show: FormData): Promise<void> {
  const response = await axiosWithAuth.post("/api/show/", show, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data
}

export async function getStreamInfo(): Promise<LiveShoutcastInfo> {
  const response = await axios.get("http://35.227.60.131:8000/stats?json=1", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return response.data
}
