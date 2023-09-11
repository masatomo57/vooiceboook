export type Bookdata = {
    id: string
    title: string
    contents?: string
    voiceList?: VoiceType[]
    author: string
    index?: number
    thumbnailUrl: string
    ISBNcode?: string
    price: number
}

export type VoiceType = {
    bookId: string
    id: string
    name: string
    price: number
    url: string
    userId: string
    userName: string
    thumbnailUrl: string
}