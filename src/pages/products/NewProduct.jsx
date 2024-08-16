import React from 'react'
import Navbar from '../../components/Navbar'
import ProductForm from '../../components/ProductForm'

const NewProduct = () => {
  return (
    <div className='flex gap-4'>
        <Navbar/>
        <ProductForm/>
    </div>
  )
}

export default NewProduct