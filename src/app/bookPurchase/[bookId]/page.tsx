"use client"

import { Box, Container, Heading, Stack } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import PurchaseButton from "@/components/purchaseButton"
import { Voicecontent } from "@/components/voice/voicecontent"
import MyHeader from "@/components/myHeader"
import { useEffect, useState } from "react"
import bookRepository, { Book } from "@/repositories/bookRepository"
import { Voice } from "@/repositories/audioRepository"
import userRepository, { User } from "@/repositories/userRepository"
import { useRouter } from "next/navigation"

const Page = ({ params }: { params: { bookId : string }}) => {
    const router = useRouter()
    const blackData : Book = {
        id: "",
        name: "",
        contents: "",
        price: 0,
        index: 1,
        voiceList: [],
        ISBNcode: "",
        thumbnailUrl: "",
        author: ""
    }
    const [user, setUser] = useState<User>();
    const [book, setBook] = useState<Book>(blackData);
    const [voices, setVoices] = useState<Voice[]>([])

    useEffect(() =>{
        async function fetchData() {
            const _book = await bookRepository.getBook(params.bookId)
            console.log(_book)
            setBook(_book)
            const _voices = await bookRepository.getVoices(_book.id)
            setVoices(_voices)
            //TODO user直打ち修正
            const _user = await userRepository.getUser("VU6f3bKr2EeHvfvfExIp6V90ojR2")
            console.log(_user)
            setUser(_user)
        }
        fetchData()
    }, [])

    const onClickBuyBook = async () => {
        /* 書籍を購入する操作に書き換える。書籍のidか何かを変数に渡す？ */
        try {
            if (user === undefined) {
                console.log("please signin.")
                throw Error("not authenticated")
            }
            const result = await userRepository.buyBook(user.id, book.id, book.price)
            alert("書籍が購入されました。")
            router.push(`/bookPurchaseComplete/${book.id}`)
        }
        catch (error) {
            alert("書籍の購入が完了しませんでした...")
        }
    }
    const onClickBuyVoice = async(voice : Voice) => {
        /* 音声を購入する操作に書き換える。各音声のidが何かを変数に渡す？ */
        try {
            if (user === undefined) {
                console.log("please signin.")
                throw Error("not authenticated")
            }
            const result = await userRepository.buyVoice(user.id, book.id, voice.id, book.price)
            alert("音声が購入されました。")
        }
        catch (error) {
            alert("音声の購入が完了しませんでした...")
        }
    }

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Container maxW={"9xl"}>
                <Heading >
                    書籍情報
                </Heading>
                <Stack direction={"row"} align={"center"}>
                    <Bookcontent book={book!}/>
                    /* 購入済みならボタンを押せないorビューワーに飛ばすボタンにする。 */
                    <PurchaseButton onClick={onClickBuyBook} />
                </Stack>
                <Box mt={"5"}>
                    <Heading >
                        投稿音声一覧
                    </Heading>
                    <Stack direction={"column"} align={"center"}>
                        {voices.map((voice) => {
                            return(
                                <Stack direction={"row"} align={"center"} w={"100%"} key={voice.id}>
                                    <Voicecontent voice={voice}/>
                                    /* その本を購入していなければボタンを押せないようにする。 */
                                    <PurchaseButton onClick={() => {onClickBuyVoice(voice)}} />
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