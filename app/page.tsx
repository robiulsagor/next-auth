'use client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route';
import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session } = useSession({
    required: false,
    onUnauthenticated() {
      redirect("/api/auth/signin?")
    },
  })

  return (
    <div className='flex flex-col items-center justify-center text-center h-screen'>
      <div>

        {session?.user ? (
          <>
            <h1 className='text-4xl'> Logged in</h1>
            <button className="bg-red-500 px-5 py-2 rounded-lg text-2xl mt-10"
              onClick={() => signOut()}> Sign Out</button>
          </>
        ) : (
          <>
            <h2 className='text-4xl'>Hello</h2>
            <button className="bg-green-500 px-5 py-2 rounded-lg text-2xl mt-10"
              onClick={() => signIn()}> Sign In</button>
          </>
        )

        }
      </div>
    </div>
  )
}
