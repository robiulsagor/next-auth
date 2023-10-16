"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const Dashboard = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin")
        },
    })

    if (session) {
        console.log(session?.user);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                {session?.user ? (
                    <>
                        <h2>
                            {session?.user?.name}
                            hi
                        </h2>
                    </>
                ) : (
                    <h2 className="text-5xl text-red-700">No data</h2>
                )}
            </div>
        </div>
    )
}

export default Dashboard