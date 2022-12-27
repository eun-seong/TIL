import { useRouter } from 'next/router'

export default function Posts() {
  const router = useRouter()
  return <div>{router.query?.directory}</div>
}
