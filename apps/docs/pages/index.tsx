import {useRouter} from 'next/router'
import {useEffect} from 'react'

export default function Docs() {
  const router = useRouter()

  useEffect(() => {
    router.push('/main.html')
  })

  return null
}
