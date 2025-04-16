import Navbar from "../components/Navbar"
import Slide from "../components/Slide"
import Listings from "../components/Listings"
import Footer from "../components/Footer"
import Categories from "../components/Categories"


const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories/>
      <Listings />
      <Footer/>
    </>
  )
}

export default HomePage