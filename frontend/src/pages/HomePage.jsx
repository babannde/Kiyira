import React from 'react';
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Trends from "../components/Trends/Trends";
import Sponsored from "../components/Route/Sponsored/Sponsored";
import Footer from "../components/Layout/Footer";
import FeaturedArtisan from '../components/Route/FeaturedArtisan/FeaturedArtisan';

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Categories />
        <FeaturedArtisan />
        <BestDeals />
        <Trends />
        <FeaturedProduct />
        {/* <Sponsored /> */}
        <Footer />
    </div>
  )
}

export default HomePage