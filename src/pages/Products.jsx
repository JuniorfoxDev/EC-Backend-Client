import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const itemsPerPage = 6;

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`https://ec-backend-server.vercel.app/products`);
            const data = await response.json();
            console.log(data);
            if (data) {
                setProducts(data);
            } else {
                setProducts([]);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-product/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://ec-backend-server.vercel.app/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts(products.filter(product => product._id !== id));
            } else {
                console.error('Failed to delete the product.');
            }
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCreate = () => {
        navigate('/products/new');
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);
    return (
        <div className='flex gap-4'>
            <Navbar />
            <div className="container mx-auto p-4">
                <div>
                    <h2 className='font-bold pb-3'>Add New Product</h2>
                    <button type='button' onClick={handleCreate} className='bg-blue-500 text-white px-4 py-2 rounded'>Create</button>
                </div>
                <h1 className="text-2xl font-bold mb-4">All Products</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {currentItems && currentItems.length === 0 ? (
                            <p>No products found.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {currentItems.map(product => (
                                    <div key={product._id} className="border p-4 rounded shadow-sm">
                                        {product.images && product.images.length > 0 && (
                                            <img src={product.images[0].url} alt={product.name} className="h-40 w-full object-cover rounded mb-2" />
                                        )}
                                        <h2 className="text-lg font-bold">{product.name}</h2>
                                        <p className="text-gray-700">Rs {product.price}</p>
                                        <div className="mt-4 flex justify-between">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleEdit(product._id)}>
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                onClick={() => handleDelete(product._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-4 bg-black text-white rounded-full hover:bg-black[0.4] disabled:bg-black[0.4] cursor-pointer"
                    >
                        <FaAngleLeft />
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-4 bg-black text-white rounded-full hover:bg-black[0.4] disabled:bg-gray-200 cursor-pointer"
                    >
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
