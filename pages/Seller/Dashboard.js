// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'




import React, { useEffect } from "react";
import dynamic from 'next/dynamic';

const ChartOne = dynamic(() => import('../Seller/components/Charts/ChartOne'), { ssr: false });
const ChartThree = dynamic(() => import('../Seller/components/Charts/ChartThree'), { ssr: false });
const ChartTwo = dynamic(() => import('../Seller/components/Charts/ChartTwo'), { ssr: false });
const CardDataStats = dynamic(() => import('../Seller/components/CardDataStats'), { ssr: false });
const MapOne = dynamic(() => import('../Seller/components/Maps/MapOne'), { ssr: false });
const Dashboard = () => {
  return (
    <>
    <div className='mx-2 py-2'> <div className="grid grid-cols-1  gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
       
      </CardDataStats>
      <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
      
      </CardDataStats>
      <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
       
      </CardDataStats>
      <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
       
      </CardDataStats>
    </div>

    <div className="mt-4  grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartOne />
      <ChartTwo />
      <ChartThree />

    </div></div>
   
  </>
  )
}

export default Dashboard
