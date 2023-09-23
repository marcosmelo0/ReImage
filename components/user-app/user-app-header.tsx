"use client"

import { UserNav } from "../common/user-nav"

export default function UserAppHeader() {
    return (
        <header className="py-2 p-14 ">
            <nav className="flex justify-between items-center">
                <span className="font-light">re<span className="font-extrabold">Image</span></span>
                <UserNav />
            </nav>
        </header>
    )
}