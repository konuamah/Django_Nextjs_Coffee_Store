// pages/checkout/CheckoutPage.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import OrderForm from '@/app/components/OrderForm';
import OrderSummary from '@/app/components/OrderSummary';

// Interface for form data
interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
}

// Interface for order data
interface OrderData {
    order_id: string;
    [key: string]: unknown; // Allow other unknown properties with 'unknown' type
}

const CheckoutPage: React.FC = () => {
    const { cart, cartTotal, fetchCart } = useCart(); // Cart context values
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Submission loading state
    const [error, setError] = useState<string | null>(null); // Error message state
    const [csrfToken, setCsrfToken] = useState<string>(''); // CSRF token for secure requests
    const [formData, setFormData] = useState<FormData>({ // Form data state
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: ''
    });
    const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false); // Order confirmation state
    const [orderData, setOrderData] = useState<OrderData | null>(null); // Order data state

    // Fetch CSRF token from cookies
    useEffect(() => {
        const getCsrfToken = () => {
            const name = 'csrftoken';
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        };
        setCsrfToken(getCsrfToken() || '');
    }, []);

    // Handle form submission to create an order
    const handleSubmit = async (formData: FormData, csrfToken: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/orders/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData,
                    items: cart.map(item => ({
                        product: item.id,
                        price: item.price,
                        quantity: item.quantity
                    }))
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create order');
            }

            const data: OrderData = await response.json();
            setOrderData(data); // Set the order data on successful submission
            setOrderConfirmed(true); // Set confirmation state to true
            await fetchCart(); // Refresh the cart
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during checkout');
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    // Render when cart is empty
    if (!cart.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 text-amber-900">
                <div className="text-4xl mb-4">☕</div>
                <h1 className="text-3xl font-serif mb-2">Checkout</h1>
                <p className="text-lg mb-6">Your cart is empty</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center py-12 relative"
            style={{ backgroundImage: "url('/checkoutbg.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div> 
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h1 className="text-3xl font-serif text-amber-50 mb-8 text-center">Checkout</h1>

                {orderConfirmed ? (
                    <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg shadow-lg mb-4" role="alert">
                        <div className="flex items-center mb-4">
                            <div className="text-2xl mr-2">☕</div>
                            <h2 className="text-xl font-serif text-green-800">Order Confirmed!</h2>
                        </div>
                        <p className="text-green-700">Thank you for your order. We will start brewing right away!</p>
                        <p className="text-green-700 mt-2">Order ID: {orderData?.order_id}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Order Form */}
                        <OrderForm 
                            onSubmit={handleSubmit} 
                            csrfToken={csrfToken} 
                            isSubmitting={isSubmitting} 
                            error={error} 
                            formData={formData} 
                            setFormData={setFormData} 
                        />

                        {/* Order Summary */}
                        <OrderSummary />
                        <p className="text-gray-300">Total: ${cartTotal}</p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
