'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const SearchUsers = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="mb-6">
      <form
        onSubmit={e => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const queryTerm = formData.get('search') as string
          router.push(pathname + '?search=' + queryTerm)
        }}
        className="flex items-center space-x-2"
      >
        <label htmlFor="search" className="text-lg font-medium">
          Search for users:
        </label>
        <Input
          id="search"
          name="search"
          type="text"
          placeholder="Enter user name or email"
          className="px-3 py-2 w-fit border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </Button>
      </form>
    </div>
  )
}
