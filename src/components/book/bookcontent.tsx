"use client"

import { BookType } from '@/lib/dummy'
import {
    Stack,
    Heading,
    Text,
    Card,
    Image,
    CardBody,
    CardFooter,
    Link,
  } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export function Bookcontent ( { book } : { book: BookType} ) {
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
                src={book.thumbnailUrl}
                alt='Caffe Latte'
            />

            <Stack>
                <CardBody>
                <Link href={`/bookPurchase/${book.id}`}>
                    <Heading size='md'>{book.title}</Heading>
                </Link>
                <Text py='3'>
                    {book.author}
                </Text>
                <Text py='2'>
                    {book.price}
                </Text>
                </CardBody>
            </Stack>
        </Card>
    )
}

export function BookcontentlistWithViewer ({ bookList } : { bookList: BookType[] }) {
    return (
        <Stack dir='row' gap={4}>
            {bookList.map((book)=>{
                return (
                    <Stack direction={"row"}>
                        <Bookcontent book={book}/>
                        <Link href={`/viewer/${book.id}`}>
                            <Text>ビューワーへ</Text>
                        </Link>
                    </Stack>
                )
            })}
        </Stack>
    )
}


function Bookcontentlist ({ bookList } : { bookList: BookType[] }) {
    return (
        <Stack dir='row' gap={4}>
            {bookList.map((book)=>{
                return <Bookcontent book={book} />
            })}
        </Stack>
    )
}

export default Bookcontentlist