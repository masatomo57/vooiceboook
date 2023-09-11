"use client"

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
import { useRouter } from 'next/navigation'

interface Props {
    imageUrl: string,
    title: string,
    price: number,
    userName: string,
    userId: string
}

export function Voicecontent ({ imageUrl, title, price, userName, userId }: Props) {

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={imageUrl}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Heading size='md'>{title}</Heading>
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



function Voicecontentlist ( props : { datalist: Props[] }) {
    return (
        <Stack dir='row' gap={4}>
            {props.datalist.map((data)=>{
                return <Voicecontent imageUrl={data.imageUrl} title={data.title} price={data.price} userName={data.userName} userId={data.userId} />
            })}
        </Stack>
    )
}

export default Voicecontentlist