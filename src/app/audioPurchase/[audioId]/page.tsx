"use client"

import { Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { Voicecontent } from "@/components/voice/voicecontent"
import PurchaseButton from "@/components/purchaseButton"
import PlayVoice from "@/components/voice/playVoice"
import { bookDummy } from "@/lib/dummy"
import MyHeader from "@/components/myHeader"

const AudioPurchase = ({ params }: { params: { audioId : string }}) => {
    const book = bookDummy[0]
    const voice = book.voiceList[0]

    const onClick = () => {
        alert("音声が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Bookcontent book={book} />
            <Stack direction={"row"}>
                <Voicecontent voice={voice}/>
                <PurchaseButton onClick={onClick} />
            </Stack>
            <Stack direction={"row"}>
                <PlayVoice voiceUrl={voice.url}/>
            </Stack>
        </Stack>
    )
}

export default AudioPurchase