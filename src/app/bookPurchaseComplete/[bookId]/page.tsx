"use client"

import { Stack, Text, Link } from "@chakra-ui/layout"
import { Bookcontent } from "@/components/book/bookcontent"

type Bookdata = {
    id: string
    title: string
    contents?: string
    voiceList?: any[]
    author: string
    index?: number
    thumbnailUrl: string
    ISBNcode?: string
    price: number
}

const book: Bookdata = {
    id: "juju1",
    title:'呪術廻戦1',
    contents:'ジャンプコミックです。',
    voiceList:[],
    author:'芥見下下',
    index:1,
    thumbnailUrl: "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxM[…]tZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60",
    price: 500
}

const BookPurchaseComplete = ({ params }: { params: { bookId : string }}) => {
    return (
        <Stack direction={"column"}>
            <Bookcontent id={book.id} thumbnailUrl={book.thumbnailUrl} title={book.title} price={book.price} author={book.author} />
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