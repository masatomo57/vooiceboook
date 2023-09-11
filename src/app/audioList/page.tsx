import MyHeader from "@/components/myHeader"
import Voicecontentlist from "@/components/voice/voicecontent"
import { voiceDummy } from "@/lib/dummy"
import { Stack } from "@chakra-ui/layout"

const Page = () => {
    const voice = voiceDummy

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Voicecontentlist voiceList={voice} />
        </Stack>
    )
}

export default Page