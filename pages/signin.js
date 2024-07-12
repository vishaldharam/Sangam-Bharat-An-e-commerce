/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'next/router';
import React, { useState } from 'react'
import Link from 'next/link'
const signin = () => {

    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const onChange = (e) => {
        if (e.target.name === "email") setemail(e.target.value)
        else if (e.target.name === "password") setpassword(e.target.value)

    }
    const parseJwt = (token) => {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const handleClick = async (e) => {
        e.preventDefault()
        const data = { email, password }


        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)

        })

        let response = await res.json()
        if (response.success) {
            const current_user = parseJwt(response.token)

            sessionStorage.setItem("user",JSON.stringify(current_user))
            localStorage.setItem('myuser', JSON.stringify( current_user ))

            toast.success('Successfully logged in', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            });

            setemail("")
            setpassword("")
            router.push(process.env.NEXT_PUBLIC_HOST)
        }
    }
    return (

        <div className="md:pb-10 md:pt-4  pt-10  mt-2  ">
            <div className="flex bg-gray-50 rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                > <img src='golder-retriever-puppy.jpeg' className='h-[500px]'></img>
                </div>
                <form onSubmit={handleClick} className="w-full px-12 py-4 pb-8 lg:w-1/2 mx-3">

                    <div className="mt-4 `flex items-center  md:justify-start  ">
                        <a href="#" className="text-xl text-center font-bold text-gray-800 "> Login </a>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2"> Email</label>
                        <input id='email' name='email' onChange={onChange} value={email} className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-400 rounded py-2 px-4 block w-full appearance-none" type="email|phone" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input id='password' name='password' onChange={onChange} value={password} className="bg-white text-gray-700 focus:outline-none focus:shadow-outline border border-gray-400 rounded py-2 px-4 block w-full appearance-none" type="password" />
                    </div>
                    <div className="mt-2 flex items-end justify-between">

                        <a href="#" className="text-xs text-gray-500 ">By continuing, you agree to Sangam Bharat Terms of Use and Privacy Policy.
                        </a>

                    </div>
                    <div className="mt-5">
                        <button className="bg-gray-700 text-white font-bold py-3 px-4 w-full rounded hover:bg-gray-600">Signin</button>
                    </div>
                    <div className="md:mt-20  mt-10 flex items-center justify-center">

                        <Link href={'/signup'} className="text-2sm text-gray-900 font-bold ">New to Sangam bharat? Create an account</Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default signin