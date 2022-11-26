export type History = {
  title: string
  data: HistoryData[]
}

export type HistoryData = {
  id: number
  name: string
  group: string
  hour: string
}
