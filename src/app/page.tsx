"use client"

import { Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => (router.push("/signin"))}>
        サインイン
      </Button>
      <Button onClick={() => (router.push("/signup"))}>
        サインアップ
      </Button>
      <Button onClick={() => (router.push("/bookList"))}>
        書籍リスト
      </Button>
      <Button onClick={() => (router.push("/audioList"))}>
        音声リスト
      </Button>
    </>
  )
}
