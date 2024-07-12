/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Script from 'next/script'
import React from 'react'
import Link from 'next/link'
import Navbar from '../Seller/components/Navbar'
import { FaPeopleGroup } from "react-icons/fa6";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdLowPriority } from "react-icons/md";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { FaReceipt } from "react-icons/fa6";
import Router from 'next/router';

const index = () => {
  const addproducts = () =>{
    Router.push('/Seller/addProducts')
  }
  return (
    <div className='bg-white container mx-auto'>
    {/* <!-- component -->
<!--
Change class "fixed" to "sticky" in "navbar" (l. 33) so the navbar doesn't hide any of your page content!
--> */}



{/* <!-- Navbar start --> */}

{/* <!-- Navbar end --> */}

<div className='container justify-center items-center mx-auto '>
  
<main>
  <img src={'des.webp'} className='h-full w-full' alt=""></img>
  <div className='absolute sm:top-[200px] mx-14 lg:text-5xl md:text-xl sm:text-lg text-lg  text-slate-800 font-semibold'>Sell Online with Sangam Bharat</div>
</main>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-16 pb-20 mx-auto">
   
    <div class="flex flex-wrap -m-4 items-center justify-center text-center">
      <div class="p-4 md:w-1/5 sm:w-1/3 w-full">
        <div class="shadow-lg px-4 py-6 rounded-lg items-center">
       <FaPeopleGroup className='text-orange-400 w-12 h-12 mb-3 inline-block' />

          <h2 class="title-font  text-md text-gray-900">2.7K+ Sangam </h2>
          <p class="title-font  text-md text-gray-900">Bharat Customers</p>
        </div>
      </div>
      <div class="p-4 md:w-1/5 sm:w-1/3 w-full">
        <div class="shadow-lg px-4 py-6 rounded-lg">
        <RiSecurePaymentFill className='text-orange-400 w-12 h-12 mb-3 inline-block'/>
          <h2 class="title-font  text-md text-gray-900">7* days secure & </h2>
          <p class="title-font  text-md text-gray-900">regular payments</p>
        </div>
      </div>
      <div class="p-4 md:w-1/5 sm:w-1/3 w-full">
        <div class="shadow-lg px-4 py-6 rounded-lg">
        <MdLowPriority  className='text-orange-400 w-12 h-12 mb-3 inline-block'/>
          <h2 class="title-font  text-md text-gray-900">Low cost of </h2>
          <p class="title-font  text-md text-gray-900">doing bussiness</p>
        </div>
      </div>
      <div class="p-4 md:w-1/5 sm:w-1/3 w-full">
        <div class="shadow-lg px-4 py-6 rounded-lg">
        <MdOutlineWifiCalling3 className='text-orange-400 w-12 h-12 mb-3 inline-block'/>
          <h2 class="title-font  text-md text-gray-900">One click seller </h2>
          <p class="title-font  text-md text-gray-900">support</p>
        </div>
      </div>
      <div class="p-4 md:w-1/5 sm:w-1/3 w-full">
        <div class="shadow-lg px-4 py-6 rounded-lg">
        <FaReceipt className='text-orange-400 w-12 h-12 mb-3 inline-block'/>
          <h2 class="title-font  text-md text-gray-900">Access to best </h2>
          <p class="title-font  text-md text-gray-900">recommendations</p>
        </div>
      </div>
    
    </div>
  </div>
</section>

</div>
</div>
  )
}

export default index