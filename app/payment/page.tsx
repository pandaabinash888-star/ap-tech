'use client';

import { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet'>('card');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const bookingDetails = {
    service: 'iPhone 14 Screen Replacement',
    visitCharge: 199,
    serviceCharge: 499,
    partsCharge: 2800,
    total: 3498,
  };

  const handlePayment = async () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-slate-600 mb-8">Your booking has been confirmed. A technician will be assigned shortly.</p>
            
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-slate-900 mb-4">Booking Confirmation</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Booking ID</span>
                  <span className="font-semibold text-slate-900">BK#2024001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Service</span>
                  <span className="font-semibold text-slate-900">{bookingDetails.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Amount Paid</span>
                  <span className="font-semibold text-slate-900">₹{bookingDetails.total}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/live-tracking"
                className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold inline-block"
              >
                Track Your Service
              </Link>
              <Link
                href="/home"
                className="w-full px-8 py-3 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 transition font-semibold inline-block"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Payment</h1>
          <p className="text-slate-600">Secure payment for your service booking</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-600">{bookingDetails.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Visit Charge</span>
                  <span className="font-semibold text-slate-900">₹{bookingDetails.visitCharge}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Service Charge</span>
                  <span className="font-semibold text-slate-900">₹{bookingDetails.serviceCharge}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Parts Charge</span>
                  <span className="font-semibold text-slate-900">₹{bookingDetails.partsCharge}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-slate-900">Total Amount</span>
                <span className="text-3xl font-bold text-blue-600">₹{bookingDetails.total}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Select Payment Method</h3>
              
              <div className="space-y-3">
                {/* Credit/Debit Card */}
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-3"
                  />
                  <span className="font-semibold text-slate-900">Credit/Debit Card</span>
                </label>

                {/* UPI */}
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mr-3"
                  />
                  <span className="font-semibold text-slate-900">UPI (Google Pay, PhonePe, Paytm)</span>
                </label>

                {/* Digital Wallet */}
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                  paymentMethod === 'wallet' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="mr-3"
                  />
                  <span className="font-semibold text-slate-900">Digital Wallet (Apple Pay, Samsung Pay)</span>
                </label>
              </div>
            </div>

            {/* Card Details Form (if card selected) */}
            {paymentMethod === 'card' && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Card Details</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* UPI Payment Info */}
            {paymentMethod === 'upi' && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">UPI Payment Instructions</p>
                    <p className="text-sm text-blue-700 mt-1">You will be redirected to your UPI app after clicking Pay Now. Complete the payment to confirm your booking.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Security Info */}
            <div className="bg-slate-50 rounded-2xl p-6 flex items-start gap-3">
              <Lock className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">Your payment is secure</p>
                <p className="text-sm text-slate-600 mt-1">We use bank-level encryption (SSL) to protect your payment information.</p>
              </div>
            </div>
          </div>

          {/* Payment Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 sticky top-24 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Summary</h3>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Visit Charge</span>
                    <span>₹{bookingDetails.visitCharge}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Service</span>
                    <span>₹{bookingDetails.serviceCharge}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Parts</span>
                    <span>₹{bookingDetails.partsCharge}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">₹{bookingDetails.total}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay Now
                  </>
                )}
              </button>

              <p className="text-xs text-slate-600 text-center">
                By clicking Pay Now, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
