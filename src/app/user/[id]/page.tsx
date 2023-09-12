"use client"
import { Box, Center, Container, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import PlayVoice from "@/components/voice/playVoice";
import Bookcontentlist from "@/components/book/bookcontent";
import Voicecontentlist from "@/components/voice/voicecontent";
import { Button, Card, CardBody, CardHeader, CircularProgress } from "@chakra-ui/react";
import MyHeader from "@/components/myHeader";
import { useRouter } from "next/navigation";
import userRepository, { User } from "@/repositories/userRepository";
import { useEffect, useState } from "react";
import voiceRepository, { Voice } from "@/repositories/audioRepository";
import bookRepository, { Book } from "@/repositories/bookRepository";

const ProfilePage = ({ params }: { params: { id: string } }) => {
    params.id = "VU6f3bKr2EeHvfvfExIp6V90ojR2"
    const router = useRouter()
    const [profileUser, setProfileUser] = useState<User>();
    const [books, setBooks] = useState<Book[]>([]);
    const [voices, setVoices] = useState<Voice[]>([]);
    const [works, setWorks] = useState<Voice[]>([]);
    const [samples, setSamples] = useState<Voice[]>([]);
    const [me, setMe] = useState<User>();

    useEffect(() =>{
        async function fetchData() {
            const _me = await userRepository.getUser("xtg4SqUAsFbahQUh7g6P5xGIJkF2")
            const _profileUser = await userRepository.getUser(params.id)
            const _works = _profileUser.workList.length != 0 ? await voiceRepository.searchVoices(_profileUser.workList) : []
            const _samples = _profileUser.sampleList.length != 0 ? await voiceRepository.searchVoices(_profileUser.sampleList) : []
            setProfileUser(_profileUser)
            setMe(_me)
            setWorks(_works)
            setSamples(_samples)

            if (_profileUser.id === _me.id) {
                const _books  = Object.keys(_profileUser.bookList).length ? await bookRepository.searchBooks(Object.keys(_profileUser.bookList)) : []
                const _voices = _profileUser.voiceList.length != 0 ? await voiceRepository.searchVoices(_profileUser.voiceList) : []
                setBooks(_books)
                setVoices(_voices)
            }

            console.log(`profile id : ${_profileUser.id}`)
            console.log(`me id : ${me?.id}`)
        }
        fetchData()
    }, [])

    if (profileUser == undefined || me == undefined) {
        return (
            <Center mt={8}>
                <CircularProgress isIndeterminate size={"2.0em"} color='#0265dc'></CircularProgress>
            </Center>
        )
    }
    else if (profileUser.id == me.id) {
        return (
            <Stack direction={"column"}>
                <MyHeader />
                    <Container maxW={"9xl"}>
                        <Heading>ユーザーページ</Heading>
                        <Text fontSize='2xl'>ID:{params.id}</Text>
                        <Card mb={4}>
                            <CardHeader>
                                <Heading size='md'>サンプルボイス</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    {samples.map((sampleVoice) => {
                                        return (
                                            <Box key={sampleVoice.id}>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    {sampleVoice.name}
                                                </Heading>
                                                <PlayVoice voiceUrl={sampleVoice.url} />
                                            </Box>
                                        )
                                    })}
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        <Button
                                            onClick={() => {router.push("/upload")}}
                                        >サンプルを追加</Button>
                                    </Heading>
                                </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                        <Card mb={4}>
                            <CardHeader>
                                <Heading size='md'>自分の音声作品</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Voicecontentlist voiceList={works} />
                                    <Button>新しい作品を公開</Button>
                                </Stack>
                            </CardBody>
                        </Card>
                        <Card mb={4}>
                            <CardHeader>
                                <Heading size='md'>購入済み書籍</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Bookcontentlist bookList={books} />
                                </Stack>
                            </CardBody>
                        </Card>
                        <Card mb={4}>
                            <CardHeader>
                                <Heading size='md'>購入済み音声</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Voicecontentlist voiceList={voices} />
                                </Stack>
                            </CardBody>
                        </Card>
                    </Container>
                </Stack>
        )
    }
    return (
        <Stack direction={"column"}>
        <MyHeader />
            <Container maxW={"9xl"}>
                <Heading>ユーザーページ</Heading>
                <Text fontSize='2xl'>ID:{params.id}</Text>
                <Card mb={4}>
                    <CardHeader>
                        <Heading size='md'>サンプルボイス</Heading>
                    </CardHeader>

                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            {samples.map((sampleVoice) => {
                                return (
                                    <Box key={sampleVoice.id}>
                                        <Heading size='xs' textTransform='uppercase'>
                                            {sampleVoice.name}
                                        </Heading>
                                        <PlayVoice voiceUrl={sampleVoice.url} />
                                    </Box>
                                )
                            })}
                        </Stack>
                    </CardBody>
                </Card>
                <Card mb={4}>
                    <CardHeader>
                        <Heading size='md'>自分の音声作品</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Voicecontentlist voiceList={works} />
                        </Stack>
                    </CardBody>
                </Card>
            </Container>
        </Stack>
    );
}

export default ProfilePage