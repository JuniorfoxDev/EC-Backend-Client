import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';

const UpdateProduct = () => {
    const availableSizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK', '11 UK']; 
    const {id} = useParams();
    const navigate = useNavigate();
    const [product,setProduct] = useState({
        name: '',
        price: '',
        description: '',
        sizes:[],
        images:[]
    });
    const [newImages,setNewImages] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        fetchProduct();
    },[])
    const fetchProduct  = async () => {
        try {
            const response = await fetch(`https://ec-backend-server.vercel.app/products/${id}`);
            const data  = response.json();
            if(data){
                setProduct({ ...data, sizes: data.sizes || [] });
                
            }else{
                console.log('Product not found')
            }
            setLoading(false);
        } catch (error) {
            console.log('Error fetching product',error);
            setLoading(false)
        }
    }
    const handleChange = (e) => {
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const handleFileChange = (e) => {
        setNewImages(e.target.files);
    }
    const handleSizeChange = (size) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            sizes: prevProduct.sizes.includes(size)
                ? prevProduct.sizes.filter(s => s !== size)
                : [...prevProduct.sizes, size]
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',product.name);
        formData.append('price',product.price);
        formData.append('description',product.description);
        product.sizes.forEach(size => formData.append('sizes[]', size));
        for (let i = 0; i < newImages.length; i++) {
            formData.append('images',newImages[i]);
        }
        try {
            const response = await fetch(`https://ec-backend-server.vercel.app/products/${id}`,{
                method: 'PUT',
                body: formData
            });
            if(response.ok){
                navigate('/products');
            }else{
                console.error('Error updating product')
            }
        } catch (error) {
            console.error('error update',error)
        }
    }
     if (loading) {
        return <p>Loading...</p>;
    }
  return (
    <div className='flex gap-4'>
        <Navbar/>
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>Update Product</h1>
            <div className='max-w-full mx-auto mt-4 p-6 bg-gray-100 shadow-md rounded-lg'>
            <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                          <label className="block mb-2">Product Name</label>
                          <input
                              type="text"
                              name="name"
                              value={product.name}
                              onChange={handleChange}
                              placeholder='Enter the Product name'
                              className="p-2 border rounded w-full outline-none"/>
                      </div>
                      <div className="mb-4">
                          <label className="block mb-2">Product Price</label>
                          <input
                              type="number"
                              name="price"
                              value={product.price}
                              onChange={handleChange}
                              placeholder='Enter Product Price'
                              className="p-2 border rounded w-full outline-none"
                          />
                      </div>
                      <div className="mb-4">
                          <label className="block mb-2">Product Description</label>
                          <textarea
                              name="description"
                              value={product.description}
                              onChange={handleChange}
                              placeholder='Enter Product Description'
                              className="p-2 w-80 border rounded outline-none"
                          />
                      </div>
                      <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                              Upload Images
                          </label>
                          <input
                              type="file"
                              name="images"
                              onChange={handleFileChange}
                              multiple
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                      </div>
                      <div className='mb-4'>
                          <label className="block mb-2">Sizes</label>
                          <div className="flex flex-wrap gap-2">
                              {availableSizes.map(size => (
                                  <label key={size} className="flex items-center space-x-2">
                                      <input
                                          type="checkbox"
                                          value={size}
                                          checked={product.sizes.includes(size)}
                                          onChange={() => handleSizeChange(size)}
                                      />
                                      <span>{size}</span>
                                  </label>
                              ))}
                          </div>
                      </div>
                      <div className="flex items-center justify-between">
                          <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                              Update Product
                          </button>
                      </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateProduct
