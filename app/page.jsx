
import Feed from "@components/Feed"
import Image from 'next/image'
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Image src="/images/logo.png"
                    alt="quotr logo"
                    width={90}
                    height={90}
                    className="object-contain spin"
                />
      <h1 className="head_text text-center">
       re/wars
        <br className="">
        </br>
        <span className="green_gradient text-center">Zapytaj do którego kontenera wyrzucić</span>
      </h1>
      <p className="desc text-center">
      </p>
     <Feed />
    </section>
  )
}

export default Home
export const dynamic = 'force-dynamic'
