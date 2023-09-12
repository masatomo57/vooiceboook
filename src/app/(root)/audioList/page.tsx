"use client"

import Voicecontentlist from "@/components/voice/voicecontent"
import voiceRepository, { Voice } from "@/repositories/audioRepository"
import { Container, Heading, Stack } from "@chakra-ui/layout"
import { useEffect, useState } from "react"

const Page = () => {
    const [voices, setVoices] = useState<Voice[]>([]);

    useEffect(() =>{
        async function fetchData() {
            const _voices = await voiceRepository.getVoices();
            setVoices(_voices)
        }
        fetchData()
    }, [])

    return (
        <Stack direction={"column"}>
            <Container maxW={"9xl"}>
                <Heading>
                    音声一覧
                </Heading>
                <Voicecontentlist voiceList={voices} />
            </Container>
        </Stack>
    )
}

export default Page