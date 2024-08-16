import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
function ProductForm() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        sizes: []
    });
    const [isUploading, setIsUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const availableSizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK', '11 UK'];

    const handleFileUpload = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };
    const handleSizeChange = (size) => {
        setProduct(prevProduct => {
            const newSizes = prevProduct.sizes.includes(size)
                ? prevProduct.sizes.filter(s => s !== size)
                : [...prevProduct.sizes, size];
            return { ...prevProduct, sizes: newSizes };
        });
    };
    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('images', selectedFiles[i]);
        }
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('description', product.description);
        product.sizes.forEach(size => formData.append('sizes[]', size));  
        setIsUploading(true);
        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Upload successful");
                setSuccessMessage('Product added successfully!');
                setTimeout(() => {
                    navigate('/products'); 
                }, 2000); 
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className='my-4'>
            <div className="max-w-full mx-auto mt-4 p-6 bg-gray-100 shadow-md rounded-lg">
                <form onSubmit={handleUpload}>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='image-uploader flex flex-col gap-4'>
                            <label>Photos</label>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleProductChange}
                                placeholder='Enter the Product name'
                                className="p-2 border rounded w-full outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Product Price</label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleProductChange}
                                placeholder='Enter Product Price'
                                className="p-2 border rounded w-full outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Product Description</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleProductChange}
                                placeholder='Enter Product Description'
                                className="p-2 w-80 border rounded outline-none"
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
                    </div>
                    <div className="col-span-2 text-center">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                            disabled={isUploading}
                        >
                            {isUploading ? 'Uploading...' : 'UPLOAD'}
                        </button>
                    </div>
                </form>
                {successMessage && (
                    <div className="alert alert-success">
                        <p>{successMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductForm;
