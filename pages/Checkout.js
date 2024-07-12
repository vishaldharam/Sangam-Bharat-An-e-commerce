/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { MdPayments } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Order from "../models/order"
import Products from "../models/product"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';


const Checkout = ({ cart, removeItemInCart, addQty, removeQty, subtotal, clearCart }) => {
    const router = useRouter()


    const [valid, setvalid] = useState(true);
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [pincode, setpincode] = useState('')
    const [state, setstate] = useState('')
    const [city, setcity] = useState('')

    const GETUSER = async () => {
        const USER_INFO = await JSON.parse(localStorage.getItem("myuser"))
        const USER_EMAIL = USER_INFO["email"]
        const RESPONSE = await fetch("http://localhost:3000/api/getuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ USER_EMAIL }),
        });
        let USER_DATA = await RESPONSE.json()
        setemail(USER_DATA.USER["email"])
        setname(USER_DATA.USER["name"])
        setaddress(USER_DATA.USER["address"])
        setphone(USER_DATA.USER["phone"])
        if(USER_DATA.USER["pincode"]) setpincode(USER_DATA.USER["pincode"])
        const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        const pinJson = await data.json()
        const pinData = pinJson.pinData

        if(USER_DATA.USER["pincode"]) setstate(pinData[USER_DATA.USER["pincode"]][1])
        if(USER_DATA.USER["pincode"]) setcity(pinData[USER_DATA.USER["pincode"]][0])

    }
        useEffect(() => {

            GETUSER()

        }, [router.query])

        const onChange = async (e) => {

            if (e.target.name === 'name') setname(e.target.value)
            // if (e.target.name === 'email') setemail(e.target.value)
            if (e.target.name === 'address') setaddress(e.target.value)
            if (e.target.name === 'phone') setphone(e.target.value)
            if (e.target.name === 'Pincode') {
                setpincode(e.target.value)
                const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
                const pinJson = await data.json()
                const pinData = pinJson.pinData
                if ((e.target.value.length === 6) && (Object.keys(pinData).includes(e.target.value))) {
                    setstate(pinData[e.target.value][1])
                    setcity(pinData[e.target.value][0])
                }
                else if (e.target.value.length === 6) {
                    toast.error('Delivery service is unavailable to this pincode', {
                        position: "top-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });
                    setstate('')
                    setcity('')
                }
                else {
                    setstate('')
                    setcity('')
                }
            }
            if (e.target.name === 'city') setcity(e.target.value)
            if (e.target.name === 'state') setstate(e.target.value)

            if (email.length > 0 && name.length > 0 && address.length > 0 && phone.length > 0 && pincode.length > 0) {
                setvalid(false);
            }
            else {
                setvalid(true)
            }

        }


        const makePayment = async (cart) => {


            //check wheather the cart is tampered..

            const cartItems = JSON.parse(localStorage.getItem("cart"))
            const finalTotal = subtotal - (parseInt((subtotal / 100)) * 10)
            const data = await fetch("http://localhost:3000/api/isTampered", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems, finalTotal }),
            });
            const tampered = await data.json()
            // console.log(tampered.status)
            if (tampered.status) {
                clearCart()
                toast.error('Some of the item prices have changed!', {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                });
            }
            else {





                //check the available quantity or out of stock
                const outOfStock = await fetch("http://localhost:3000/api/outOfStock", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartItems }),
                });

                const isIt = await outOfStock.json();
                if (isIt.status) {
                    toast.error('Some of the items in your buying list are out of stock', {
                        position: "top-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                    });
                }
                else {


                    // "use server"
                    const key = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;
                    // console.log(key);
                    // console.log(cart)
                    // Make API call to the serverless API
                    const finalAddress = { phone, address, pincode, city, state }
                    const id = email
                    const data = await fetch("http://localhost:3000/api/razorpay", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ cart, finalTotal, finalAddress, id }),
                    });
                    const { order } = await data.json();
                    // console.log(order);
                    const options = {
                        key: key,
                        name: "Sangam Bharat",
                        currency: order.currency,
                        amount: order.amount,
                        order_id: order.id,
                        description: order.notes,
                        // image: logoBase64,
                        handler: async function (response) {
                            // if (response.length==0) return <Loading/>;
                            console.log(response);

                            const data = await fetch("http://localhost:3000/api/paymentverify", {
                                method: "POST",
                                // headers: {
                                //   // Authorization: 'YOUR_AUTH_HERE'
                                // },
                                body: JSON.stringify({
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                    orderCart: cart
                                }),
                            });



                            const res = await data.json();

                            // console.log("response verify==",res)

                            if (res?.message == "success") {


                                console.log("redirected.......")
                                await router.push(`Order/${response.razorpay_order_id}`)
                                clearCart()

                            }
                            else {
                                await Order.findOneAndUpdate({ orderId: res.razorpay_order_id }, { status: "Failed" })
                            }

                            // Validate payment at server - using webhooks is a better idea.
                            // alert(response.razorpay_payment_id);
                            // alert(response.razorpay_order_id);
                            // alert(response.razorpay_signature);
                        },
                        prefill: {
                            name: "Sangam Bharat",
                            email: "vishal.dharam20@pccoepune.org",
                            contact: "9763461689",
                        },
                    };

                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();

                    paymentObject.on("payment.failed", async function (response) {
                        // console.log(order.id)
                        const data = await fetch("http://localhost:3000/api/ifpaymentfailed", {
                            method: "POST",
                            // headers: {
                            //   // Authorization: 'YOUR_AUTH_HERE'
                            // },
                            body: JSON.stringify({
                                orderID: order.id,
                                id: "8549fjkdjkfhgf"
                            }),
                        });

                        const d = await data.json()
                        if (d.message === 'success') {
                            router.push(`Order/${order.id}`)
                        }


                        //   console.log(data);
                    });
                }
            }
        };


        return (
            <div className='container mx-auto px-1 bg-white pt-2 pb-10'>
                <ToastContainer

                />
                <h1 className='text-center font-semibold my-2 mt-6 sm:text-2xl'>Checkout</h1>
                <h2 className='mx-3 sm:mx-28 font-bold text-sm'>1.Delivery Details</h2>
                <div className="mx- sm:mx-28 flex">
                    <div className='px-2 w-1/2'>
                        <div className=" mb-1">
                            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                            <input type="name" id="name" onChange={onChange} name="name" value={name} className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className=" mb-1">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" onChange={onChange} value={email} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                </div>
                <div className="sm:mx-28 flex">
                    <div className='px-2 w-full'>
                        <div className=" mb-1">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-600">Address</label>
                            <textarea type="text" rows={2} onChange={onChange} id="state" name="address" value={address} className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                </div>
                <div className="sm:mx-28 flex">
                    <div className='px-2 w-1/2'>
                        <div className=" mb-1">
                            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                            <input type="phone" id="phone" onChange={onChange} value={phone} name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className=" mb-1">
                            <label htmlFor="Pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                            <input type="text" id="Pincode" onChange={onChange} value={pincode} name="Pincode" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>


                </div>
                <div className="sm:mx-28 flex">
                    <div className='px-2 w-1/2'>
                        <div className=" mb-1">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                            <input type="text" id="city" onChange={onChange} name="city" value={city} className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='px-2 w-1/2'>
                        <div className=" mb-1">
                            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                            <input type="text" id="state" onChange={onChange} value={state} name="state" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                </div>
                <h2 className='mx-3 sm:mx-28 mt-2 font-bold text-sm'>2.Review Cart</h2>
                <div className="max-w-md mx-auto sm:ml-28 ml-3 bg-white rounded-lg  md:max-w-5xl">
                    {(Object.keys(cart).length === 0) && <section className="text-white body-font">
                        <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
                            <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-5 object-cover object-center rounded" alt="hero" src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" />
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
                    {(Object.keys(cart).length !== 0) && <> <div className="md:flex " key={parseInt(Math.random() * 1000)}>
                        <div className="w-full " key={parseInt(Math.random() * 1000)} >

                            <div className="md:grid md:grid-cols-3 gap-2 ">

                                <div className="col-span-2 ">


                                    {Object.keys(cart).length === 0 && <h1 className="text-2xl  text-center text-blue-950 font-bold">Cart is empty</h1>

                                    }
                                    {cart && Object.keys(cart).map((k) => {
                                        return (<><div className="flex justify-between  mt-2  pt-6 " key={parseInt(Math.random() * 10000)} >
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
                                    <div className="flex justify-start items-startsm-ml-0 ml-3 mt-4">
                                        <span className="md:text-lg font-sm text-gray-400 mr-1">Subtotal:</span>
                                        <span className="md:text-lg font-sm text-gray-800 "> ₹ {subtotal}</span>

                                    </div>



                                </div></div></div>




                    </div>
                        <div className='container mx-auto'> <div className="justify-center mx-auto">
                            <button disabled={valid} onClick={() => {
                                makePayment(cart, subtotal - (parseInt((subtotal / 100)) * 10));
                            }} className=" h-12 mt-6 justify-center mx-auto w-[180px] bg-orange-500 rounded  text-white disabled:bg-orange-200 hover:bg-orange-600"><div className='flex' ><MdPayments className='text-2xl  ml-4 ' /><span className=' ml-2' >Pay</span><span className=' ml-2' >₹  {subtotal - (parseInt((subtotal / 100)) * 10)}</span></div></button>
                        </div></div></>
                    }
                </div></div>
        )
    }

    export default Checkout