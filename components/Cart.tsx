import React from 'react';
import { CartItem, ViewState } from '../types';
import { Trash2, ArrowLeft, CreditCard } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string, size: number) => void;
  onUpdateQty: (id: string, size: number, delta: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQty, onCheckout, onContinueShopping }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15.00;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-12 max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't found your perfect pair yet.</p>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Cart Items */}
        <section className="lg:col-span-7">
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.selectedSize}`} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <span className="font-medium text-gray-700 hover:text-gray-800">
                            {item.name}
                          </span>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">Size: {item.selectedSize}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center border border-gray-300 rounded-md w-max">
                        <button
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => onUpdateQty(item.id, item.selectedSize, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 text-sm text-gray-900">{item.quantity}</span>
                        <button
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => onUpdateQty(item.id, item.selectedSize, 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="absolute top-0 right-0">
                        <button
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order Summary */}
        <section className="mt-16 bg-white rounded-lg shadow-sm px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-gray-100 sticky top-24">
          <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-medium text-gray-900">Order total</dt>
              <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              onClick={onCheckout}
              className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Checkout
            </button>
          </div>
          <div className="mt-6 text-center">
             <button onClick={onContinueShopping} className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center justify-center gap-1 mx-auto">
               <ArrowLeft className="w-4 h-4" /> Continue Shopping
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};