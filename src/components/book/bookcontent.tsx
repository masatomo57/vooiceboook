"use client"

import { BookType } from '@/lib/dummy'
import { Book } from '@/repositories/bookRepository'
import {
    Stack,
    Heading,
    Text,
    Card,
    Image,
    CardBody,
    CardFooter,
    Link,
    Button
  } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export function Bookcontent ( { book } : { book: Book} ) {
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
                    <Heading size='md'>{book.name + " " + book.index}</Heading>
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

export function BookcontentlistWithViewer ({ bookList } : { bookList: Book[] }) {
    return (
        <Stack dir='row' gap={4}>
            {bookList.map((book)=>{
                return (
                    <Stack direction={"row"}>
                        <Bookcontent book={book}/>
                        <Link href={`/viewer/${book.id}`}>
                            <Button>ビューワーへ</Button>
                        </Link>
                    </Stack>
                )
            })}
        </Stack>
    )
}


function Bookcontentlist ({ bookList } : { bookList: Book[] }) {
    return (
        <Stack dir='row' gap={4}>
            {bookList.map((book)=>{
                return <Bookcontent book={book} key={book.id} />
            })}
        </Stack>
    )
}

export default Bookcontentlist