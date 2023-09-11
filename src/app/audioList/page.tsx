import MyHeader from "@/components/myHeader"
import Voicecontentlist from "@/components/voice/voicecontent"
import { Stack } from "@chakra-ui/layout"

type Bookdata = {
    id: string
    title: string
    contents?: string
    voiceList?: any[]
    author: string
    index?: number
    thumbnailUrl: string
    ISBNcode?: string
    price: number
}

const books: Bookdata[] = [{
    id: "juju1",
    title:'呪術廻戦1',
    contents:'ジャンプコミックです。',
    voiceList:[],
    author:'芥見下下',
    index:1,
    thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxM[…]tZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 500
},{
    id: "juju2",
    title:'呪術廻戦2',
    contents:'ジャンプコミックです。',
    voiceList:[],
    author:'芥見下下',
    index:2,
    thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxM[…]tZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 500
}
]

const Page = () => {
    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Voicecontentlist datalist={} />
        </Stack>
    )
}

export default Page