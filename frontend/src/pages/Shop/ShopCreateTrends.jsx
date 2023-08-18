import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateTrend from "../../components/Shop/CreateTrend";

const ShopCreateTrends = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
            <div className='w-[330px]'>
                <DashboardSideBar active={9} />
            </div>
            <div className="w-full justify-center flex">
                <CreateTrend />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateTrends