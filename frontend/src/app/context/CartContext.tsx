"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    total_price: string;
}

interface CartContextType {
    cart: CartItem[];
    cartTotal: string;
    addToCart: (item: CartItem) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    updateCartItemQuantity: (itemId: number, quantity: number) => Promise<void>;
    fetchCart: () => Promise<void>;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<string>("0.00");
    const [isLoading, setIsLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState<number>(0);
    const [csrfToken, setCsrfToken] = useState<string>("");

    const updateCartState = (data: { cart: CartItem[], total_price: string }) => {
        if (!Array.isArray(data.cart)) {
            console.error('Invalid cart data received:', data);
            return;
        }

        const updatedCart = data.cart.map(newItem => {
            const existingItem = cart.find(item => item.id === newItem.id);
            return {
                ...existingItem,
                ...newItem,
            };
        });

        setCart(updatedCart);
        setCartTotal(data.total_price || "0.00");
    };

    // Modified CSRF token handling
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

    const fetchCart = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/cart/detail/', {
                credentials: 'include',
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });
            if (!response.ok) throw new Error('Failed to fetch cart');
            const data = await response.json();
            updateCartState(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = async (item: CartItem) => {
        if (pendingRequests > 0) return;
        setPendingRequests(prev => prev + 1);
        
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        const newQuantity = existingItem ? existingItem.quantity + 1 : 1;
        
        setCart(prevCart => {
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { 
                            ...cartItem, 
                            quantity: newQuantity,
                            total_price: (parseFloat(item.price) * newQuantity).toFixed(2)
                        }
                        : cartItem
                );
            }
            return [...prevCart, { 
                ...item, 
                quantity: 1,
                total_price: item.price 
            }];
        });

        try {
            const response = await fetch(`http://localhost:8000/cart/add/${item.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ quantity: newQuantity, override: true }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to add item to cart');
            }
            const data = await response.json();
            updateCartState(data);
        } catch (error) {
            console.error('Error adding to cart:', error);
            await fetchCart();
        } finally {
            setPendingRequests(prev => prev - 1);
        }
    };

    const removeFromCart = async (itemId: number) => {
        if (pendingRequests > 0) return;
        setPendingRequests(prev => prev + 1);

        setCart(prevCart => prevCart.filter(item => item.id !== itemId));

        try {
            const response = await fetch(`http://localhost:8000/cart/remove/${itemId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrfToken
                },
                credentials: 'include'
            });
            
            if (!response.ok) throw new Error('Failed to remove item from cart');
            const data = await response.json();
            updateCartState(data);
        } catch (error) {
            console.error('Error removing from cart:', error);
            await fetchCart();
        } finally {
            setPendingRequests(prev => prev - 1);
        }
    };

    const updateCartItemQuantity = async (itemId: number, quantity: number) => {
        if (pendingRequests > 0) return;
        setPendingRequests(prev => prev + 1);

        if (quantity <= 0) {
            await removeFromCart(itemId);
            setPendingRequests(prev => prev - 1);
            return;
        }

        setCart(prevCart => 
            prevCart.map(item => 
                item.id === itemId
                    ? { 
                        ...item, 
                        quantity,
                        total_price: (parseFloat(item.price) * quantity).toFixed(2)
                    }
                    : item
            )
        );

        try {
            const response = await fetch(`http://localhost:8000/cart/add/${itemId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({
                    quantity,
                    override: true
                }),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to update cart');
            const data = await response.json();
            updateCartState(data);
        } catch (error) {
            console.error('Error updating cart:', error);
            await fetchCart();
        } finally {
            setPendingRequests(prev => prev - 1);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            cartTotal,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            fetchCart,
            isLoading
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};