"use client"

import { Box, Container, Heading, Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { Voicecontent } from "@/components/voice/voicecontent"
import PurchaseButton from "@/components/purchaseButton"
import PlayVoice from "@/components/voice/playVoice"
import { bookDummy } from "@/lib/dummy"
import MyHeader from "@/components/myHeader"

const AudioPurchase = ({ params }: { params: { audioId : string }}) => {
    /* params.audioIdに対し音声作品をとってくる操作 */
    const book = bookDummy[0]
    const voice = book.voiceList[0]

    const onClick = () => {
        /* 音声を購入する操作に書き換える。*/
        alert("音声が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Container maxW={"9xl"}>
                <Heading >
                    書籍情報
                </Heading>
                <Bookcontent book={book} />
                <Box mt={"5"}>
                    <Heading >
                        音声情報
                    </Heading>
                    <Stack direction={"row"} align={"center"}>
                        <Voicecontent voice={voice} />
                        /* すでに音声を購入していればボタンを押せないorビューワーページに飛ばすボタンにする */
                        <PurchaseButton onClick={onClick} />
                    </Stack>
                </Box>
                <Stack direction={"row"} mt="2">
                    <PlayVoice voiceUrl={voice.url} />
                </Stack>
            </Container>
        </Stack>
    )
}

export default AudioPurchase