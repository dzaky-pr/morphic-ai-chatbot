import { Chat } from '@/components/chat'
import { generateId } from 'ai'

export default function Page() {
  const id = generateId()
  return <Chat id={id} />
}

// export default function Home() {
//   return (
//     <main>
//       <h1 className="text-center text-3xl font-bold text-indigo-600">
//         Hello World
//       </h1>
//     </main>
//   )
// }
