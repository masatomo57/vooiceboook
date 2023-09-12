"use client"
import { useState, useEffect } from 'react'
import { Center, Button, CircularProgress, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { Box, Container, Heading, Stack } from "@chakra-ui/layout"
import MyHeader from "@/components/myHeader"
import { SingleFileDropZone } from '@/components/SingleFileDropZone'
import voiceRepository from '@/repositories/audioRepository'
import userRepository, { User } from '@/repositories/userRepository'
import bookRepository, { Book } from '@/repositories/bookRepository'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import Select from 'react-select'

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
    const [selectBook, setSelectBook] = useState("")
    const [user, setUser] = useState<User>()
    const [books, setBooks] = useState<Book[]>()
    const [options, setOptions] = useState([{"value": "", "label": ""}])

    const userId = "VU6f3bKr2EeHvfvfExIp6V90ojR2"

    useEffect(() => {
        async function fetchData () {
            const _user = await userRepository.getUser(userId)
            const _books  = Object.keys(_user.bookList).length ? await bookRepository.searchBooks(Object.keys(_user.bookList)) : []

            setUser(_user)
            setBooks(_books)
            
            const _options = _books.map((obj) => {return {value: obj.id, label: obj.name}})
            setOptions(_options)
        }
        fetchData()
    }, [])

    const onDrop = (uploadFile: File) => {
        setFile(uploadFile)
    }

    const onUploadHandler = async(title: string, price: number) => {
        if (user === undefined) {
            return console.log("No user")
        }

        if (!file) {
            alert("ファイルを選択してください")
            return
        } else if (selectBook == "") {
            alert("書籍を選択してください")
            return
        }

        const username = "test2"
        const bookId = selectBook
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

    const handleChange = (e: any) => {
        e.defaultPrevented
        setSelectBook(e.value)
    }

    return (
            <Stack direction={"column"}>
            <MyHeader />
            <Container maxW={"8xl"}>
            <SingleFileDropZone uploadFile={file} onDropFile={onDrop} />
            <Box mt={"5"}>
                <Heading size={"sm"} mb={"2"} fontWeight={"normal"}>
                    書籍のタイトル
                </Heading>
                <Select
                    id='title'
                    options={options}
                    onChange={handleChange}
                />
            </Box>
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
                        <FormLabel>ボイスのタイトル</FormLabel>
                        <Input {...field} placeholder='title' />
                        </FormControl>
                    )}
                    </Field>
                    <Field name='price'>
                    {({ field, form }:any) => (
                        <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>値段</FormLabel>
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