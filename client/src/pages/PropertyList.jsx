import React, { useEffect, useState } from 'react'
import ListingCard from '../components/ListingCard'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import {setPropertyList} from "../redux/state";
import Loader from '../components/Loader';

const PropertyList = () => {
    const [loading,setLoading]= useState(true);
    const user = useSelector((state)=> state.user);
    const propertyList = user?.propertyList;
    const dispatch = useDispatch();
    const getPropertyList = async()=>{
        try{
            const response = await fetch(`http://localhost:5000/users/${user._id}/properties`,{
                method:"GET"
            })
            const data = await response.json();
            console.log(data);
            dispatch(setPropertyList(data))
            setLoading(false)
        }catch(err){
            console.log("Failed to fetch properties", err.message);
        }
    }
    useEffect(()=>{
        getPropertyList()
    },[])
  return loading? <Loader/> : (
       <>
      <Navbar></Navbar>
    
       <h1 className='title-list'> Your Property List</h1>
       <div className ="list">
        {propertyList?.map(
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
    
export default PropertyList