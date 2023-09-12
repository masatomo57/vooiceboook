"use client"

import { Stack, Text, Link, Container, Heading } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { useEffect, useState } from "react"
import bookRepository, { Book } from "@/repositories/bookRepository"

const BookPurchaseComplete = ({ params }: { params: { bookId : string }}) => {
    const [book, setBook] = useState<Book>({} as Book)
    
    useEffect(() => {
        async function fetchData () {
            const _book = await bookRepository.getBook(params.bookId)
            setBook(_book)
        }
        fetchData()
    }, [])

    return (
        <Stack direction={"column"}>
            <Container maxW={"9xl"}>
                <Heading mb={"5"}>
                    ご購入ありがとうございました。
                </Heading>
                <Bookcontent book={book}/>
                <Stack direction={"row"} mt={"3"}>
                        <Link href={`/bookPurchase/${book.id}`}>音声を見てみる</Link>
                        <Link href={`/viewer/${book.id}`}>買った書籍を読む</Link>
                </Stack>
            </Container>
        </Stack>
    )
}

export default BookPurchaseComplete