"use client"

import { Stack, Text, Link } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"
import { bookDummy } from "@/lib/dummy"

const BookPurchaseComplete = ({ params }: { params: { bookId : string }}) => {
    /* params.bookIdに対し書籍をとってくる */
    const book = bookDummy[0]

    return (
        <Stack direction={"column"}>
            <Bookcontent book={book}/>
            <Stack direction={"row"}>
                <Text>
                    ご購入ありがとうございました。
                </Text>
                <Stack direction={"column"}>
                    <Link href={`/bookPurchase/${book.id}`}>音声を見てみる</Link>
                    <Link href={`/viewer/${book.id}`}>買った書籍を読む</Link>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default BookPurchaseComplete