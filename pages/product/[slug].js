/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { BsCart3 } from "react-icons/bs";
import Error from 'next/error'

import { useState, useEffect } from 'react';
import product from "../../models/product"
import mongoose, { set } from "mongoose";
import Link from 'next/link';
import { IoCartSharp } from "react-icons/io5";
import { FaBolt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Page({ addItemsInCart, data, variantData, buyNow, error }) {
  const router = useRouter()
  const [product, setproduct] = useState(data)
  const [pin, setpin] = useState()
  const [service, setservice] = useState()
  const [imgSrc, setimgSrc] = useState(data.images[0])
  const slug = useRouter.query
  const checkService = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    const pinJson = await data.json()
    const pinData = pinJson.pinData
    // console.log(pinData)
    if (Object.keys(pinData).includes(pin)) {
      setservice(true)
    }
    else {

      setservice(false)
    }
  }
  const notify = () => {
    toast.success('Item added to cart', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    });
  }
  useEffect(() => {

    setproduct(data)

  }, [router.query])

  // console.log(variantData.black.slug)
  async function onColor(setColor) {
    console.log(variantData[setColor]['slug']);
    router.push(`${process.env.NEXT_PUBLIC_HOST}/product/${variantData[setColor]['slug']}`);

  }
  const onChange = (e) => {
    setpin(e.target.value)
  }
  // console.log(error)
  if (error) {
    return <Error statusCode={error} />
  }
  const handleImagesChange = (src) =>{
      setimgSrc(src);
  }

  console.log(product)

  return <> <section className="text-gray-600 body-font overflow-hidden pb-10  bg-white">
    <ToastContainer

    />

    <div className="container px-2 py-3  md:py-5 pb-10 mx-auto">
      <div className="lg:w-full ml-2  flex flex-wrap">
        <div className='lg:w-[8%]'>
          <ol className='md:flex-col flex lg:flex-col xl:flex-col '>

            {product && product.images.map((item) => {
              return (<><li onClick={()=>{handleImagesChange(item)}} className='mx-1 my-[8px] w-[80px] h-[70px]'><img alt="sangam" className=' p-1 border-slate-200 hover: cursor-pointer w-full h-full' src={`../images/${item}`} /></li>
              </>)
            })}

          </ol>
        </div>
        <div className=' lg:w-[42%] w-{full}  mt-2 md:mt-1 lg:h-[480px] h-full object-cover rounded'>
          <img className="w-full border-2 p-2 border-slate-200 shadow-lg lg:h-[420px]"
            src={`../images/${imgSrc && imgSrc}`} alt='imgSrc' />
           
           <div className="lg:w-full my-4  flex md:flex-row flex-col">


            <button className=" md:w-[48%] text-5sm  font-semibold  text-white cursor-pointer bg-amber-500 border-0 py-5  disabled:bg-amber-200  px-7 focus:outline-none hover:bg-yellow-600 rounded-sm"
              disabled={product && product.quantity === 0 } onClick={() => { addItemsInCart(product && product.slug, product && product.images[0], product && product.title, product && product.price, 1), notify() }}><div className='flex justify-center '><IoCartSharp className='mt-[1px] text-xl ' /><span className='ml-2 '> ADD TO CART</span></div> </button>
            <button disabled={product && product.quantity === 0 }  onClick={() => { buyNow(product && product.slug, product && product.images[0], product && product.title, product && product.price, 1) }} className="cursor-pointer md:w-[49%] mt-3 md:mt-0 text-5sm  font-semibold  text-white disabled:bg-orange-300 bg-orange-600 border-0 py-5 md:ml-2 px-7 focus:outline-none hover:bg-orange-600 rounded-sm">
              <div className='flex justify-center'><FaBolt className='mt-[1px] text-xl  ' /><span className='ml-2'> BUY NOW</span></div>

            </button>
          </div>
          
        </div>
        <div className="lg:w-[48%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">{product && product.subCategory}</h2>
          <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product && product.title} ( {product && product.age} ) {product && product.size} cm </h1>
          <div className="flex mb-4">
            <span className="flex items-center">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-6 h-6 text-green-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-6 h-6 text-green-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-6 h-6 text-green-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-6 h-6 text-green-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" className="w-6 h-6 text-green-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="text-gray-600 ml-3">4 Reviews</span>
            </span>

          </div>
          {product && product.quantity === 0 && <span className="title-font font-bold  text-2xl text-gray-900">Out of Stock</span>}
          {product && product.quantity > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹ {product && product.price}</span>}
          <p className="leading-relaxed mt-2">{product && product.desc}</p>

          <p className="leading-relaxed mt-2">Age: {product && product.age}</p>

          <div className={`flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 `}>
            <div className="flex">
              <span className="mr-3">Color</span>


              {("white" in variantData) && <Link href={`/product/${variantData["white"]['slug']}`}><button className={`border border-black bg-white rounded-full ${product.color === "white" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "white" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

              {("black" in variantData) && <Link href={`/product/${variantData["black"]['slug']}`}> <button className={` bg-gray-800 rounded-full ${product.color === "black" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "black" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

              {("golden" in variantData) && <Link href={`/product/${variantData["golden"]['slug']}`}><button className={`border border-black bg-orange-100 rounded-full  ${product.color === "golden" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "golden" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

              {("brown" in variantData) && <Link href={`/product/${variantData["brown"]['slug']}`}><button className={`bg-yellow-700 rounded-full  ${product.color === "brown" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "brown" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

              {("red" in variantData) && <Link href={`/product/${variantData["red"]['slug']}`}> <button className={`bg-red-600 rounded-full  ${product.color === "red" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "red" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

              {("green" in variantData) && <Link href={`/product/${variantData["green"]['slug']}`}><button className={`bg-green-600 rounded-full  ${product.color === "green" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "green" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

              {("yellow" in variantData) && <Link href={`/product/${variantData["yellow"]['slug']}`}><button className={`bg-yellow-500 rounded-full  ${product.color === "yellow" ? 'w-8 h-8' : 'w-6 h-6'} hover:scale-110 duration-200 ${product.color === "yellow" ? 'mx-1' : 'mx-1 mt-1'}`}></button></Link>}

            </div>
            <div className="flex ml-6 items-center">
              <span className="mr-3">Size</span>
              <div className="relative">
                <div className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-3">
                  <option>{product && product.size}</option>

                </div>

              </div>
            </div>
          </div>
          <div className="flex mt-3">

            <input type='text' onChange={onChange} className='px-2 py-1 w-[200px] h-[38px] border-2 border-slate-300 rounded' name='pin' placeholder='Enter the pincode'></input>
            <button className="flex ml-2 text-white bg-gray-400 border-0 py-1  px-3 focus:outline-none hover:bg-gray-600 rounded" onClick={checkService}>Check</button>

          </div>
          {(service != null && !service) && <div className='mt-2'>
            <span className="title-font font-medium mt-5 text-sm text-red-600">Sorry, Dilevary service is not available on this pincode</span>
          </div>}
          {(service != null && service) && <div className='mt-2'>
            <span className="title-font font-medium mt-5 text-sm text-green-600">Dilevary service is available on this pincode</span>
          </div>}


        </div>
      </div>
    </div>
  </section></>
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {

    await mongoose.connect(process.env.MONGO_URI)
  }

  let products = await product.findOne({ slug: context.query.slug })
  let variants = await product.find({ title: products && products.title })

  let allVariants = {}
  if(products === null) return {props: {error:"404"}}
  // console.log(product  s)
  for (let item of variants) {
    allVariants[item.color] = {}
    allVariants[item.color] = item
  }

  let data = await JSON.parse(JSON.stringify(products))
  let variantData = await JSON.parse(JSON.stringify(allVariants))
  const key = Object.keys(variantData)
  // console.log(data)
  return { props: { data, variantData } }
}
