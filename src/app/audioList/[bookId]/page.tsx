import MyHeader from "@/components/myHeader"
import Voicecontentlist from "@/components/voice/voicecontent"
import { bookDummy } from "@/lib/dummy"
import { Stack } from "@chakra-ui/layout"

const Page = ({ params }: { params: { bookId : string }}) => {
    const book = bookDummy[0]
    const voiceList = book.voiceList

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Voicecontentlist voiceList={voiceList} />
        </Stack>
    )
}

export default Page