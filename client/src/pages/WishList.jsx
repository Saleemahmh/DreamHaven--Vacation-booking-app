import React from 'react'
import ListingCard from '../components/ListingCard'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux'

const WishList = () => {
    const wishList = useSelector((state)=>state.user.wishList)
  return (
       <>
      <Navbar></Navbar>
    
       <h1 className='title-list'> Your Wish List</h1>
       <div className ="list">
        {wishList?.map(
    ({
        _id,
        creator,
        listingPhotoPaths,
        city,
        state,
        country,
        category,
        type,
        price,
        booking=false,
    }) =>(
        <ListingCard
        listingId={_id}
        creator={creator}
        listingPhotoPaths={listingPhotoPaths}
        city={city}
        state={state}
        country={country}
        category={category}
        type={type}
        price={price}
        booking={booking}
        ></ListingCard>
    )
        )}
       </div>
       <Footer/>
       </>
      )
    }
    
export default WishList