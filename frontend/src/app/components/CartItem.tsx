import React from 'react';
import { useCart } from '../context/CartContext';

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: string;
        quantity: number;
        total_price: string;
    };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateCartItemQuantity, removeFromCart } = useCart();

    return (
        <div className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-neutral-100 transition-colors duration-200">
            {/* Product Name */}
            <div className="col-span-6">
                <h3 className="text-lg text-neutral-800">{item.name}</h3>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center text-neutral-800">
                ${item.price}
            </div>

            {/* Quantity Controls */}
            <div className="col-span-2">
                <div className="flex items-center justify-center space-x-2">
                    <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-amber-300 hover:bg-amber-200 transition-colors duration-200 flex items-center justify-center text-neutral-700"
                        disabled={item.quantity <= 1}
                    >
                        −
                    </button>

                    <span className="mx-2 text-neutral-800 min-w-[20px] text-center">{item.quantity}</span>

                    <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-amber-300 hover:bg-amber-200 transition-colors duration-200 flex items-center justify-center text-neutral-700"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Total Price */}
            <div className="col-span-1 text-center text-neutral-800 font-medium">
                ${item.total_price}
            </div>

            {/* Remove Button */}
            <div className="col-span-1 flex justify-center">
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-100"
                    aria-label="Remove item"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default CartItem;
