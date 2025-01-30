'use client'

import { UserButton } from '@clerk/nextjs'
import { Home } from 'lucide-react'

function UserButtonCustom() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<Home size={14} />}
          href="/dashboard"
        />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserButtonCustom
