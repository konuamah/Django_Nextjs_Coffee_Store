'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import CartItem from '@/app/components/CartItem';

const CartPage = () => {
    const { cart, cartTotal, isLoading } = useCart(); // Cart context values

    // Render loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
        );
    }

    // Render empty cart state
    if (!cart.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-amber-100 text-neutral-800">
                <div className="text-4xl mb-4">☕</div>
                <h1 className="text-3xl font-serif mb-2">Your Cart</h1>
                <p className="text-lg mb-6">Your cart is empty</p>
                <Link href="/menu">
                    <button className="bg-amber-700 text-white px-6 py-3 rounded-full hover:bg-amber-800 transition-colors duration-200">
                        Browse Our Menu
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center py-12"
            style={{ backgroundImage: "url('/cartbg.jpg')" }}
        >
            <div className="bg-white bg-opacity-80 max-w-4xl mx-auto p-4 rounded-2xl shadow-lg backdrop-blur-lg">
                <h1 className="text-3xl font-serif text-neutral-800 mb-8 text-center">Your Cart</h1>
                
                <div className="bg-white rounded-2xl shadow-lg border border-amber-200">
                    {/* Cart Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-amber-200 text-neutral-700 font-medium">
                        <div className="col-span-6">Product</div>
                        <div className="col-span-2 text-center">Price</div>
                        <div className="col-span-2 text-center">Quantity</div>
                        <div className="col-span-2 text-center">Total</div>
                    </div>

                    {/* Cart Items */}
                    <div className="divide-y divide-amber-200">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="p-6 border-t border-amber-200 bg-amber-50 rounded-b-2xl">
                        <div className="flex justify-between items-center text-lg font-medium text-neutral-800">
                            <div>Total</div>
                            <div>${cartTotal}</div>
                        </div>
                    </div>
                </div>

                {/* Checkout Button */}
                <div className="mt-8 flex justify-center">
                    <Link href="/menu/cart/checkout">
                        <button 
                            className="bg-amber-700 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition-colors duration-200 flex items-center space-x-2"
                            onClick={() => {
                                console.log('Proceeding to checkout...');
                            }}
                        >
                            <span className="mr-2">☕</span>
                            <span>Proceed to Checkout</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
