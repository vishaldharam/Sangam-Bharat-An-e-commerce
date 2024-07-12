/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IoCloseSharp } from "react-icons/io5";

import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { RiShieldUserLine } from "react-icons/ri";
import { FiCodesandbox } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import jwt_decode from "jwt-decode";
import { set } from 'lodash';
import search from '../pages/Elastic/search'

const Navbar = ({ logout, user, keys, cart }) => {
  const router = useRouter()
  const [dropdown, setdropdown] = useState(false)
  const [input, setinput] = useState()
  const [result, setResult] = useState([])
  const toggledropdown = () => {
    setdropdown(true)
  }
  //  console.log(result[0].name)
  const [userInfo, setuserInfo] = useState()

  useEffect(() => {
    const USER_INFO = JSON.parse(localStorage.getItem("myuser"))
    if (USER_INFO) {
      const USER_NAME = USER_INFO["name"]
      const NAMES = USER_NAME.split(" ")
      if (NAMES[0].length > 8) setuserInfo(NAMES[0].substr(0, 8))
      else setuserInfo(NAMES[0])
    }



  }, [router.query])
  // const u = JSON.parse(userInfo.value)
  const getUser = () => {


  }
  const toggleClosedropdown = () => {
    setdropdown(false)
  }
  const check = () => {
    setdropdown(false)

    // console.log(dropdown)
    logout()
  }
  const handleClick = () => {
    if (dropdown) toggleClosedropdown()
    if (!dropdown) toggledropdown()
  }
  const ref = useRef()
  const handleChange = async(e)=>{

    if(e.target.name === 'input') setinput(e.target.value)
    //send the query to search
    try {
      const searchResults = await search(query);
      setResult(searchResults);
    } catch (error) {
      // Handle error
      console.error('Error during search:', error);
    }


    setResult([{
      name:"Vishal"
    },{
      name:"Sagar"
    }])
    
  }
  return (<>
    <div className='flex flex-col md:justify-start mt-3 xl:justify-center md:flex-row justify-center items-center py-0 md:mt-0 bg-lav shadow-sm sticky top-0 bg-white z-10'>
      <div className="logo">

        <Link href={'/'}><img src={'/Logo.PNG'} className='ml-5  min-w-[150px]' alt='Logo' width={200} height={40}></img>
        </Link>
      </div>


      <div className="flex px- md:px-5 sm:mt-2 sm:ml-2">
        <div className="flex rounded-l-sm  w-[290px]  md:w-[450px] sm:h-[51px] md:h-[45px] h-[46px] ml-2 mt-2  md:mx-0 my-1 md:my-1  ">
          <input type="text" id="esearch" placeholder="Search from our 1000+ products" name="input" value={input} onChange={handleChange}  autoComplete='off' className="w-full bg-slate-50  border-l border-t border-b border-blue-900 rounded-r-none focus:border-gray-500 focus:backdrop:-2 rounded-md  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="search my-2 sm:my-3 bg-gray-50 cursor-pointer border-r border-t border-b border-l py-[4px] sm:py-[7px] xl:py-[7px] px-[6px] rounded-r-md border-gray-500  md:ml-0   sm:mt-[8px] md:mt-[4px]">
          <CiSearch className='text-4xl  md:text-3xl' />
        </div>
        {result.length > 0 && input.length > 0 && <div onMouseOver={()=>{toggledropdown,setdropdown(false)}} onMouseLeave={()=>{toggleClosedropdown}} className='absolute z-10   bg-white divide-y divide-gray-100 min-w-[500px] rounded-lg shadow top-[100px] md:top-16 sm:top-[115px] dark:bg-gray-700'> <ul className='py-1    text-gray-700 dark:text-gray-200 min-w-[300px]'>
           
               {result.map((item)=>{
               return <><Link href={`/Search/${item.name}`}><li onClick={()=>{setinput(item.name),setResult([])}} className=''><div className="cursor-pointer flex  w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">{item.name}<div className='right-0 bottom-0'></div>
               </div></li></Link></>})}
              
            
          </ul></div>}


      </div>
      <div className="nav md:mr-4">
        <ul className='flex items-center  text-blue-950 space-x-3 md:space-x-6 font-bold mx-2 '>

          {user.value == null && <Link href={'/signin'}><li><button className='bg-white  border rounded-sm px-3 py-2 font-semibold shadow-sm hover:scale-95 ease-in-out cursor-pointer duration-100 text-md'>Login</button></li></Link>}
          {user.value && <li><div><div onClick={() => { handleClick, check }} onMouseOver={toggledropdown} onMouseLeave={toggleClosedropdown} className='bg-white border shadow-sm rounded-sm px-3 py-2 cursor-pointer font-medium hover:scale-95 ease-in-out duration-100 text-md flex item-center'><span>{userInfo}</span><span className='mt-1 ml-1 '>{!dropdown && <IoIosArrowDropdown className='text-lg' />} {dropdown && <IoIosArrowDropup className='text-lg' />} </span></div>
          
           {dropdown && <div onMouseOver={toggledropdown} onMouseLeave={toggleClosedropdown} className='absolute z-10   bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'> <ul className='py-2 font-semibold   text-gray-700 dark:text-gray-200'>
            <Link href={'/myaccount'}><li><div className=" cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><RiShieldUserLine className='mt-1 mr-2' />My Account</div></li></Link>
            <Link href={'/Orders'}><li><div className="cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><FiCodesandbox className='mt-1 font-bold mr-2' />My Orders</div></li></Link>
            <li><div onClick={check} className="cursor-pointer flex block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><IoLogOutOutline className='mt-1 mr-2 text-lg font-semibold' />Logout</div></li>
          </ul></div>}


          </div></li>}


          <Link href={'/Seller'}><li><button className='bg-white border shadow-sm rounded-sm px-3 py-2 font-semibold hover:scale-95 ease-in-out duration-100 text-md'>Become a Seller</button></li></Link>
          <div className='flex'><Link href={'/'} ><IoHomeOutline className='text-3xl md:text-2xl' /></Link>
          </div>



          <div className=" nav md:mr-4">
            <Link href={'/cart'}><ul className='flex items-center  text-blue-950 space-x-0  font-bold  '>
              <li className=''><BsCart3 className='text-3xl md:text-2xl ' /></li>

              <li className='mb-[25px] '> <span className="font-medium bg-orange-300 rounded-full py-[3px] text-xs px-[6px] md:px-[8px] mx-0">{Object.keys(cart).length}</span></li>


            </ul></Link></div>

        </ul>

      </div>


    </div>


  </>
  )
}

export default Navbar