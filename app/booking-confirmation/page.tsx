'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (!bookingId) {
      router.push('/home');
      return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const foundBooking = bookings.find((b: any) => b.id === bookingId);
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      router.push('/home');
    }
  }, [bookingId, router]);

  const services: any = {
    '1': { name: 'Mobile Repair', price: 299 },
    '2': { name: 'Laptop Repair', price: 499 },
    '3': { name: 'Battery Replacement', price: 199 },
    '4': { name: 'Screen Replacement', price: 349 },
    '5': { name: 'SSD Upgrade', price: 399 },
    '6': { name: 'Software Installation', price: 149 },
  };

  if (!booking) {
    return null;
  }

  const service = services[booking.service];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-100 rounded-full p-4 mb-4">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your service request has been successfully submitted</p>
        </div>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Booking Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-mono font-bold text-gray-800">{booking.id}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold text-gray-800">{service?.name}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-800">{booking.date}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Time</span>
              <span className="font-semibold text-gray-800">{booking.time}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Address</span>
              <span className="font-semibold text-gray-800 text-right">{booking.address}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Phone</span>
              <span className="font-semibold text-gray-800">{booking.phone}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-600">Status</span>
              <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Cost Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Charge</span>
              <span className="font-semibold">₹{service?.price}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-blue-200">
              <span className="text-gray-600">Visit Charge</span>
              <span className="font-semibold">₹199</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-blue-600">
              <span>Total Amount</span>
              <span>₹{(service?.price || 0) + 199}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
              ℹ️
            </span>
            What Happens Next?
          </h2>
          <ol className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                1
              </span>
              <span>Our team will review your booking within 1 hour</span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                2
              </span>
              <span>You'll receive a confirmation call/SMS with technician details</span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                3
              </span>
              <span>Track your technician's location in real-time</span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                4
              </span>
              <span>Make payment after service completion</span>
            </li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            href="/tracking"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Track Your Service
          </Link>
          <Link
            href="/home"
            className="w-full border-2 border-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Need help?</p>
          <a
            href="tel:+919999999999"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            Call Support: +91 9999999999
          </a>
        </div>
      </div>
    </div>
  );
}
