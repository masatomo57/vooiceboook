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
    id: string,
    imageUrl: string,
    title: string,
    price: number,
    author: string
}

export function Bookcontent ({ id, imageUrl, title, price, author }: Props) {

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



function Bookcontentlist ( props : { datalist: Props[] }) {
    return (
        <Stack dir='row' gap={4}>
            {props.datalist.map((data)=>{
                return <Bookcontent id={data.id} imageUrl={data.imageUrl} title={data.title} price={data.price} author={data.author} />
            })}
        </Stack>
    )
}

export default Bookcontentlist