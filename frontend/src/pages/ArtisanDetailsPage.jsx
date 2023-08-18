import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ArtisanDetails from "../components/Artisans/ArtisanDetails"
import { useParams, useSearchParams } from 'react-router-dom'
import { artisanData } from '../static/data'
import SuggestedArtisan from "../components/Artisans/SuggestedArtisan"
import { useSelector } from 'react-redux'

const ArtisanDetailsPage = () => {
    const {allServices} = useSelector((state) => state.services);
    const {id} = useParams(); 
    const [data,setData] = useState(null);
    const [searchParams] = useSearchParams();
    // const artisanName = name.replace(/-/g," ");

    // useEffect(() => {
    //     const data = artisanData.find((i) => i.name === artisanName);
    //     setData(data);
    // }, [])

    useEffect(() => {
      const data = allServices && allServices.find((i) => i._id === id);
      setData(data);
      
    }, [allServices,data])
    console.log(data);

  return (
    <div>
        <Header />
        <ArtisanDetails data={data} />
        {
            data && <SuggestedArtisan data={data} />
        }
        <Footer />
    </div>
  )
}

export default ArtisanDetailsPage