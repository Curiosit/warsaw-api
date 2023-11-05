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
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);



    return (

        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src="/images/sync.png"
                    alt="quotr logo"
                    width={30}
                    height={30}
                    className="object-contain"
                /> <p className="logo_text">rewars</p>
            </Link>

            {/* Desktop Nav */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-post" className="black_btn">Create post
                        </Link>
                        <button type="button" onClick={signOut} className='outline_btn'> Sign Out</button>
                        <Link href="/profile">
                            <Image src={session?.user?.image}
                                width={49}
                                height={49}
                                className="rounded-full"
                                alt="profile"

                            >
                            </Image>
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
            {/* Mobile Nav */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className='flex'>

                        <Image src={session?.user?.image}
                            width={49}
                            height={49}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prev) => !prev)}

                        ></Image>
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>
                                    My profile
                                </Link>
                                <Link
                                    href="/create-post"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>
                                    Create post
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className="mt-5 w-full black_btn"
                                >Sign out</button>

                            </div>
                        )}
                    </div>
                ) : (
                    <>

                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type='button'
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className='black_btn'
                                >
                                    Sign in
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav