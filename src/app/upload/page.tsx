"use client"
import { useState } from 'react'
import { Center, Button, CircularProgress, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Box, Container, Stack } from "@chakra-ui/layout"
import MyHeader from "@/components/myHeader"
import { SingleFileDropZone } from '@/components/SingleFileDropZone'
import voiceRepository from '@/repositories/audioRepository'
import userRepository from '@/repositories/userRepository'
import bookRepository from '@/repositories/bookRepository'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'

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
    const router = useRouter()

    const onDrop = (uploadFile: File) => {
        setFile(uploadFile)
    }

    const onUploadHandler = async(title: string, price: number) => {
        if (!file) {
            alert("ファイルを選択してください")
            return
        }

        const userId = "1EQo7MZLjeVlvQO9UvNQfWTDqZj1"
        const username = "test2"
        const bookId = "2ab0d86d-993d-4f46-94a7-e404ad606485"
        const thumbnailUrl = ""
        const voiceName = title

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
        router.push(`/user/${userId}`)
    }

    return (
            <Stack direction={"column"}>
            <MyHeader />
            <Container maxW={"8xl"}>
            <SingleFileDropZone uploadFile={file} onDropFile={onDrop} />
            <Box mt="5">
            <Formik
                initialValues={{ title: 'title', price: 500, }}
                    onSubmit={(values, actions) => onUploadHandler(values.title, values.price)}
                >
                {(props) => (
                <Form>
                    <Stack align={"center"}>
                    <Field name='title'>
                    {({ field, form }:any) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>title</FormLabel>
                        <Input {...field} placeholder='title' />
                        </FormControl>
                    )}
                    </Field>
                    <Field name='price'>
                    {({ field, form }:any) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>price</FormLabel>
                        <Input {...field} placeholder='0' />
                        </FormControl>
                    )}
                    </Field>
                    <Button
                    mt={4}
                    w={"100%"}
                    colorScheme='teal'
                    isLoading={props.isSubmitting}
                    type='submit'
                    >
                    Upload
                    </Button>
                    </Stack>
                </Form>
                )}
                </Formik>
            </ Box>
            </Container>
        </Stack>
    )
}

export default Page