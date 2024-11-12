// src/app/order/confirmation/[orderId].tsx
'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Order {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  total_cost: number;
}

const OrderConfirmationPage = () => {
  const pathname = usePathname();
  const orderId = pathname.split('/').pop(); // Extract orderId from pathname

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return; // Exit if orderId is not defined
      try {
        const response = await fetch(`http://localhost:8000/api/orders/${orderId}/`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data: Order = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Error: {error}</h1>
      </div>
    );
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order #{order.id}</h2>
        <p className="mb-2">Name: {order.first_name} {order.last_name}</p>
        <p className="mb-2">Email: {order.email}</p>
        <p className="mb-2">Address: {order.address}, {order.city}</p>
        <p className="font-bold">Total Cost: ${order.total_cost}</p>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;