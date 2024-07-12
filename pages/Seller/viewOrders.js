  /* eslint-disable react-hooks/rules-of-hooks */
  /* eslint-disable @next/next/no-img-element */
  import React, { useEffect,useState } from 'react'
  import mongoose from "mongoose";
  import Link from 'next/link';
  import UserLayout from '../../src/layouts/UserLayout'
  import ThemeComponent from '../../src/@core/theme/ThemeComponent'
  import { SettingsConsumer, SettingsProvider } from '../../src/@core/context/settingsContext'
  // ** React Imports


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




const viewOrders = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [data, setdata] = useState()
  const getUser = async()=>{
      const ALL = true
  
      const RESPONSE = await fetch("http://localhost:3000/api/getOrders", {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ALL }),
          });
      let ORDER_DATA = await RESPONSE.json()
      setdata(ORDER_DATA.ORDERS)
  
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>OrderID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Delivery Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data && console.log(data)}
            {data && data.map(row => ( 
              <TableRow hover key={row.orderId} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.orderId}</Typography>
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>₹{row.amount}</TableCell>
                
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${row.status !== 'Paid'?'Pending':'Delivering'}`}
                    color={statusObj[`${row.status !== 'Paid'?'Pending':'Delivering'}`].color}
                    sx={{ 
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
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
      />
    </Paper>
    </UserLayout>
    </ThemeComponent></>
     }}
    </SettingsConsumer>
      </SettingsProvider>
  )
}

export default viewOrders