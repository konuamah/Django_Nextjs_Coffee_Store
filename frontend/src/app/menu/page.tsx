"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import FoodItemCard from '../components/FoodItemCard';

// Interfaces for category and food item structures
interface Category {
    id: number;
    name: string;
    slug: string;
}

interface FoodItem {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    price: string;
    available: boolean;
}

const MenuPage: React.FC = () => {
    const [foodItems, setFoodItems] = useState<FoodItem[]>([]); // State for food items
    const [categories, setCategories] = useState<Category[]>([]); // State for categories
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Selected category for filtering
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const { cart, cartTotal } = useCart(); // Cart context values

    // Fetch categories from API on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/categories/');
                if (!response.ok) throw new Error('Failed to fetch categories');
                const data = await response.json();
                setCategories(data); // Set categories state
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message); // Handle fetch error
                }
            }
        };

        fetchCategories();
    }, []);

    // Fetch food items based on selected category
    useEffect(() => {
        const fetchFoodItems = async () => {
            setLoading(true); // Set loading state to true
            try {
                let url = 'http://localhost:8000/api/products/';
                if (selectedCategory) {
                    url = `http://localhost:8000/api/products/category/${selectedCategory}/`;
                }

                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setFoodItems(data); // Set food items state
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message); // Handle fetch error
                }
            } finally {
                setLoading(false); // Set loading state to false
            }
        };

        fetchFoodItems();
    }, [selectedCategory]);

    // Calculate total items in the cart
    const getTotalItemsInCart = (): number => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Render loading state
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div 
            className="relative min-h-screen bg-cover bg-center" 
            style={{ backgroundImage: "url('/menubackground.jpg')" }}
        >
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div> {/* Overlay for background */}
            <div className="relative z-10 max-w-7xl mx-auto p-6 text-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Food Menu</h1>
                    <div className="flex items-center">
                        <Link href="/menu/cart" className="flex items-center space-x-2">
                            <span>Cart ({getTotalItemsInCart()})</span>
                            <span className="text-gray-300">${cartTotal}</span>
                        </Link>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                    <label className="mr-4 text-lg font-semibold">Filter by Category:</label>
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                        className="p-2 border border-gray-300 rounded text-gray-900"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Food Item Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {foodItems.map((item) => (
                        <FoodItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
