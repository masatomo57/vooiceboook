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
  } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

interface Props {
    imageUrl: string,
    title: string,
    price: number,
    userId: string
}

export function Voicecontent ({ imageUrl, title, price, userId }: Props) {
    const router = useRouter()
    const onClick = () => {
        console.log('購入ボタンが押されました')
    }

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

                <Text py='2'>
                    {price}
                </Text>
                </CardBody>

                <CardFooter>
                <Button variant='solid' colorScheme='blue' onClick={onClick}>
                    購入
                </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}



function Voicecontentlist ( props : { datalist: Props[] }) {
    return (
        <Stack dir='row' gap={4}>
            {props.datalist.map((data)=>{
                return <Voicecontent imageUrl={data.imageUrl} title={data.title} price={data.price} userId={data.userId} />
            })}
        </Stack>
    )
}

export default Voicecontentlist