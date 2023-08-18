import React, { useEffect } from 'react'
import styles from '../../styles/styles'
import TrendCard from "./TrendCard";
import { useSelector } from 'react-redux';

const Trends = () => {
  const {allTrends, isLoading} = useSelector((state) => state.trends);

  return (
    <div>
        {
          !isLoading && (
            <div className={`${styles.section}`}>
              <div className={`${styles.heading}`}>
                  <h1>Trending Products</h1>
              </div>
              <div className="w-full grid">
                  {
                    allTrends.length !== 0 && (
                      <TrendCard data={allTrends && allTrends[0]}/>
                    )
                  }
                  <h4>
                    {
                      allTrends?.length === 0 && (
                        `No Trending products!`
                      )
                    }
                  </h4>
              </div>
           </div>
          )
        }
    </div>
  )
}

export default Trends