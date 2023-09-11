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

type Bookdata = {
    id: string
    title: string
    contents?: string
    voiceList?: any[]
    author: string
    index?: number
    thumbnailUrl: string
    ISBNcode?: string
    price: number
}

export function Bookcontent ({ id, thumbnailUrl, title, price, author }: Bookdata) {

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
                <Link href={`/bookPurchase/${id}`}>
                    <Heading size='md'>{title}</Heading>
                </Link>
                <Text py='3'>
                    {author}
                </Text>
                <Text py='2'>
                    {price}
                </Text>
                </CardBody>

                <CardFooter>
                
                </CardFooter>
            </Stack>
        </Card>
    )
}



function Bookcontentlist ( props : { datalist: Bookdata[] }) {
    return (
        <Stack dir='row' gap={4}>
            {props.datalist.map((data)=>{
                return <Bookcontent id={data.id} thumbnailUrl={data.thumbnailUrl} title={data.title} price={data.price} author={data.author}/>
            })}
        </Stack>
    )
}

export default Bookcontentlist