"use client"

import { useAuthContext } from "@/auth/authProvider"
import { testUserId } from "@/lib/dummy"
import { Stack, Text } from "@chakra-ui/layout"
import { Link } from "@chakra-ui/next-js"
import { Button } from "@chakra-ui/react"
import { useRouter } from 'next/navigation'

const MyHeader = () => {
    const router = useRouter()
    const onClickHeaderIcon = () => {
        router.push(`/user/${testUserId}`) // (Dummy) testUserId
    }

    return (
        <Stack justify={"space-between"} direction={"row"} h={"20"} w={"100%"} bg={"blackAlpha.900"} color={"white"} align={"center"} mb="3">
            <Stack direction="row" gap={"5"} ml={"5"} h={"100%"} align={"center"}>
                <Link href={"/bookList"}>
                    <Text fontWeight={"bold"} fontSize={"4xl"} >
                        VooiceBoook
                    </Text>
                </Link>
                <Link href={"/bookList"} hideBelow={"md"} >
                    <Text fontSize={"xl"} align={"center"} fontWeight={"bold"}>
                        書籍
                    </Text>
                </Link>
                <Link href={"/audioList"} hideBelow={"md"}>
                    <Text fontSize={"xl"} align={"center"} fontWeight={"bold"}>
                        音声
                    </Text>
                </Link>
            </Stack>
            <Button onClick={onClickHeaderIcon} mr={"5"} hideBelow={"md"}>
                ユーザーページ
            </Button>
        </Stack>
    )
}

export default MyHeader