/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdSystemUpdateAlt } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const myaccount = () => {

const router = useRouter()

    const [IS_PROFILE_EDITABLE, setIS_PROFILE_EDITABLE] = useState(false)
    const [UPDATEPASS, setUPDATEPASS] = useState(false)

    const MAKE_PROFILE_EDITABLE = () => {
        setIS_PROFILE_EDITABLE(true)
    }


    const MAKE_PASSWORD_EDITABLE = () => {
        setIS_PASSWORD_EDITABLE(true)
    }
    const [NAME, setNAME] = useState('')
    const [EMAIL, setEMAIL] = useState('')
    const [ADDRESS, setADDRESS] = useState('')
    const [PHONE, setPHONE] = useState('')
    const [PINCODE, setPINCODE] = useState('')
    const [PASSWORD, setPASSWORD] = useState('')
    const [CPASSWORD, setCPASSWORD] = useState('')
    const [CUPASSWORD, setCUPASSWORD] = useState('')
    const [NOTMATCHED, setNOTMATCHED] = useState(false)

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
        setEMAIL(USER_DATA.USER["email"])
        setNAME(USER_DATA.USER["name"])
        setADDRESS(USER_DATA.USER["address"])
        setPHONE(USER_DATA.USER["phone"])
        setPINCODE(USER_DATA.USER["pincode"])

    }

    useEffect(() => {
        GETUSER()


    }, [])


    const HANDLE_ON_CHANGE = (e) => {
        if (e.target.name == 'name' && IS_PROFILE_EDITABLE) {
            setNAME(e.target.value)
        }
        if (e.target.name == 'phone' && IS_PROFILE_EDITABLE) {
            setPHONE(e.target.value)
        }
        if (e.target.name == 'address' && IS_PROFILE_EDITABLE) {
            setADDRESS(e.target.value)
        }
        if (e.target.name == 'pincode' && IS_PROFILE_EDITABLE) {
            setPINCODE(e.target.value)
        }
        if (e.target.name == 'password'  && UPDATEPASS) {
            setPASSWORD(e.target.value)
        }
        if (e.target.name == 'cpassword' && UPDATEPASS) {
            setCPASSWORD(e.target.value)
        }
        if (e.target.name == 'cupassword'  && !UPDATEPASS) {
            setCUPASSWORD(e.target.value)
        }

    }

    const HANDLE_UPDATE_PROFILE = async () => {
        
        const RESPONSE = await fetch("http://localhost:3000/api/updateUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({EMAIL,NAME,ADDRESS,PINCODE,PHONE}),
        });
        let MESSAGE = await RESPONSE.json()
        if(MESSAGE.message === 'success'){
            toast.success('Profile is updated', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:'light'
                });
                setIS_PROFILE_EDITABLE(false)
        }
    }
    const HANDLE_SUBMIT = async() =>{
        const RESPONSE = await fetch("http://localhost:3000/api/checkPassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({EMAIL,CUPASSWORD}),
        });
        let MESSAGE = await RESPONSE.json()
        if(MESSAGE.message){
            setNOTMATCHED(false)
            setUPDATEPASS(true)
        }
        else{
            setNOTMATCHED(true)
        }
    }

    const HANDLE_UPDATE = async() =>{
        // console.log(PASSWORD,'  ',CPASSWORD)
        if(PASSWORD === CPASSWORD){
            const RESPONSE = await fetch("http://localhost:3000/api/updatePassword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({EMAIL,PASSWORD}),
        });
        let MESSAGE = await RESPONSE.json()
        if(MESSAGE.message){
            toast.success('Password is updated', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:'light'
                });
            setUPDATEPASS(false)
        }
        }
        else{
            toast.error('Password not matched', {
                position: "top-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:'light'
                });
            
        }
    }
    return (
        <>
            <section class="bg-white dark:bg-gray-900">
            <ToastContainer/>
                <div class="max-w-[70rem] px-4 pt-8 mx-auto lg:pt-8">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">1. User Profile</h2>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">

                            <div class="w-full">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" value={NAME} onChange={HANDLE_ON_CHANGE} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" Name" requislate="" />
                            </div>
                            <div class="w-full">
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email (*)</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readOnly={true} value={EMAIL} requislate="" />
                            </div>
                            <div class="sm:col-span-2">
                                <label for="Address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input type="text" name="address" value={ADDRESS} onChange={HANDLE_ON_CHANGE} id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Address" required="" />
                            </div>
                            <div class="w-full">
                                <label for="Phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input type="text" name="phone" id="phone" value={PHONE} onChange={HANDLE_ON_CHANGE} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" Phone" requislate="" />

                            </div>
                            <div class="w-full">
                                <label for="Pincode" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                                <input type="text" name="pincode" id="pincode" value={PINCODE} onChange={HANDLE_ON_CHANGE} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" Pincode" requislate="" />

                            </div>


                        </div>
                        <div class="flex items-center space-x-4">
                            <button type="button" onClick={HANDLE_UPDATE_PROFILE} disabled={!IS_PROFILE_EDITABLE} class="text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none disabled:bg-orange-300 bg-amber-600 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <MdSystemUpdateAlt class="w-5 h-5 mr-1 -ml-1" />

                                Update Profile
                            </button>
                            <button type="button" disabled={IS_PROFILE_EDITABLE} onClick={MAKE_PROFILE_EDITABLE} class="text-slate-600 inline-flex items-center hover:text-white border border-slate-600 hover:bg-slate-600 focus:ring-4 focus:outline-none disabled:bg-slate-300 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-900">

                                <CiEdit class="w-5 h-5 mr-1 -ml-1" />

                                Edit Profile
                            </button>
                        </div>
                    </form>
                </div>
                <div class="max-w-[70rem] px-4 py-6 mx-auto lg:py-6">
                    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">2. Change Password</h2>
                   <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                   <div class="w-full">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                <input type="password" name="cupassword" value={CUPASSWORD} onChange={HANDLE_ON_CHANGE} id="cupassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" Enter your current password" requislate="" />
                            </div>
                    
                            
                   </div>
                   {NOTMATCHED && <div className='text-red-600 pb-3 '>Incorrect password</div>}
                   {!UPDATEPASS && <button type="button" disabled={UPDATEPASS} onClick={HANDLE_SUBMIT} class="text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none disabled:bg-orange-300 bg-amber-600 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <MdSystemUpdateAlt class="w-5 h-5 mr-1 -ml-1" />

                                Submit
                            </button>}
                    {UPDATEPASS && <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2 my-5 sm:gap-6 sm:mb-5">

                            <div class="w-full">
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                <input type="password" name="password" value={PASSWORD} onChange={HANDLE_ON_CHANGE} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" password" requislate="" />
                            </div>
                            <div class="w-full">
                                <label for="cpassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" name="cpassword" value={CPASSWORD} onChange={HANDLE_ON_CHANGE} id="cpassword" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder=" confirm password" requislate="" />
                            </div>




                        </div>
                        <div class="flex items-center space-x-4">
                            <button type="button" onClick={HANDLE_UPDATE} class="text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none disabled:bg-orange-300 bg-amber-600 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <MdSystemUpdateAlt class="w-5 h-5 mr-1 -ml-1" />

                                Update Password
                            </button>
                        
                        </div>
                    </form>}
                </div>
            </section></>
    )
}

export default myaccount