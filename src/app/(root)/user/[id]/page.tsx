"use client"
import { Box, Center, Container, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import PlayVoice from "@/components/voice/playVoice";
import Bookcontentlist, { Bookcontent } from "@/components/book/bookcontent";
import Voicecontentlist from "@/components/voice/voicecontent";
import { Button, Card, CardBody, CardHeader, CircularProgress } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import userRepository, { User } from "@/repositories/userRepository";
import { useEffect, useState } from "react";
import voiceRepository, { Voice } from "@/repositories/audioRepository";
import bookRepository, { Book } from "@/repositories/bookRepository";
import { testUserId } from "@/lib/dummy";
import { Link } from "@chakra-ui/next-js";

const ProfilePage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [profileUser, setProfileUser] = useState<User>();
    const [books, setBooks] = useState<Book[]>([]);
    const [voices, setVoices] = useState<Voice[]>([]);
    const [works, setWorks] = useState<Voice[]>([]);
    const [samples, setSamples] = useState<Voice[]>([]);
    const [me, setMe] = useState<User>();

    useEffect(() =>{
        async function fetchData() {
            const _me = await userRepository.getUser(testUserId) // (Dummy) testUserId
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
                    <Container maxW={"9xl"}>
                        <Heading>ユーザーページ</Heading>
                        <Text fontSize='2xl'>ID:{params.id}</Text>
                        <Card mb={4}>
                            <CardHeader>
                                <Heading size='md'>{profileUser.name}のサンプルボイス</Heading>
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
                                <Heading size='md'>{profileUser.name}の音声作品</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Voicecontentlist voiceList={works} />
                                    <Button onClick={() => {router.push("/upload")}}>新しい作品を公開</Button>
                                </Stack>
                            </CardBody>
                        </Card>
                        <Card mb={4}>
                            <CardHeader>
                                <Heading size='md'>購入済み書籍</Heading>
                            </CardHeader>
                            <CardBody>
                                <Stack spacing='4'>
                                    {books.map((book) => {
                                        return (
                                            <Stack direction={"row"} align={"center"}>
                                                <Bookcontent book={book} />
                                                <Link href={`/viewer/${book.id}`}>
                                                    <Button>ビューワーへ</Button>
                                                </Link>
                                            </Stack>
                                        )
                                    })}
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
            <Container maxW={"9xl"}>
                <Heading>ユーザーページ</Heading>
                <Text fontSize='2xl'>ID:{params.id}</Text>
                <Card mb={4}>
                    <CardHeader>
                        <Heading size='md'>{profileUser.name}のサンプルボイス</Heading>
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
                        <Heading size='md'>{profileUser.name}の音声作品</Heading>
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