import { Stack, Text } from "@chakra-ui/layout";
import PlayVoice from "@/components/voice/playVoice";
import { BookcontentlistWithViewer } from "@/components/book/bookcontent";
import { VoicecontentlistWithViewer } from "@/components/voice/voicecontent";
import { voiceDummy } from "@/lib/dummy";
import { bookDummy } from "@/lib/dummy";
import { Button } from "@chakra-ui/react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
    return (
        <Stack direction={"column"}>
            <Text fontSize='5xl'>ユーザーページ</Text>
            <Text fontSize='2xl'>ID:{params.id}</Text>
            <Stack direction={"column"}>
                <Text fontSize='4xl'>サンプルボイス</Text>
                <PlayVoice voiceUrl="" />
                <PlayVoice voiceUrl="" />
                <PlayVoice voiceUrl="" />
                <Button>サンプルボイスを追加</Button>
            </Stack>
            <Stack direction={"column"}>
                <Text fontSize='4xl'>自分の音声作品</Text>
                <VoicecontentlistWithViewer voiceList={voiceDummy} />
                <Button>新しい作品を公開</Button>
            </Stack>
            <Stack direction={"column"}>
                <Text fontSize='4xl'>購入書籍</Text>
                <BookcontentlistWithViewer bookList={bookDummy} />
            </Stack>
            <Stack direction={"column"}>
                <Text fontSize='4xl'>購入音声</Text>
                <VoicecontentlistWithViewer voiceList={voiceDummy} />
            </Stack>
        </Stack>
    );
}

export default ProfilePage