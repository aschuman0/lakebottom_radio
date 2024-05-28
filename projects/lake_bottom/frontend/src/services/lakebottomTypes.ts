export interface Song {
  title: string
  artist: string
  album: string
  year: string
  genre: string
  notes: string
  slug: string
}
export interface ShowSong extends Song {
  order: number
}

export interface Show {
  slug: string
  name: string
  about: string
  date_created: string
  published: boolean
}

export interface ShowDetail extends Show {
  songs: ShowSong[]
}

export interface Page {
  title: string
  page_body: string
  last_updated: string
  page_name: string
}

export interface Live {
  name: string
  heading: string
  subheading: string
  is_live: boolean
}

export interface AccessToken {
  access: string
}
export interface AccessTokenWithRefresh extends AccessToken {
  refresh: string
}
