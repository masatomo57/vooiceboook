"use client"
import { useEffect, useState } from 'react'
import MyHeader from "@/components/myHeader"
import Bookcontentlist from "@/components/book/bookcontent"
import { Container, Heading, Stack } from "@chakra-ui/layout"
import { bookDummy } from "@/lib/dummy"
import bookRepository, { Book } from "@/repositories/bookRepository"

const Page = () => {
    const [books, setBooks] = useState<Book[]>([]);
    useEffect(() =>{
        async function fetchData() {
            const _books = await bookRepository.getBooks();
            setBooks(_books)
        }
        fetchData()
    }, [])
    
    return (
        <Stack direction={"column"}>
            <Container maxW={"9xl"}>
                <Heading>
                    書籍一覧
                </Heading>
                <Bookcontentlist bookList={books}/>
            </Container>
        </Stack>
    )
}

export default Page