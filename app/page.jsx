
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        rewars
        <br className="">
        </br>
        <span className="green_gradient text-center">Gdzie wyrzucić?</span>
      </h1>
      <p className="desc text-center">
      </p>
     <Feed />
    </section>
  )
}

export default Home
export const dynamic = 'force-dynamic'
