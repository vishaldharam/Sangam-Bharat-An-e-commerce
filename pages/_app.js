import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import Nav from './Seller/components/Navbar'


function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const [cart, setcart] = useState({})
  const [subtotal, setsubtotal] = useState(0)
  const [user, setuser] = useState({ value: null })
  const [key, setkey] = useState()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(30)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })


    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")))
        countSubtotal()
      }
      let token = localStorage.getItem('myuser')
      if (token) {
        setuser({ value: token })
        setkey(Math.random())
      }
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])


  const buyNow = async (itemCode, image_url, name, price, qty) => {
    try {
      saveCart({})
      let newCart = {}
      newCart[itemCode] = { image_url, name, price, qty }

      setcart(newCart)
      saveCart(newCart)
      countSubtotal()
      if (localStorage.getItem('myuser')) router.push('/Checkout')
      else router.push('/signin')

    } catch (error) {
      console.log(error)
    }
  }
  const saveCart = (cart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart))
    } catch (error) {
      console.error(error.message); //raises the error
    }
  }


  const addItemsInCart = (itemCode, image_url, name, price, qty) => {
    try {
      const newCart = cart
      if (itemCode in cart) {
        newCart[itemCode].qty = newCart[itemCode].qty + qty
      }
      else {
        newCart[itemCode] = { image_url, name, price, qty }
      }

      setcart(newCart)
      saveCart(newCart)
      countSubtotal()

    } catch (error) {
      console.log(error)
    }
  }
  const clearCart = () => {
    setcart({})
    saveCart({});
    countSubtotal()

  }
  const logout = () => {
    setuser({ value: null })
    setkey()
    localStorage.removeItem('myuser')
    router.push('/')
  }

  const removeItemInCart = (itemCode) => {
    const newCart = cart
    if (itemCode in newCart) {
      delete newCart[itemCode]
    }
    setcart(newCart)
    saveCart(newCart)
    countSubtotal()
  }

  const addQty = (itemCode) => {
    const newCart = cart
    newCart[itemCode].qty += 1
    setcart(newCart)
    saveCart(newCart)
    countSubtotal()
  }

  const removeQty = (itemCode) => {
    const newCart = cart
    if (newCart[itemCode].qty === 1) {
      delete newCart[itemCode]
    }
    else {

      newCart[itemCode].qty -= 1
    }
    setcart(newCart)
    saveCart(newCart)
    countSubtotal()

  }


  const countSubtotal = () => {

    let subtotal = 0;
    const temp = JSON.parse(localStorage.getItem("cart"))
    const keys = Object.keys(temp)
    for (let i = 0; i < keys.length; i++) {
      subtotal += temp[keys[i]].price * temp[keys[i]].qty
    }
    setsubtotal(subtotal)
  }
  const { asPath  } = router;
  const noNav =  ['/Seller','/Seller/addProducts'];
  return <>
    <Script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></Script>
    <LoadingBar
      color='#ff5600'
      waitingTime={600}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    {noNav.includes(asPath ) ? <Nav/> : <Navbar logout={logout} user={user} keys={key} cart={cart} subtotal={subtotal} addItemsInCart={addItemsInCart} removeItemInCart={removeItemInCart} addQty={addQty} removeQty={removeQty} clearCart={clearCart} />}
    <Component buyNow={buyNow} cart={cart} subtotal={subtotal} addItemsInCart={addItemsInCart} removeItemInCart={removeItemInCart} addQty={addQty} removeQty={removeQty} clearCart={clearCart}{...pageProps} />
    {noNav.includes(asPath ) ? null :<Footer />}
    <Script src="https://checkout.razorpay.com/v1/checkout.js"
    /> </>
}

export default MyApp
