/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import product from "../models/product"
import mongoose from "mongoose";
const birds = ({data}) => {
  return (
    <>
    <section className="text-black body-font  ">
   <div className="container mt-2 sm:py-2 py-0 bg-white px-2 mx-auto">
       
       <div id="slider" className='bg-white min-h-[115px] relative flex flex-row  justify-start md:justify-start lg:justify-center xl:justify-center w-[100%] z-auto scrollbar-hide overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
       {/* <div id="slider" className='  py-0 w-full m-auto h-full scrollbar-hide overflow-x-scroll scroll whitespace-nowrap scroll-smooth'> */}

         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2 sm:mx-10 md:ml-4 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'parakeet.webp'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 title-font text-md font-medium">Parakeets</p>

         </div></Link>
         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2 sm:mx-10 md:ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'cockatiel.jpg'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 md:mt-0 title-font text-md font-medium">Cockatiels</p>

         </div></Link>
         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2  sm:mx-10 md:ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'pegion.jpg'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 title-font text-md font-medium">Pigeon</p>

         </div></Link>
         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2 sm:mx-10 md:ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'lovebirds.webp'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 title-font text-md font-medium">Lovebirds</p>

         </div></Link>
         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2 sm:mx-10 md:ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'macaw.jpg'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 title-font text-md font-medium">Hyacinth Macaws</p>

         </div></Link>
         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2 sm:mx-10 md:ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'parrot.jpg'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 title-font text-md font-medium">Parrot</p>

         </div></Link>
         <Link href={'/dog'}><div className='md:w-[120px] rounded-sm md:h-[70px] w-[100px] h-[80px] inline-block p- md:p-0 m-2 sm:mx-10 md:ml-2 cursor-pointer hover:scale-105 ease-in-out duration-300 bg-white  rounded-b-lg'>
           <img src={'hens.jpg'} className='w-[120px]  rounded-sm md:h-[80px] h-[60px]' alt='' ></img>
           <p className="text-center sm:mt-0  mt-1 title-font text-md font-medium">Hens </p>

         </div></Link>
      
      
         
       </div>
       
     </div>
     </section>
     <section className="text-gray-600 body-font mb-2 mt-2 ">
  <div className="container mx-auto">
    <div className="flex flex-wrap mx-auto ">
      <img src="aaaa.jpg" className='md:h-[70px] h-[30px] md:w-full w-[400px]' alt="aliya" />
    </div>
  </div>
</section>

         <section className="text-gray-600 body-font">
 <div className="container px-5 py-5 bg-slate-50 pb-20  mx-auto">
   <div className="flex flex-wrap -m-4 bg-slate-50 justify-center ">
    
     {Object.keys(data).map((item)=>{ return (<><div key={data[item].slug} className="lg:w-1/5 bg-white md:w-1/2 px-2 py-2 md:px-3 md:py-3 rounded shadow-md m-4   w-full">
       <div className="block relative h-48 rounded overflow-hidden">
       <Link href={`product/${data[item].slug}`}>
         <img alt="ecommerce" className=" object-fill p-1 w-full h-full block" src={data[item].images[0]}/></Link>
       </div>
       <div className="mt-2 ml-1 pb-6 justify-center">
       <Link href={`product/${data[item].slug}`}>
         <h3 className="text-gray-500 text-xs tracking-widest title-font ">{data[item].subCategory}</h3>
         <h2 className="text-gray-900 title-font text-md font-medium">{data[item].title}</h2>
         <p className="mt-1">₹ {data[item].price} <span className='border border-slate-500 px-1 ml-2 text-sm'>{data[item].age}</span></p>
         <p className="mt-1 ml-1 "></p>
         <div className="flex  items-center mt-1 mb-1">
          <div className="flex">
         
            {data[item].color.includes("white") && <button className="border border-black bg-white rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            {data[item].color.includes("black") && <button className=" bg-gray-800 rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            {data[item].color.includes("golden") && <button className="border border-black bg-orange-100 rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            {data[item].color.includes("brown") && <button className=" bg-yellow-700 rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            {data[item].color.includes("red") && <button className=" bg-red-500 rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            {data[item].color.includes("green") && <button className=" bg-green-500 rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            {data[item].color.includes("yellow") && <button className=" bg-yellow-500 rounded-full w-4 h-4 hover:scale-110 duration-200 mx-1 mt-1"></button>}
            
          </div></div>
        
         </Link>
       </div>
     </div></>)})}
     
     
   </div>
 </div>
</section>
 </>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    
    await mongoose.connect(process.env.MONGO_URI)
}

let products = await product.find({category:"Birds"})
let allAnimals = {}
for(let item of products){
  if(item.title in allAnimals){
        if(item.quantity > 0){
       allAnimals[item.title].color.push(item.color)
        }
    
  }
  else{
    allAnimals[item.title] = JSON.parse(JSON.stringify(item))
    if(item.quantity > 0){
 
      allAnimals[item.title].color = [item.color]
    }
    
    
    

  }
}
  let data = await JSON.parse(JSON.stringify(allAnimals))
  const key = Object.keys(data)
  console.log(data[key[0]].images)
 return { props: {data} }
}
export default birds