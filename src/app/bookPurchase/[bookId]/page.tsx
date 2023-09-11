"use client"

import { Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import PurchaseButton from "@/components/purchaseButton"
import Voicecontentlist from "@/components/voice/voicecontent"
import { Bookdata } from "@/lib/type"

const Page = ({ params }: { params: { bookId : string }}) => {
    const book: Bookdata = {
        id: "test",
        title: "アオのハコ第1巻",
        voiceList: [
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
        ],
        author: "三浦糀",
        thumbnailUrl: "test",
        price: 500
    }

    const onClick = () => {
        alert("書籍が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <Bookcontent id={book.id} thumbnailUrl={book.thumbnailUrl} title={book.title} price={book.price} author={book.author} />
            <Stack direction={"row"}>
                <PurchaseButton onClick={onClick} />
                <Voicecontentlist datalist={book.voiceList}/>
            </Stack>
        </Stack>
    )
}

export default Page