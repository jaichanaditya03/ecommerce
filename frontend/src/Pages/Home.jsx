import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { getAllProducts, deleteProduct } from '../api/product';

export default function Home() {
    const { user, setUser, setIsAuthenticated } = useAuth();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const isAuth = localStorage.getItem('isAuthenticated');
        if (storedUser && isAuth === 'true') {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        await deleteProduct(id);
        fetchProducts(); // Refresh after delete
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center p-10">
            <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full text-center mb-10">
                <h1 className="text-3xl font-bold text-indigo-600 mb-4">
                    Welcome, {user?.name || 'User'}! 🎉
                </h1>
                <p className="text-gray-600 mb-6">
                    You are successfully logged in. Explore our features or start shopping!
                </p>
            </div>

            <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-500">{product.description}</p>
                        <p className="font-bold">₹ {product.price}</p>
                        <button onClick={() => handleDelete(product._id)} className="mt-2 bg-red-500 text-white px-4 py-1 rounded">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
