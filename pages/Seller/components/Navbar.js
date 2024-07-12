/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Script from 'next/script'
import React from 'react'
import Link from 'next/link'
import { FaPeopleGroup } from "react-icons/fa6";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdLowPriority } from "react-icons/md";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { FaReceipt } from "react-icons/fa6";
import Router from 'next/router';

const Nav = () => {
  const addproducts = () =>{
    Router.push('/Seller/addProducts')
  }
  return (
    <><div className=' bg-white px-6 py-[10px]'><span className='  text-gray-500 text-[14px]'>Existing Seller? Explore our product recommendations with Dhamaka Selection</span></div>
    <nav id="navbar" class=" mt-[1px] shadow-sm z-40 flex w-full flex-row justify-start bg-white px-8 sm:justify-start">
    <div className='mt-[1px] shadow-sm z-40 flex w-full flex-row justify-start bg-white px-4 sm:justify-start'><div className="logo  items-center py-2 ">
    
    <Link href={'/'}><img src={'/Logo.PNG'} className='ml-3  min-w-[150px]' alt='Logo' width={200} height={35}></img>
    </Link>
    </div>
        <ul  class=" ml-8 space-x-8 py-4 text-md text-black sm:flex-row flex-col   ">
           
            
    
            <li class="inline">
                <span>Sell Online</span>
            </li>
            <li class="inline">
                <span>Fees and Commission</span>
            </li>
            <li class="inline">
                <span>Grow</span>
            </li>
            <li class="inline">
                <span>Learn</span>
            </li>
            
        </ul></div>
        <button id="btnSidebarToggler" type="button" class="mr-5 py-1 text-md text-black hover:text-black">
           
           
           Login
        </button>
        <button onClick={addproducts} type="button" class=" bg-orange-300 min-w-36 py-1 px-4 text-[17px] text-black hover:text-black">
           
           
           Start Selling
        </button>
        <button id="btnSidebarToggler" type="button" class="md:hidden py-4 text-2xl text-black hover:text-black">
            <svg id="navClosed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg id="navOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="hidden h-8 w-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </nav>
    </>
  )
}

export default Nav