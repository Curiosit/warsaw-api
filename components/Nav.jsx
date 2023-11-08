"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'


import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();


    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        
    }, []);



    return (

        <nav className="flex-between w-full mb-2 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/images/sync.png"
                    alt="quotr logo"
                    width={30}
                    height={30}
                    className="object-contain spin"
                /> <p className="logo_text">re/wars</p>
            </Link>
 
            {/* Desktop Nav */}
            <div className="sm:flex hidden">
                
            </div>
            {/* Mobile Nav */}
            <div className="sm:hidden flex relative">
                
            </div>
        </nav>
    )
}

export default Nav