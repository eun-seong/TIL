import { useRouter } from 'next/router'

export default function Posts() {
  const router = useRouter()
  console.log(router.query)
  return <div>{router.query?.directory}</div>
}
