import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from "../components/Products/ProductDetails"
import { useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProduct from "../components/Products/SuggestedProduct"
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
  const {allProducts} = useSelector((state) => state.products);
  const {allTrends} = useSelector((state) => state.trends);
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const trendData = searchParams.get("isTrend");

    useEffect(() => {
      if(trendData !== null) {
        const data = allTrends && allTrends.find((i) => i._id === id);
        setData(data);
      } else {
        const data = allProducts && allProducts.find((i) => i._id === id);
        setData(data);
      }
    }, [allProducts, allTrends]);

  return (
    <div>
        <Header />
        <ProductDetails data={data} />
        {
            !trendData && (
              <>
                {data && <SuggestedProduct data={data} />}
              </>
            ) 
        }
        <Footer />
    </div>
  )
}

export default ProductDetailsPage