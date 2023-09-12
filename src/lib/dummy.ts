export type BookType = {
    id: string
    title: string
    contents: string
    voiceList: VoiceType[]
    author: string
    index: number
    thumbnailUrl: string
    ISBNcode: string
    price: number
}

export type VoiceType = {
    id: string
    bookId: string
    name: string
    price: number
    url: string
    userId: string
    userName: string
    thumbnailUrl: string
}

export type UserType = {
    id: string
    name: string
    email: string
    money: number
}

export const voiceDummy: VoiceType[] = [
    {
        id: "chinatu",
        thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        name: "千夏ちゃん",
        price: 300,
        userName: "まさ",
        userId: "test",
        bookId: "aohako",
        url: ""
    }, {
        id: "hina",
        thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
        name: "ひなちゃん",
        price: 300,
        userName: "まさ",
        userId: "test",
        bookId: "aohako",
        url: ""
    }
]

export const bookDummy: BookType[] = [{
    id: "aohako1",
    title: "アオのハコ第1巻",
    contents: "",
    voiceList: voiceDummy,
    author: "三浦糀",
    index: 1,
    thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    ISBNcode: "",
    price: 500
},{
    id: "aohako2",
    title: "アオのハコ第2巻",
    contents: "",
    voiceList: voiceDummy,
    author: "三浦糀",
    index: 2,
    thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    ISBNcode: "",
    price: 500
}]

export const testUserId = "40108899-dd6c-4d21-a11d-f60c4b873854"