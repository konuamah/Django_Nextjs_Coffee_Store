import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <header className="bg-white py-4 px-6 flex justify-between items-center">
        <div>
          <Link href="/">
            <a className="text-gray-800 font-bold text-lg">Seen The Label</a>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/shop">
            <a className="text-gray-800 hover:text-gray-600">Shop</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-800 hover:text-gray-600">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-800 hover:text-gray-600">Contact</a>
          </Link>
          <Link href="/cart">
            <a className="text-gray-800 hover:text-gray-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3z" />
              </svg>
            </a>
          </Link>
          <Link href="/account">
            <a className="text-gray-800 hover:text-gray-600">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v18H3V3z" />
              </svg>
            </a>
          </Link>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href="/product/1">
            <a>
              <img src="https://via.placeholder.com/300x400" alt="Product 1" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-gray-800 font-bold text-lg">Lloyd Jean</h3>
                <p className="text-gray-600 text-sm">$149.00</p>
              </div>
            </a>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href="/product/2">
            <a>
              <img src="https://via.placeholder.com/300x400" alt="Product 2" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-gray-800 font-bold text-lg">Manta Pant</h3>
                <p className="text-gray-600 text-sm">$149.00</p>
              </div>
            </a>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Link href="/product/3">
            <a>
              <img src="https://via.placeholder.com/300x400" alt="Product 3" className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-gray-800 font-bold text-lg">Rob Shorts</h3>
                <p className="text-gray-600 text-sm">$79.50</p>
              </div>
            </a>
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 px-6">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; 2023 Seen The Label. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.56c1.238 0 2.233 1.002 2.233 2.24 0 1.238-1.001 2.24-2.233 2.24s-2.233-1.002-2.233-2.24c0-1.238 1.001-2.24 2.233-2.24zm2.597 10.544c-1.037.366-2.11.547-3.197.547-1.086 0-2.16-.181-3.197-.547-.654-.23-.853-.93-.53-1.49 1.118-1.951 3.628-3.32 6.454-3.32 2.825 0 5.335 1.368 6.454 3.32.323.56.124 1.26-.53 1.49z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}