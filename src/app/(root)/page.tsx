"use client"

import { testUserId } from "@/lib/dummy"
import { useRouter } from "next/navigation"

/* サインインしている→書籍一覧ページ、していない→サインインページに飛ばす処理 */
export default function Home() {
  const router = useRouter()

  if(testUserId) {
    router.push("/bookList")
  } else {
    router.push("/signin")
  }

  return (
    <></>
  )
}
