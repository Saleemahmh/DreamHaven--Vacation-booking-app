import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { setListings } from '../redux/state';
import { useDispatch, useSelector } from 'react-redux';

const CategoryPage = () => {
    const [loading, setLoading]= useState(true);
    const {category}= useParams()
    const dispatch = useDispatch();
     const listings = useSelector((state) => state.listings);
    
      const getFeedListings = async () => {
        try {
          const response = await fetch(`http://localhost:5000/properties?category=${category}`,
            {
              method: "GET",
            }
          );
    
          const data = await response.json();
          dispatch(setListings({ listings: data }));
          setLoading(false);
        } catch (err) {
          console.log("Fetch Listings Failed", err.message);
        }
      };
    
      useEffect(() => {
        getFeedListings();
      }, [category]);
    
  return loading?(<Loader/>) : (
    <>
      <Navbar />
      <h1 className="title-list">{category}</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage