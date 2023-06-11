"use client";

import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import React, { useContext } from 'react'

const Page = () => {
    const { user } = useContext(Context);

    if (!user._id) return redirect("/login");

    return (
        <div>
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
        </div>
    )
}

export default Page;