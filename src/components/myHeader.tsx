"use client"

import { Stack, Text } from "@chakra-ui/layout"
import { Link } from "@chakra-ui/next-js"
import { Button, IconButton } from "@chakra-ui/react"
import { useRouter } from 'next/navigation'

const MyHeader = () => {
    const router = useRouter()
    const userId = "test"

    return (
        <Stack justify={"space-between"} direction={"row"}>
            <Stack direction="row">
                <Link href={"/bookList"}>
                    <Text>
                        ボイコミ！
                    </Text>
                </Link>
                <Link href={"/bookList"}>
                    <Text>
                        書籍
                    </Text>
                </Link>
                <Link href={"/audioList"}>
                    <Text>
                        音声
                    </Text>
                </Link>
            </Stack>
            <Button onClick={() => (router.push(`/user/${userId}`))}>
                ユーザーページ
            </Button>
        </Stack>
    )
}

export default MyHeader