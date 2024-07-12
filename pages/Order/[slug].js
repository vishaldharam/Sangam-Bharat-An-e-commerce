/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React,{useState} from 'react'
import { useRouter } from 'next/router';
import Order from "../../models/order"
import mongoose from "mongoose";
import { FaPhone } from "react-icons/fa6";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { reverse } from 'lodash';

export default function Page({data}) {
const [track, settrack] = useState(false)
  
    
    return (
        <div>
            <div class="py-2 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

              
                <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-1 md:p-6 xl:p-8 w-full">
                        <h1 class="flex text-xl dark:text-white lg:text-2xl item-center font-semibold leading-7 lg:leading-9 text-gray-800"><img src={`../${data.status === 'Paid'?'greentick.webp':'failed.jpg'}`} className='sm:w-6 sm:h-6 w-5 h-5 mt-1 mr-2' alt="tick" /> <span> {data.status === 'Paid'?'Thank you for Order':'Your Order Failed'}!</span></h1>
                        <h1 class="text-sm font-semibold dark:text-white leading-7 lg:leading-9 text-gray-800">Order Id - #{data.orderId}</h1>
                    <p class={`text-base dark:text-gray-300 font-medium leading-6 text-gray-600`}>Payment status - <span className={`${data.status === 'Paid'?'text-green-600':'text-red-600'}`}>{data.status}</span></p>
                            <p class="text-xl md:text-xl dark:text-white items-center justify-center text-center font-semibold leading-6 mt-8 xl:leading-5 text-gray-800">Products</p>
                            {Object.keys(data.products).map((item)=>{ return <><div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div class="pb-4 md:pb-8 w-16 md:w-16">

                                    <img class="w-full " src={`../images/${data.products[item].image_url}`} alt="dress" />
                                </div>
                                <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div class="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 class="text-xl dark:text-white xl:text-sm font-semibold leading-6 text-gray-800">{data.products[item].name}</h3>

                                    </div>
                                    <div class="flex justify-between space-x-8 items-start w-full">

                                        <p class="text-base dark:text-white xl:text-sm leading-6 text-gray-800">{data.products[item].qty}</p>
                                        <p class="text-base dark:text-white xl:text-sm font-semibold leading-6 text-gray-800">₹ {data.products[item].price * data.products[item].qty}</p>
                                    </div>
                                </div>
                            </div></>})}

                            {/* <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                
                                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                  

                                </div>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                    <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">₹ {data.amount}</p>
                                </div>
                            </div> */}
                            <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">


                                {(data.status === 'Paid') && <div class="w-full flex justify-center items-center">
                                    <button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-64 bg-gray-800 text-base font-medium leading-4 text-white" onClick={()=>{settrack(true)}}>Track Order</button>
                                </div>}
                            </div>
                            {track && <div className=' px-3 py-5 '><h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Tracking Details</h3>
                            <div className='flex sm:flex-row flex-col mt-8'>
                                <button className='text-black text-sm px-3 py-2 rounded-md  border border-slate-800 bg-slate-300' >Order Initiated</button>
                                <button className='text-black text-sm sm:mt-0 mt-4 sm:ml-6 px-3 py-2 rounded-md bg-slate-300  border border-slate-800'>Order Confirmed</button>
                                <button className='text-black  text-sm sm:mt-0 mt-4 sm:ml-6 px-3 py-2 rounded-md bg-white border border-slate-800'>Order Shipped</button>
                                <button className='text-black  text-sm sm:mt-0 mt-4 sm:ml-6 px-3 py-2 rounded-md bg-white border border-slate-800'>Out for Delivery</button>
                                <button className='text-black  text-sm sm:mt-0 mt-4 sm:ml-6 px-3 py-2 rounded-md bg-white border border-slate-800'>Order Delivered</button>
                            </div>
                            </div>}

                        </div>
                    
                      
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Delivery Information</h3>
                        <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div class="flex flex-col justify-start items-start flex-shrink-0">
                                
                            <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4  mt-4 border-b border-gray-200 w-full">
                            <FaRegMoneyBillAlt className='text-xl' />

                                    <p class="cursor-pointer text-sm leading-5 ">₹ {data.amount}</p>
                                </div>
                                <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-2  mt-2 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p class="cursor-pointer text-sm leading-5 ">{data.userId}</p>
                                </div>
                                <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">

                                    <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                    <FaPhone />

                                    <p class="cursor-pointer text-sm leading-5 ">{data.address.phone}</p>
                                </div>
                            </div>
                            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                        <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{`${data.address.address} ${data.address.city}, ${data.address.state}, ${data.address.pincode}`}</p>
                                    </div>
                                    <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                        <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                        <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{`${data.address.address} ${data.address.city}, ${data.address.state}, ${data.address.pincode}`}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export async function getServerSideProps(context) {
    if(!mongoose.connections[0].readyState){
      
      await mongoose.connect(process.env.MONGO_URI)
  }
  
  let order = await Order.findOne({orderId:context.query.slug})
    
  
  const data = await JSON.parse(JSON.stringify(order))
    // console.log(data)
    return { props: {data} }
  }