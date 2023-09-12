"use client"

import { Box, Container, Heading, Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import PurchaseButton from "@/components/purchaseButton"
import Voicecontentlist, { Voicecontent } from "@/components/voice/voicecontent"
import { bookDummy } from "@/lib/dummy"
import MyHeader from "@/components/myHeader"

const Page = ({ params }: { params: { bookId : string }}) => {
    /* params.bookIdに対応する書籍をとってくる */
    const book = bookDummy[0]
    const voiceList = book.voiceList

    const onClick = () => {
        /* 書籍を購入する操作に書き換える。書籍のidか何かを変数に渡す？ */
        alert("書籍が購入されました。")
    }
    const onClickVoice = () => {
        /* 音声を購入する操作に書き換える。各音声のidが何かを変数に渡す？ */
        alert("音声が購入されました。")
    }

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Container maxW={"9xl"}>
                <Heading >
                    書籍情報
                </Heading>
                <Stack direction={"row"} align={"center"}>
                    <Bookcontent book={book}/>
                    /* 購入済みならボタンを押せないorビューワーに飛ばすボタンにする。 */
                    <PurchaseButton onClick={onClick} />
                </Stack>
                <Box mt={"5"}>
                    <Heading >
                        投稿音声一覧
                    </Heading>
                    <Stack direction={"column"} align={"center"}>
                        {voiceList.map((voice) => {
                            return(
                                <Stack direction={"row"} align={"center"} w={"100%"}>
                                    <Voicecontent voice={voice}/>
                                    /* その本を購入していなければボタンを押せないようにする。 */
                                    <PurchaseButton onClick={onClickVoice} />
                                </Stack>
                            )
                        })}
                    </Stack>
                </Box>
            </Container>
        </Stack>
    )
}

export default Page