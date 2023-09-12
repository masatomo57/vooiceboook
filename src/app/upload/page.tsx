"use client"
import { useState } from 'react'
import { Center, Button, CircularProgress } from "@chakra-ui/react"
import { Stack } from "@chakra-ui/layout"
import MyHeader from "@/components/myHeader"
import { SingleFileDropZone } from '@/components/SingleFileDropZone'
import voiceRepository from '@/repositories/audioRepository'
import userRepository from '@/repositories/userRepository'
import bookRepository from '@/repositories/bookRepository'

type UploadPageProps = {
    isSampleVoice : boolean
}

const Page = ({isSampleVoice = false} : UploadPageProps) => {

    /** 
     * TODO
     * アップロードできるファイルの制限
     */
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
        const username = "test2"
        const bookId = "2ab0d86d-993d-4f46-94a7-e404ad606485"
        const thumbnailUrl = ""
        const price = 500
        const voiceName = "sample1"

        setNowUpload(true)
        const voice = await voiceRepository.uploadThenRegist(
            file, 
            userId, 
            username,
            bookId, 
            price, 
            thumbnailUrl,
            voiceName
        )
        
        const user = await userRepository.getUser(userId)
        if (isSampleVoice) {
            const sampleList = user.sampleList;
            sampleList.push(voice.id)
            const UpdatedUser = {
                ...user,
                sampleList : sampleList
            }
            await userRepository.setUser(UpdatedUser)
        }
        else {
            const workList = user.workList;
            workList.push(voice.id)
            const updatedUser = {
                ...user,
                workList : workList
            }
            await userRepository.setUser(updatedUser)

            const book = await bookRepository.getBook(bookId)
            const voiceList = book.voiceList;
            voiceList.push(voice.id)
            const updatedBook = {
                ...book,
                voiceList : voiceList
            }
            await bookRepository.setBook(updatedBook)
        }

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