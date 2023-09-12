import MyHeader from "@/components/myHeader"
import Bookcontentlist from "@/components/book/bookcontent"
import { Container, Heading, Stack } from "@chakra-ui/layout"
import { bookDummy } from "@/lib/dummy"

const Page = () => {
    /* 書籍のリストを全てとってくる操作 */
    const books = bookDummy
    
    return (
        <Stack direction={"column"}>
            <MyHeader />
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