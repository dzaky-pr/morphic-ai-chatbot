import { Chat } from '@/components/chat'
import Footer from '@/components/footer'
import { generateId } from 'ai'

export default function Page() {
  const id = generateId()
  return (
    <>
      <Chat id={id} /> <Footer />
    </>
  )
}
