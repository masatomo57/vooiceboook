import MyHeader from "@/components/myHeader"
import Voicecontentlist from "@/components/voice/voicecontent"
import { voiceDummy } from "@/lib/dummy"
import { Container, Heading, Stack } from "@chakra-ui/layout"

const Page = () => {
    /* 音声作品全てのリストをとってくる操作（並びをランダムとかにした方がいい？） */
    const voice = voiceDummy

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <Container maxW={"9xl"}>
                <Heading>
                    音声一覧
                </Heading>
                <Voicecontentlist voiceList={voice} />
            </Container>
        </Stack>
    )
}

export default Page