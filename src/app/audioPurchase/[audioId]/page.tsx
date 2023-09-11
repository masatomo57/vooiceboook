"use client"

import { Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { Voicecontent } from "@/components/voice/voicecontent"
import PurchaseButton from "@/components/purchaseButton"
import { Bookdata } from "@/lib/type"


const AudioPurchase = ({ params }: { params: { audioId : string }}) => {
    const book: Bookdata = {
        id: "onepiece1",
        imageUrl: "test",
        title: "ワンピース第1巻",
        price: 500,
        author: "おだえいいちろう"
    }
    const voice: Voicedata = {
        imageUrl: "test",
        title: "ルフィボイス1",
        price: 500,
        userName: "田中真弓",
        userId: "test"
    }
    const onClick = () => {
        alert("音声が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <Bookcontent id={book.id} imageUrl={book.imageUrl} title={book.title} price={book.price} author={book.author} />
            <Stack direction={"row"}>
                <Voicecontent imageUrl={voice.imageUrl} title={voice.title} price={voice.price} userName={voice.userName} userId={voice.userId} />
                <PurchaseButton onClick={onClick} />
            </Stack>
            <Stack direction={"row"}>
                <PlaySample voiceUrl={voiceUr}/>
            </Stack>
        </Stack>
    )
}

export default AudioPurchase