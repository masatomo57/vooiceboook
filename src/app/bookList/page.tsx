import MyHeader from "@/components/myHeader"
import Bookcontentlist from "@/components/book/bookcontent"
import { Stack } from "@chakra-ui/layout"
import { bookDummy } from "@/lib/dummy"

const Page = () => {
    const books = bookDummy
    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Bookcontentlist bookList={books}/>
        </Stack>
    )
}

export default Page