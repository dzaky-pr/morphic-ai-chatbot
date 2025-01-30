import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import UserButtonCustom from './user-button'

export const Header: React.FC = async () => {
  return (
    <header className="bg-background sticky top-0 w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none ">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">NUII AI</span>
        </a>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex w-fit h-fit ">
          <SignedOut>
            <div className="border px-4 py-2 border-primary rounded-lg hover:bg-primary-foreground">
              <SignInButton />
            </div>
          </SignedOut>

          <SignedIn>
            <div className="border w-fit h-fit flex p-1.5 border-primary rounded-full">
              <UserButtonCustom />
            </div>
          </SignedIn>
        </div>
        <ModeToggle />
        {/* <HistoryContainer location="header" /> */}
      </div>
    </header>
  )
}

export default Header
