"use client"

import { Voice } from '@/repositories/audioRepository'
import {
    Container,
    Box,
    Stack,
    Heading,
    Text,
    Card,
    Image,
    CardBody,
    CardFooter,
    Button,
    Link,
  } from '@chakra-ui/react'

export function Voicecontent ( { voice } : { voice : Voice } ) {

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            w={"100%"}
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={voice.thumbnailUrl}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Link href={`/audioPurchase/${voice.id}`}>
                    <Heading size='md'>{voice.name}</Heading>
                </Link>
                <Link href={`/user/${voice.userId}`}>
                    <Text py='2'>
                        {voice.username}
                    </Text>
                </Link>
                <Text py='2'>
                    {voice.price}
                </Text>
                </CardBody>
            </Stack>
        </Card>
    )
}

export function VoicecontentlistWithViewer ({ voiceList } : { voiceList: Voice[] }) {
    return (
        <Stack dir='row' gap={4}>
            {voiceList.map((voice)=>{
                return (
                    <Stack direction={"row"}>
                        <Voicecontent voice={voice}/>
                        <Link href={`/viewer/${voice.bookId}`}>
                            <Button>ビューワーへ</Button>
                        </Link>
                    </Stack>
                )
            })}
        </Stack>
    )
}

function Voicecontentlist ( { voiceList } : { voiceList : Voice[]} ) {
    return (
        <Stack dir='row' gap={4}>
            {voiceList.map((voice)=>{
                return <Voicecontent voice={voice} key={voice.id} />
            })}
        </Stack>
    )
}

export default Voicecontentlist