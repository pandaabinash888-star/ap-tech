'use client';

import { useState } from 'react';
import { PaymentMethod } from '@/lib/payment-gateway';
import { CreditCard, Smartphone, Wallet, Landmark, Loader2 } from 'lucide-react';

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  isProcessing?: boolean;
  amount: number;
}

export function PaymentMethods({
  methods,
  selectedMethod,
  onSelect,
  isProcessing = false,
  amount,
}: PaymentMethodsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-8 h-8" />;
      case 'upi':
        return <Smartphone className="w-8 h-8" />;
      case 'wallet':
        return <Wallet className="w-8 h-8" />;
      case 'netbanking':
        return <Landmark className="w-8 h-8" />;
      case 'paypal':
        return <span className="text-2xl">🅿️</span>;
      default:
        return <CreditCard className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">Select Payment Method</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-2xl font-bold text-blue-600">₹{amount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => !isProcessing && onSelect(method)}
            disabled={!method.supported || isProcessing}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod?.id === method.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-400'
            } ${!method.supported || isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${selectedMethod?.id === method.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                {getIcon(method.type)}
              </div>
              <div className="text-left flex-1">
                <h4 className="font-semibold text-gray-800">{method.name}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {method.provider === 'stripe' && 'Powered by Stripe'}
                  {method.provider === 'razorpay' && 'Powered by Razorpay'}
                  {method.provider === 'paypal' && 'Powered by PayPal'}
                </p>
                {selectedMethod?.id === method.id && (
                  <div className="mt-2 flex items-center gap-1 text-blue-600">
                    <span className="text-sm font-medium">✓ Selected</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {!selectedMethod && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-700 text-sm">
          Please select a payment method to proceed
        </div>
      )}

      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-blue-700 font-medium">Processing your payment...</span>
        </div>
      )}
    </div>
  );
}
