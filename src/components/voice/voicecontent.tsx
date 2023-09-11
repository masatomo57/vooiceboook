"use client"

import { VoiceType } from '@/lib/type'
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

export function Voicecontent ({ id, bookId, name, price, url, userId, userName, thumbnailUrl}: VoiceType) {

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={thumbnailUrl}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Link href={`/audioPurchase/${id}`}>
                    <Heading size='md'>{name}</Heading>
                </Link>
                <Link href={`/user/${userId}`}>
                    <Text py='2'>
                        {userName}
                    </Text>
                </Link>
                <Text py='2'>
                    {price}
                </Text>
                </CardBody>
            </Stack>
        </Card>
    )
}



function Voicecontentlist ( props : { datalist?: VoiceType[] }) {
    return (
        <Stack dir='row' gap={4}>
            {props.datalist?.map((data)=>{
                return <Voicecontent id={data.id} bookId={data.bookId} name={data.name} price={data.price} url={data.url} userId={data.userId} userName={data.userName} thumbnailUrl={data.thumbnailUrl} />
            })}
        </Stack>
    )
}

export default Voicecontentlist