import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import TrendCard from "../components/Trends/TrendCard";
import styles from "../styles/styles";

const TrendsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allTrends,isLoading} = useSelector((state) => state.trends);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allTrends;
      setData(d);
    } else {
      const d =
      allTrends && allTrends.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allTrends]);

  return (
  <>
  {
    isLoading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={5} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div>
          {data && data.map((i, index) => <TrendCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No Trends Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
    )
  }
  </>
  );
};

export default TrendsPage;