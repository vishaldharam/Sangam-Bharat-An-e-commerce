import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
const SearchProduct = ({postData})=>{
console.log(postData)
    
return (
    <>
    </>
)

}

export async function getServerSideProps(context){

    const res = await context.query.slug;

    const postData = await res
    return {
        props: {
          postData,
        },
      };
}

export default SearchProduct;