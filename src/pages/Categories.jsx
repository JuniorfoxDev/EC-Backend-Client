import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedSubcategory) {
            fetchProducts(selectedSubcategory);
        }
    }, [selectedSubcategory]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://ec-backend-server.vercel.app/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async (subcategory) => {
        try {
            const response = await fetch(`https://ec-backend-server.vercel.app/categories/${subcategory}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubcategoryClick = (subcategory) => {
        setSelectedSubcategory(subcategory);
    };

    return (
        <div className='flex gap-4'>
            <Navbar/>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
                <div className="grid grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <div key={category._id} className="border p-4 rounded-md">
                            <h2 className="font-bold mb-2">{category.name}</h2>
                            <ul>
                                {Array.isArray(category.subcategory) && category.subcategory.length > 0 ? (
                                    category.subcategory.map((subcategory) => (
                                        <li key={subcategory} className="mb-1">
                                            <button 
                                                onClick={() => handleSubcategoryClick(subcategory)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {subcategory}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No subcategories available</li>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>

                {selectedSubcategory && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Products in {selectedSubcategory}</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {products.map((product) => (
                                <div key={product._id} className="border p-4 rounded-md">
                                    <img src={product.images[0]?.url} alt={product.name} className="w-full h-32 object-cover mb-2"/>
                                    <h3 className="font-bold">{product.name}</h3>
                                    <p>${product.price}</p>
                                    <Link to={`/admin/products/${product._id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories;
