/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdSystemUpdateAlt } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { option } from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'


const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))
const addProducts = () => {
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState()
  const [imageFiles, setimageFiles] = useState()
  const [seller, setSeller] = useState("@AnishalMenkar1213")
  const [name, setname] = useState("")
  const [desc, setdesc] = useState("")
  const [age, setage] = useState("")
  const [price, setprice] = useState("")
  const [color, setcolor] = useState("white")
  const [category, setcategory] = useState("Animal")
  const [scategory, setscategory] = useState("")
  const [size, setsize] = useState("")
  const [quantity, setquantity] = useState("")
  const subcategory = {
    "Animal": [
      "Dog",
      "Cow",
      "Horse",
      "Cat",
      "Buffalo",
      "Goat",
      "Sheep"
    ],
    "Bird": [
      "Parakeets",
      "Coackatiels",
      "Pigeon",
      "Lovebirds",
      "Parrot"
    ]
  }

  const onImageChange = (event) => {
    const { files } = event.target;
    setimageFiles(event.target.files)
    //  console.log(event.target.files)


    if (files && files.length !== 0) {
      const imagesArray = [];

      // Create a separate FileReader instance for each file
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const currentFile = files[i];

        // Set up an event handler for when the file is loaded
        reader.onload = () => {
          // Add the data URL of the loaded file to the imagesArray
          imagesArray.push(reader.result);
          // If all files are loaded, update the state with the array of data URLs
          if (imagesArray.length === files.length) {
            setImgSrc(imagesArray);
          }
        };

        // Read the contents of the current file as a data URL
        reader.readAsDataURL(currentFile);
      }

    }
  };

  // Handle Change
  const onChange = (e) => {
    if (e.target.name === "name") setname(e.target.value)
    if (e.target.name === "seller") setSeller(e.target.value)
    if (e.target.name === "category") setcategory(e.target.value)
    if (e.target.name === "scategory") setscategory(e.target.value)
    if (e.target.name === "desc") setdesc(e.target.value)
    if (e.target.name === "size") setsize(e.target.value)
    if (e.target.name === "age") setage(e.target.value)
    if (e.target.name === "color") setcolor(e.target.value)
    if (e.target.name === "price") setprice(e.target.value)
    if (e.target.name === "quantity") setquantity(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    if (!imageFiles) return
    try {

      const formData = new FormData();
      formData.append('name', name)
      formData.append('slug', Math.random() * 1000)

      formData.append('seller', seller)

      formData.append('category', category)

      formData.append('scategory', scategory)

      formData.append('description', desc)
      formData.append('size', size)
      formData.append('color', color)
      formData.append('age', age)
      formData.append('quantity', quantity)
      formData.append('price', price)

      Array.from(imageFiles).forEach(item => {
        formData.append('productImages', item)
      })

      const res = await fetch('/api/upload', {
        method: "POST",
        body: formData,
      });
      const resData = await res.json()
      if (resData.message) {
        setImgSrc()
        reset()
      }


    } catch (error) {
      console.error(error)
    }

  }
  const reset = () =>{
    setname("")
    setImgSrc()
    setage("")
    setdesc("")
    setcategory("Animal")
    setcolor("")
    setquantity("")
    setsize("")
    setcolor("white")
    setprice("")
  }
  return (
    <>  <div class="max-w-[1500px] px-8  mx-auto py-8 bg-white">
      <h2 class="mb-4 text-2xl  text-gray-900 dark:text-white">Add Product</h2>
      <form onSubmit={onSubmit}>
        <div class="w-full flex border-dotted border-2 border-slate-200 rounded-lg p-3 space-x-4 space-y-4 items-center ">

          {!imgSrc && <Image width={100} height={70} src='/imageviewer.png' alt='Profile Pic' className='bg-white border-dotted border p-1 border-slate-700' />}
          {imgSrc && imgSrc.map((image => {
            return (<Image src={image} width={70} height={50} key={Math.random() * 100} alt='Profile Pic' className='bg-white border-2 border-gray-300' />)
          }))}

          <ButtonStyled component='label' className='bg-green-700 text-white hover:bg-green-700' htmlFor='account-settings-upload-image'>
            Upload Images
            <input
              hidden
              type='file'
              name='file'
              multiple
              onChange={onImageChange}

              accept='image/png, image/jpeg, image/avif, image/webp'
              id='account-settings-upload-image'
            />
          </ButtonStyled>
          <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc()}>
            Reset
          </ResetButtonStyled>
        </div>
        <div class="grid gap-4 mb-4 mt-3 sm:grid-cols-2 sm:gap-6 sm:mb-5">

          <div class="w-full">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
            <input type="text" name="name" id="name" value={name} onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white s:ring-primary-500 dark:focus:border-primary-500" required 
             placeholder=" Name" requislate="" />
          </div>
          <div class="w-full">
            <label for="seller" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seller (*)</label>
            <input type="text" name="seller" value={seller} id="seller" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" readOnly={true} requislate="" />
          </div>
          <div class="w-full">
            <label for="seller" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category (*)</label>

            <select
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 px-1'
              name='category'
              onChange={onChange}
              required
              label='Category'
              
               placeholder='category'

              value={category}

            >

              <option value='Animal'>Animal</option>
              <option value='Bird'>Bird</option>
              <option value='Equipment'>Equipment</option>
              <option value='Food'>Food</option>
              <option value='Fertilizer'>Fertilizer</option>
              <option value='Pesticides'>Pesticides</option>
            </select>

          </div>
          <div class="w-full">
            <label for="Phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sub Category</label>
            <select
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 px-1'
              label='sub-Category'
              name='scategory'
              onChange={onChange}
              required
              value={scategory}
              
               placeholder='category'
              defaultValue=''
              id='form-layouts-separator-select'
              labelId='form-layouts-separator-select-label'
            >

              {category.length >= 0 && Object.keys(subcategory).includes(category) &&
                subcategory[category].map((item) => {
                  return <><option value={item}>{item}</option></>
                })
              }


            </select>

          </div>
          <div class="w-full">
            <label for="desc" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea rows={3} type="text" name="desc" value={desc} id="desc" onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white s:ring-primary-500 dark:focus:border-primary-500" required 
             placeholder=" desc" requislate="" />

          </div>
          <div class="w-full">
            <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
            <input type="text" name="age" id="age" value={age} onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white s:ring-primary-500 dark:focus:border-primary-500" required 
             placeholder=" Age" requislate="" />
          </div>
          <div class="w-full">
            <label for="seller" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color </label>

            <select
              className='w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 px-1'
              name='color'
              onChange={onChange}
              required
              label='Category'
              
               placeholder='category'

              value={color}

            >
              <option value='white'>White</option>
              <option value='golden'>Golden</option>
              <option value='black'>Black</option>
              <option value='brown'>Brown</option>
              <option value='red'>Red</option>
              <option value='green'>Green</option>
              <option value='yellow'>Yellow</option>
            </select>
          </div>
          <div class="w-full">
            <label for="agsizee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
            <input type="text" name="size" id="size" value={size} onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white s:ring-primary-500 dark:focus:border-primary-500" required 
             placeholder=" Size" requislate="" />
          </div>
          <div class="w-full">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price (₹)</label>
            <input type="price" name="price" id="price" value={price} onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white s:ring-primary-500 dark:focus:border-primary-500" required 
             placeholder=" price" requislate="" />
          </div>
          <div class="w-full">
            <label for="quantity" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
            <input type="quantity" name="quantity" id="quantity" value={quantity} onChange={onChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
             placeholder=" quantity" requislate="" />
          </div>


        </div>
        <div class="flex items-center space-x-4">
          <button type="button" onClick={onSubmit} class="text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none disabled:bg-orange-300 bg-red-600 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          

            Add Product
          </button>
          <button type="button" onClick={reset} class="text-slate-600 inline-flex items-center hover:text-white border border-slate-600 hover:bg-slate-600 focus:ring-4 focus:outline-none disabled:bg-slate-300 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-slate-500 dark:text-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-900">

            

            Reset
          </button>
        </div>
      </form>
    </div></>
  )
}

export default addProducts