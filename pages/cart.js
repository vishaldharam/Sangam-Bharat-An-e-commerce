/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Link from 'next/link';
import { useRouter } from 'next/router';

const cart = ({ cart, removeItemInCart, addQty, removeQty, subtotal, clearCart }) => {
    // console.log(cart,removeItemInCart,addQty,removeQty,subtotal,clearCart);
    const router  = useRouter()
    const HANDLE_CHECKOUT = async() =>{
        
        const myuser = localStorage.getItem('myuser')
        if(!myuser){
            router.push('/signin')
        }
      
            router.push('/Checkout')
        
    }
    return (
     <div className='container bg-white '>
            <div className="overflow-y-scroll mb-10 pt-8  bg-white ">
                <div className="pb-20 ">


                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg  md:max-w-5xl">
                    {(Object.keys(cart).length === 0) &&   <section className="text-white body-font">
                            <div className="container mx-auto flex px-5  pb-8 items-center justify-center flex-col">
                                <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded" alt="hero" src="cart.webp" />
                                <div className="text-center lg:w-2/3 w-full">
                                    <h1 className="title-font sm:text-xl text-xl mb-1 font-medium text-gray-900">Your cart is empty!</h1>
                                    <p className="mb-4 leading-relaxed text-black">Add items to it now.</p>
                                    <div className="flex justify-center">
                                       <Link href={'/'}> <button className="inline-flex text-white bg-orange-500 border-0 py-2 md:px-16 px-10 focus:outline-none hover:bg-orange-600 rounded-sm text-lg" >Shop Now</button>
                                       </Link>
                                    </div>
                                </div>

                            </div>
                        </section>}
                        {(Object.keys(cart).length !== 0) && <div className="md:flex ">
                            <div className="w-full p-4 px-5 py-5 md:bg-gray-100 bg-slate-50">

                                <div className="md:grid md:grid-cols-3 gap-2 ">

                                    <div className="col-span-2 p-5">

                                        <h1 className="text-2xl  text-center text-blue-950 font-bold">Shopping Cart</h1>
                                        {Object.keys(cart).length === 0 && <h1 className="text-2xl  text-center text-blue-950 font-bold">Cart is empty</h1>

                                        }
                                        {cart && Object.keys(cart).map((k) => {
                                            return (<><div className="flex justify-between  mt-6 pt-6 " key={k} >
                                                <div className="flex  items-center">

                                                    <img src={`images/${cart[k].image_url}`} alt="sangam" width="60" className="rounded " />

                                                    <div className="flex flex-col ml-4 ">
                                                        <span className="md:text-md font-medium">{cart[k].name} </span>

                                                    </div>
                                                </div>
                                                <div className="flex-col  md:flex-row  lg:flex xl:flex justify-center md:ml-0 
                                        ml-16   items-center">

                                                    <div className="pr-4 flex ">
                                                        <span className="font-semibold cursor-pointer" onClick={() => {
                                                            removeQty(k)
                                                        }}><FiMinus className='my-1' /></span>
                                                        <span className="font-medium bg-gray-200 text-sm px-2 mx-3">{cart[k].qty}</span>

                                                        <span className="font-bold cursor-pointer" onClick={() => {
                                                            addQty(k)
                                                        }}><IoMdAdd className='my-1' /></span>
                                                    </div>

                                                    <div className="pr-4 md:my-0 lg:my-0 xl:my-0 my-3 ">

                                                        <span className="text-xs font-medium">₹ {cart[k].price}</span>
                                                    </div>
                                                    <div className="pr-2 ">

                                                        <span className="text-xl font-bold text-blue-900 cursor-pointer" onClick={() => {
                                                            removeItemInCart(k)
                                                        }}>< CiCircleRemove className=' font-bold mt-1' />
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <i className="fa fa-close text-xs font-medium"></i>
                                                    </div>

                                                </div>

                                            </div></>)
                                        })}














                                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                                            <div className="flex items-center">
                                                <i className="fa fa-arrow-left text-sm pr-2"></i>
                                                <span className="text-md  font-sm text-blue-500">Continue Shopping</span>
                                            </div>

                                            <div className="flex justify-center items-end">
                                                <span className="md:text-lg font-sm text-gray-400 mr-1">Subtotal:</span>
                                                <span className="md:text-lg font-sm text-gray-800 "> ₹ {subtotal}</span>

                                            </div>

                                        </div>









                                    </div>
                                    <div className=" p-5 bg-white rounded overflow-visible">

                                        <span className="text-xl font-medium text-gray-500 block pb-3">Price Details</span>


                                        <div className="overflow-visible flex justify-between items-center mt-2">











                                        </div>




                                        <div className="flex justify-center flex-col pt-3">
                                            <span className="md:text-lg font-sm text-gray-500 mr-1">Price:<span className='text-black'> ₹ {subtotal}</span></span>
                                            <span className="md:text-lg font-sm text-gray-500 mr-1">Price Discount:  <span className='text-green-800 '>-₹ {parseInt((subtotal / 100)) * 10} (10% Off)</span></span>
                                            <span className="md:text-lg font-sm text-gray-500 mr-1">Price Discount:  <span className='text-black'> ₹ {subtotal - (parseInt((subtotal / 100)) * 10)}</span></span>

                                        </div>










               <button onClick={HANDLE_CHECKOUT} className="h-12 mt-10 w-full bg-orange-500 rounded focus:outline-none text-white hover:bg-orange-600">Check Out</button>
                                       

                                        <button className="h-12 mt-5 w-full bg-gray-500 rounded focus:outline-none text-white hover:bg-slate-600" onClick={clearCart}>Clear Cart</button>








                                    </div>


                                </div>


                            </div>
                        </div>}
                    </div>
                </div>
            </div></div>
    )
}

export default cart