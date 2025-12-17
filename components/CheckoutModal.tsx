import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total, onSuccess }) => {
  const [method, setMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');

  if (!isOpen) return null;

  const handlePay = () => {
    setLoading(true);
    setStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep('select'); // Reset for next time
      }, 2000);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Close</span>
              <X className="w-6 h-6" />
            </button>
          </div>

          {step === 'success' ? (
             <div className="text-center py-10">
               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                 <CheckCircle className="h-6 w-6 text-green-600" />
               </div>
               <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Successful!</h3>
               <p className="mt-2 text-sm text-gray-500">Your order has been placed. Check your email for details.</p>
             </div>
          ) : step === 'processing' ? (
             <div className="text-center py-10">
               <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-900">
                 {method === 'mpesa' ? 'Sending STK Push...' : 'Processing Card...'}
               </h3>
               <p className="mt-2 text-sm text-gray-500">Please check your phone to complete the transaction.</p>
             </div>
          ) : (
            <div>
              <div className="text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Checkout</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Total Amount to Pay: <span className="font-bold text-gray-900">KSh {total.toFixed(2)}</span></p>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700">Select Payment Method</label>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setMethod('mpesa')}
                    className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium ${
                      method === 'mpesa'
                        ? 'border-green-500 ring-2 ring-green-500 text-green-700 bg-green-50'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    M-Pesa
                  </button>
                  <button
                    onClick={() => setMethod('card')}
                    className={`flex items-center justify-center px-4 py-3 border rounded-lg text-sm font-medium ${
                      method === 'card'
                        ? 'border-indigo-500 ring-2 ring-indigo-500 text-indigo-700 bg-indigo-50'
                        : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Card
                  </button>
                </div>
              </div>

              <div className="mt-6">
                {method === 'mpesa' ? (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">M-Pesa Phone Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">🇰🇪 +254</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="focus:ring-green-500 focus:border-green-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md py-3 border"
                        placeholder="712 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">You will receive an M-Pesa prompt on your phone.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md text-center text-sm text-gray-500">
                    Standard Card integration would go here.
                  </div>
                )}
              </div>

              <div className="mt-8 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handlePay}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    method === 'mpesa' ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {method === 'mpesa' ? 'Pay with M-Pesa' : 'Pay Now'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};