"use client"

import { Box, Container, Heading, Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { Voicecontent } from "@/components/voice/voicecontent"
import PurchaseButton from "@/components/purchaseButton"
import PlayVoice from "@/components/voice/playVoice"
import { useEffect, useState } from "react"
import userRepository, { User } from "@/repositories/userRepository"
import bookRepository, { Book } from "@/repositories/bookRepository"
import voiceRepository, { Voice } from "@/repositories/audioRepository"
import { useRouter } from "next/navigation"
import { testUserId } from "@/lib/dummy"

const AudioPurchase = ({ params }: { params: { audioId : string }}) => {
    const router = useRouter()

    const [user, setUser] = useState<User>();
    const [book, setBook] = useState<Book>({} as Book);
    const [voice, setVoices] = useState<Voice>({} as Voice)
    const userId = testUserId // (Dummy) testUserId

    useEffect(() =>{
        async function fetchData() {
            const _voice = await voiceRepository.getVoice(params.audioId)
            const _book = await bookRepository.getBook(_voice.bookId)
            const _user = await userRepository.getUser(userId)

            setBook(_book)
            setVoices(_voice)
            setUser(_user)
        }
        fetchData()
    }, [])

    const onClick = async() => {
        if (user === undefined) {
            throw Error("user is undefined. please signin")
        }
        userRepository.buyVoice(user.id, book.id, voice.id, voice.price)
    }

    return (
        <Stack direction={"column"}>
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