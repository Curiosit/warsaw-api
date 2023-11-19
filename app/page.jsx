"use client"
import Feed from "@components/Feed"
import Image from 'next/image'
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <section className="w-full flex-center flex-col">
      <Image src="/images/logo.png"
                    alt="quotr logo"
                    width={90}
                    height={90}
                    className="object-contain spin"
                />
      <h1 className="head_text text-center">
       re/wars.ai
        <br className="">
        </br>
        
      </h1>
      <p className="desc text-center">co z zrobić z odpadami? jak je wykorzystać ponownie? do którego kontenera wyrzucić?
      </p>
     <Feed />
    </section>
  )
}

export default Home
export const dynamic = 'force-dynamic'
