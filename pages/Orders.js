/* eslint-disable @next/next/no-img-element */
import React, { useEffect,useState } from 'react'
import mongoose from "mongoose";
import Link from 'next/link';

const Orders = () => {
    const [data, setdata] = useState()
    const getUser = async()=>{
        const USER_INFO = await JSON.parse(localStorage.getItem("myuser"))
        const USER_EMAIL = USER_INFO["email"]
        const RESPONSE = await fetch("http://localhost:3000/api/getOrders", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ USER_EMAIL,ALL:false }),
            });
        let ORDER_DATA = await RESPONSE.json()
        const data_ = ORDER_DATA.ORDERS
        const data = data_.reverse()
        setdata(data)

    }
    useEffect(() => {
        
    getUser()
  
    }, [])
    
  return (
    <div>
    <div className="bg-white container p-8 rounded-md w-full">
        <div className=" flex items-center justify-center pb-6">
            {data && data.length === 0 && <div className='item-center text-center'>
                <h2 className="text-gray-900 item-center text-xl text-center font-bold">No Orders to show</h2>
                
            </div>}
            {data && data.length !== 0 && <div className='item-center text-center'>
                <h2 className="text-gray-900 item-center text-2xl text-center font-bold">My Orders</h2>
                <span className="text-xs"></span>
            </div>}
          
            </div>
            {data && <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 pb-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Order Id 
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Payment 
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Delivery 
                                    </th>
                                   
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((item)=>{
                                    let keys = Object.keys(item.products)
                                    return <><tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link href={`/Order/${item.orderId}`}><span className="relative">#{item.orderId}</span></Link>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link href={`/Order/${item.orderId}`}> {(item.status === 'Paid') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Paid</span>
                                        </span>}
                                    {(item.status === 'Failed') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Failed</span>
                                        </span>}
                                        {(item.status === 'Pending') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-blue-300 opacity-50 rounded-full"></span>
                                        <span className="relative">Pending</span>
                                        </span>}
                                        {(item.status === 'Cancelled') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-blue-300 opacity-50 rounded-full"></span>
                                        <span className="relative">Refund Processing</span>
                                        </span>}</Link>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link href={`/Order/${item.orderId}`}> {(item.status === 'Paid') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-yellow-600 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Processing</span>
                                        </span>}
                                        {(item.status === 'Failed') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Cancelled</span>
                                        </span>}
                                        {(item.status === 'Pending') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Cant Delivered</span>
                                        </span>}
                                        {(item.status === 'Cancelled') && <span
                                            className="relative inline-block px-3 py-1 font-semibold text-red-600 leading-tight">
                                            <span aria-hidden
                                                className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Cancelled</span>
                                        </span>}</Link>
                                    </td>
                                   
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link href={`/Order/${item.orderId}`}><p className="text-gray-900 whitespace-no-wrap">
                                    {item.createdAt}
                                        </p></Link>
                                    </td>
                                </tr></>})}
                                
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>}
        </div></div>
  )
}

export default Orders