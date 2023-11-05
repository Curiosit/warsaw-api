
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        rewars
        <br className="">
        </br>
        <span className="green_gradient text-center"> Sprawdź jak ponownie wykorzystać wszystko!</span>
      </h1>
      <p className="desc text-center">albo dowiedz się do którego kontenera wyrzucić...
      </p>
     <Feed />
    </section>
  )
}

export default Home
