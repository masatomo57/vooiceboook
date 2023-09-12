"use client"

import { testUserId } from "@/lib/dummy";
import voiceRepository, { Voice } from "@/repositories/audioRepository";
import userRepository, { User } from "@/repositories/userRepository";
import { Box, Container, Stack } from "@chakra-ui/layout"
import { useState, useEffect } from "react"
import ReactSelect from "react-select";

export default function Page({ params }: { params: { bookId : string }}) {
  const [user, setUser] = useState<User>({} as User)
  const [voice, setVoice] = useState<Voice>({} as Voice)
  const [voices, setVoices] = useState<Voice[]>([])
  const [options, setOptions] = useState([{"value": {}, "label": ""}])

  useEffect(() =>{
    async function fetchData() {
        const _user = await userRepository.getUser(testUserId) // (Dummy) testUserId
        const voiceIds = _user.bookList[params.bookId]
        const _voices = await voiceRepository.searchVoices(voiceIds)

        const _options = _voices.map((obj) => {return {value: obj, label: obj.name}})
        setOptions(_options)
    }
    fetchData()
  }, [])

  const handleChange = (e: any) => {
    const voice = e.value as Voice
    console.log(voice)
    setVoice(voice)
    console.log(voice.url)
    const audio = new Audio(e.value.url)
    audio.play()
    alert("ここで音を鳴らす")
  }

  return (
    <Stack width="100%">
      <Container maxW={"9xl"}>
        <Stack align={"center"}>
          <Box width={"100%"}>
            <ReactSelect
                id='title'
                options={options}
                onChange={handleChange}
            />
          </Box>
        </Stack>
      </Container>
    </Stack>
  )
}
