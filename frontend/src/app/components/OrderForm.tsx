// components/checkout/OrderForm.tsx
import React from 'react';


interface CheckoutFormData {
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
}

interface OrderFormProps {
    onSubmit: (formData: CheckoutFormData, csrfToken: string) => Promise<void>;
    csrfToken: string;
    isSubmitting: boolean;
    error: string | null;
    formData: CheckoutFormData;
    setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, csrfToken, isSubmitting, error, formData, setFormData }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100">
            <h2 className="text-2xl font-serif text-amber-900 mb-6">Shipping Information</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData, csrfToken); }}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-amber-800 mb-1">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-amber-800 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-amber-800 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-amber-800 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-amber-800 mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
                    />
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full bg-amber-800 text-amber-50 py-3 px-4 rounded-full hover:bg-amber-900 transition-colors disabled:bg-amber-400 font-medium"
                >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default OrderForm;
