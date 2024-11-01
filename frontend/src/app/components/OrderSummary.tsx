// components/checkout/OrderSummary.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const OrderSummary: React.FC = () => {
    const { cart, cartTotal } = useCart();

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
            <h2 className="text-2xl font-serif text-amber-900 mb-6">Order Summary</h2>
            <div className="space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between pb-4 border-b border-amber-100">
                        <div>
                            <p className="font-medium text-amber-900">{item.name}</p>
                            <p className="text-sm text-amber-700">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-amber-900">${item.total_price}</p>
                    </div>
                ))}
                <div className="pt-4 mt-4">
                    <div className="flex justify-between font-bold text-lg text-amber-900">
                        <p>Total</p>
                        <p>${cartTotal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
