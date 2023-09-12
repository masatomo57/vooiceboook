"use client"

import { AuthGuard } from "@/auth/AuthGuard"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

/* サインインしている→書籍一覧ページ、していない→サインインページに飛ばす処理 */
export default function Home() {
  const router = useRouter()

  return (
    <AuthGuard>
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
    </AuthGuard>
  )
}
