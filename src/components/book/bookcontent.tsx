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
    price?: number,
}

export function Bookcontent ({ imageUrl, title, price }: Props) {

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
                
                </CardFooter>
            </Stack>
        </Card>
    )
}



function Bookcontentlist ( props : { datalist: Props[] }) {
    return (
        <Stack dir='row' gap={4}>
            {props.datalist.map((data)=>{
                return <Bookcontent imageUrl={data.imageUrl} title={data.title} price={data.price} />
            })}
        </Stack>
    )
}

export default Bookcontentlist