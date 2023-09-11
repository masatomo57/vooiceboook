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

interface Props {
    imageUrl: string,
    title: string,
    price: number,
    userId: string
}

function Voicecontent ({ imageUrl, title, price, userId }: Props) {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src=""
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Heading size='md'>The perfect latte</Heading>

                <Text py='2'>
                    Caffè latte is a coffee beverage of Italian origin made with espresso
                    and steamed milk.
                </Text>
                </CardBody>

                <CardFooter>
                <Button variant='solid' colorScheme='blue'>
                    Buy Latte
                </Button>
                </CardFooter>
            </Stack>
        </Card>
    )
}



function Voicecontentlist ( datalist : Props[]) {
    return (
        (datalist.map((data)=>{
            <Voicecontent imageUrl={data.imageUrl} title={data.title} price={data.price} userId={data.userId} />
        }))
    )
}

export default Voicecontent