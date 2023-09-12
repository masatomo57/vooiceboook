import { Box, Container, Heading, Stack, StackDivider, Text } from "@chakra-ui/layout";
import PlayVoice from "@/components/voice/playVoice";
import { BookcontentlistWithViewer } from "@/components/book/bookcontent";
import { VoicecontentlistWithViewer } from "@/components/voice/voicecontent";
import { voiceDummy } from "@/lib/dummy";
import { bookDummy } from "@/lib/dummy";
import { Button, Card, CardBody, CardHeader } from "@chakra-ui/react";
import MyHeader from "@/components/myHeader";

const ProfilePage = ({ params }: { params: { id: string } }) => {
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
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            サンプル1
                            </Heading>
                            <PlayVoice voiceUrl="" />
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            サンプル2
                            </Heading>
                            <PlayVoice voiceUrl="" />
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            サンプル3
                            </Heading>
                            <PlayVoice voiceUrl="" />
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                <Button>サンプルを追加</Button>
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
                            <VoicecontentlistWithViewer voiceList={voiceDummy} />
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
                            <BookcontentlistWithViewer bookList={bookDummy} />
                        </Stack>
                    </CardBody>
                </Card>
                <Card mb={4}>
                    <CardHeader>
                        <Heading size='md'>購入済み音声</Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <VoicecontentlistWithViewer voiceList={voiceDummy} />
                        </Stack>
                    </CardBody>
                </Card>
            </Container>
        </Stack>
    );
}

export default ProfilePage