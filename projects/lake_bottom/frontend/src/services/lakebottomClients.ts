import { axiosInstance as axios } from "./loginApi"
import { Show, ShowDetail, Page, Live } from "./lakebottomTypes"

export async function getShowList(): Promise<Show[]> {
  const response = await axios.get("/api/show/")
  return response.data
}

export async function getShowDetail(id: string): Promise<ShowDetail> {
  const response = await axios.get(`/api/show_detail/${id}/`)
  return response.data
}

export async function getPageList(): Promise<Page[]> {
  const response = await axios.get("/api/page/")
  return response.data
}

export async function getPageById(id: string): Promise<Page> {
  const response = await axios.get(`/api/page/${id}/`)
  return response.data
}

export async function getLiveList(): Promise<Live[]> {
  const response = await axios.get(`/api/live/`)
  return response.data
}

export async function putPageList(page: Page): Promise<void> {
  const response = await axios.put(`/api/page/${page.page_name}/`, { ...page })
  return response.data
}

export async function putLiveList(live: Live): Promise<void> {
  const response = await axios.put(`/api/live/${live.name}/`, { ...live })
  return response.data
}

export async function putShow(show: Show): Promise<void> {
  const response = await axios.put(`/api/show/${show.slug}/`, { ...show })
  return response.data
}
