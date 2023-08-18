import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllTrends from '../../components/Shop/AllTrends'

const ShopAllTrends = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={8} />
          </div>
          <div className="w-full justify-center flex">
                <AllTrends />
          </div>
        </div>
    </div>
  )
}

export default ShopAllTrends