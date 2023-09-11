"use client"

import { Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { Voicecontent } from "@/components/voice/voicecontent"
import PurchaseButton from "@/components/purchaseButton"

type Bookdata = {
    id: string
    title: string
    contents?: string
    voiceList: []
    author: string
    index?: number
    imageUrl: string
    ISBNcode?: string
    price: number
}

const AudioPurchase = ({ params }: { params: { bookId : string }}) => {
    const book: Bookdata = {
        id: "test",
        title: "アオのハコ第1巻",
        voiceList: [],
        author: "三浦糀",
        imageUrl: "test",
        price: 500
    }

    const onClick = () => {
        alert("書籍が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <Voicecontent imageUrl={book.imageUrl} title={book.title} price={book.price} userName={book.author} userId={book.id} />
            <Stack direction={"row"}>
                <PurchaseButton onClick={onClick} />
            </Stack>
        </Stack>
    )
}

export default AudioPurchase