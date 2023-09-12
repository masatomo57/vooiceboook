"use client"

import { Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import PurchaseButton from "@/components/purchaseButton"
import Voicecontentlist from "@/components/voice/voicecontent"
import { bookDummy } from "@/lib/dummy"
import MyHeader from "@/components/myHeader"

const Page = ({ params }: { params: { bookId : string }}) => {
    const book = bookDummy[0]
    const voiceList = book.voiceList

    const onClick = () => {
        alert("書籍が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Bookcontent book={book}/>
            <Stack direction={"row"}>
                <PurchaseButton onClick={onClick} />
                <Voicecontentlist voiceList={voiceList}/>
            </Stack>
        </Stack>
    )
}

export default Page