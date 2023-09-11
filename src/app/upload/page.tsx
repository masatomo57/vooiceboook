"use client"
import { useState } from 'react'
import { Center, Button, CircularProgress, CircularProgressLabel } from "@chakra-ui/react"
import { Stack } from "@chakra-ui/layout"
import MyHeader from "@/components/myHeader"
import { SingleFileDropZone } from '@/components/SingleFileDropZone'
import voiceRepository from '@/repositories/audioRepository'
import userRepository from '@/repositories/userRepository'

type UploadPageProps = {
    isSampleVoice : boolean
}

const Page = ({isSampleVoice = false} : UploadPageProps) => {
    const [file, setFile] = useState<File>()
    const [nowUpload, setNowUpload] = useState<boolean>(false)

    const onDrop = (uploadFile: File) => {
        setFile(uploadFile)
    }

    const onUploadHandler = async() => {
        if (!file) {
            alert("ファイルを選択してください")
            return
        }

        const userId = "1EQo7MZLjeVlvQO9UvNQfWTDqZj1"
        const bookId = "2ab0d86d-993d-4f46-94a7-e404ad606485"
        const price = 500
        const voiceName = "sample1"

        setNowUpload(true)
        const result = await voiceRepository.uploadThenRegist(
            file, 
            userId, 
            bookId, 
            500, 
            voiceName
        )

        //Userテーブルに作品を追加
        const user = userRepository.getUser(userId)

        //booksデーブルに追加 TODOサンプルは追加しなくていいのか？

        setFile(undefined)
        setNowUpload(false)
    }

    return (
        <Stack direction={"column"}>
            <MyHeader />
            <SingleFileDropZone uploadFile={file} onDropFile={onDrop} />
            <Center mt={2}>
                <Button
                    width={"10em"}
                    _hover={{ bg : 'cyan.400'}}
                    bgColor={nowUpload ? 'gray.200' : '#0265dc'}
                    textColor={'white'}
                    onClick={onUploadHandler}
                    disabled = {nowUpload}
                >
                    {nowUpload ? (
                        <CircularProgress isIndeterminate size={"1.3em"} color='#0265dc'></CircularProgress>
                    ) : (
                        <p>アップロード</p>
                    )}
                </Button>
            </Center>
        </Stack>
    )
}

export default Page