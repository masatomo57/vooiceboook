"use client"

import MyHeader from "@/components/myHeader"
import { bookDummy, voiceDummy } from "@/lib/dummy";
import { Box, Container, Stack } from "@chakra-ui/layout"
import { Select, useDisclosure } from "@chakra-ui/react";
import { useState } from "react"

export default function Page({ params }: { params: { bookId : string }}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const book = bookDummy[0]
  const voiceList = book.voiceList
  const [selectVoice, setSelectVoice] = useState("")

  return (
    <Stack width="100%">
      <MyHeader />
      <Container maxW={"9xl"}>
        <Stack align={"center"} >
        <Box>
          {selectVoice}
        </Box>
        <Select placeholder='音声を選択してください。'>
          {voiceList.map((voice) => {
            return <option value={voice.name} onChange={() => {setSelectVoice(voice.name)}}>{voice.name}</option>
          })}
        </Select>
        </Stack>
      </Container>
    </Stack>
  )
}
