import React from 'react';
import { useCart } from '../context/CartContext';

interface FoodItem {
    id: number;
    name: string;
    image: string;
    description: string;
    price: string;
    available: boolean;
}

interface FoodItemCardProps {
    item: FoodItem;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item }) => {
    const { cart, addToCart, removeFromCart, updateCartItemQuantity } = useCart();

    const isInCart = cart.find(cartItem => cartItem.id === item.id);
    
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <img 
                src={item.image} 
                alt={item.name} 
                className="h-48 w-full object-cover rounded-t-lg mb-4" 
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold">${parseFloat(item.price).toFixed(2)}</p>
            
            {item.available ? (
                <div className="flex justify-between items-center mt-4">
                    <p className="text-green-600 font-medium">Available</p>
                    {isInCart ? (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => {
                                    const cartItem = cart.find(ci => ci.id === item.id);
                                    if (cartItem && cartItem.quantity > 1) {
                                        updateCartItemQuantity(item.id, cartItem.quantity - 1);
                                    } else {
                                        removeFromCart(item.id);
                                    }
                                }}
                                className="px-2 py-1 bg-red-100 text-red-600 rounded"
                            >
                                -
                            </button>
                            <span>{isInCart?.quantity || 0}</span>
                            <button
                                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 })}
                                className="px-2 py-1 bg-blue-100 text-blue-600 rounded"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 })}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            ) : (
                <p className="text-red-600 font-medium mt-4">Not Available</p>
            )}
        </div>
    );
};

export default FoodItemCard;
