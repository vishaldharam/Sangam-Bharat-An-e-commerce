/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect,useState } from 'react'
import mongoose from "mongoose";
import Link from 'next/link';
import UserLayout from '../../src/layouts/UserLayout'
import ThemeComponent from '../../src/@core/theme/ThemeComponent'
import { SettingsConsumer, SettingsProvider } from '../../src/@core/context/settingsContext'
// ** React Imports

import { LuTableProperties } from "react-icons/lu";

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// const rows = [
//   {
//     age: 27,
//     status: 'Paid',
//     date: '09/27/2018',
//     name: 'Sally Quinn',
//     salary: '$19586.23',
//     email: 'eebsworth2m@sbwire.com',
//     designation: 'Human Resources Assistant'
//   },
//   {
//     age: 61,
//     date: '09/23/2016',
//     salary: '$23896.35',
//     status: 'Refund',
//     name: 'Margaret Bowers',
//     email: 'kocrevy0@thetimes.co.uk',
//     designation: 'Nuclear Power Engineer'
//   },
//   {
//     age: 59,
//     date: '10/15/2017',
//     name: 'Minnie Roy',
//     status: 'Failed',
//     salary: '$18991.67',
//     email: 'ediehn6@163.com',
//     designation: 'Environmental Specialist'
//   },
//   {
//     age: 30,
//     date: '06/12/2018',
//     status: 'Pending',
//     salary: '$19252.12',
//     name: 'Ralph Leonard',
//     email: 'dfalloona@ifeng.com',
//     designation: 'Sales Representative'
//   }
// ]


const statusObj = {
 
  Failed: { color: 'error' },
  Pending: { color: 'error' },
  Refund: { color: 'warning' },
  Paid: { color: 'success' },
  Delivering: { color: 'info' }
}



const viewProducts = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [data, setdata] = useState()
  const getUser = async()=>{
      const ALL = true;
      const Seller = '@AnishalMenkar1213';
  
      const RESPONSE = await fetch("http://localhost:3000/api/getProducts", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ALL, Seller }),
          });
      let PRODUCTS_DATA = await RESPONSE.json()
      setdata(PRODUCTS_DATA.products)
      console.log(PRODUCTS_DATA.products)
  
  }
  useEffect(() => {
      
  getUser()
  
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  
  return (
    <SettingsProvider>
    <SettingsConsumer>
    {({ settings }) => {  return <>
    <ThemeComponent settings={settings}>
    <UserLayout>
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor:'rgb(248 250 252)' } }>
     <div className='flex px-2 py-4 bg-white'><LuTableProperties className='mt-1 mx-2' /> <h1 className=' mx-2  text-xl'>Products</h1></div>
    <div className='mt-2 bg-white'><TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategoory</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data && console.log(data)}
            {data && data.map(row => ( 
              <TableRow hover key={row.slug} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                   
                  </Box>
                </TableCell>
                <TableCell><span className='ml-2'>
                {row.category}</span>
                </TableCell>
                <TableCell><span className='ml-5'>{row.subCategory}</span></TableCell>
                <TableCell><span className=''>₹{row.price}</span></TableCell>
                <TableCell><span className=''>{row.quantity}</span></TableCell>
                
                <TableCell><span className=''></span>
                 <button className='bg-blue-500  hover:bg-blue-700 text-white rounded rounded-sm px-2 py-1'>View more</button>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 100]}
        component='div'
        count={data && data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /></div>
    </Paper>
    </UserLayout>
    </ThemeComponent></>
     }}
    </SettingsConsumer>
      </SettingsProvider>
  )
}

export default viewProducts