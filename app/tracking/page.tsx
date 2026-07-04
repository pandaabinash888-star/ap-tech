'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TrackingScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('id');

  const [booking, setBooking] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));

    if (!bookingId) {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      if (bookings.length > 0) {
        setBooking(bookings[bookings.length - 1]);
      }
    } else {
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const found = bookings.find((b: any) => b.id === bookingId);
      setBooking(found);
    }
  }, [router, bookingId]);

  const services: any = {
    '1': { name: 'Mobile Repair', icon: '📱', price: 299 },
    '2': { name: 'Laptop Repair', icon: '💻', price: 499 },
    '3': { name: 'Battery Replacement', icon: '🔋', price: 199 },
    '4': { name: 'Screen Replacement', icon: '🖥', price: 349 },
    '5': { name: 'SSD Upgrade', icon: '💾', price: 399 },
    '6': { name: 'Software Installation', icon: '⚙️', price: 149 },
  };

  const mockTechnician = {
    name: 'Raj Kumar',
    phone: '+91 9876543210',
    rating: 4.8,
    reviews: 245,
    experience: '5+ years',
    image: '👨‍🔧',
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { label: 'Booked', status: 'booked' },
      { label: 'Confirmed', status: 'confirmed' },
      { label: 'Technician Assigned', status: 'technician' },
      { label: 'In Progress', status: 'in-progress' },
      { label: 'Completed', status: 'completed' },
    ];

    const statusMap: any = {
      'pending': 0,
      'confirmed': 1,
      'in-progress': 3,
      'completed': 4,
    };

    return steps.map((step, idx) => ({
      ...step,
      completed: idx <= (statusMap[status] || 0),
    }));
  };

  if (!user || !booking) {
    return null;
  }

  const service = services[booking.service];
  const steps = getStatusSteps(booking.status);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-blue-600">Track Service</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Steps */}
        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Service Status</h2>
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={step.status} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ${
                    step.completed ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  {step.completed ? '✓' : idx + 1}
                </div>
                <div className={`flex-1 ml-4 ${step.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                  <p className="font-semibold">{step.label}</p>
                  {step.completed && idx === steps.findIndex(s => s.completed && (idx === steps.length - 1 || !steps[idx + 1].completed)) && (
                    <p className="text-xs text-green-600 mt-1">✓ Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-xl p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Service</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{service?.icon}</span>
                <div>
                  <p className="font-bold text-gray-800">{service?.name}</p>
                  <p className="text-sm text-gray-600">ID: {booking.id}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Date & Time</p>
              <p className="font-bold text-gray-800">{booking.date}</p>
              <p className="text-sm text-gray-600">{booking.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Address</p>
              <p className="font-bold text-gray-800">{booking.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Amount</p>
              <p className="font-bold text-blue-600 text-lg">₹{(service?.price || 0) + 199}</p>
            </div>
          </div>
        </div>

        {/* Technician Info */}
        {booking.status !== 'pending' && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border border-blue-200">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Assigned Technician</h2>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-4">
                <div className="text-6xl">{mockTechnician.image}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{mockTechnician.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-yellow-600 mb-1">
                    <span>⭐ {mockTechnician.rating}</span>
                    <span className="text-gray-600">({mockTechnician.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">{mockTechnician.experience} experience</p>
                </div>
              </div>
              <a
                href={`tel:${mockTechnician.phone}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Call Technician
              </a>
            </div>
          </div>
        )}

        {/* Map Preview */}
        {booking.status === 'in-progress' && (
          <div className="bg-white rounded-xl p-8 mb-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Technician Location</h2>
            <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-blue-300">
              <div className="text-center">
                <svg
                  className="w-12 h-12 mx-auto text-blue-600 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-600">Technician is on the way</p>
                <p className="text-sm text-gray-500 mt-1">ETA: 25 minutes</p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Activity Timeline</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div className="w-1 h-8 bg-gray-200 my-1"></div>
              </div>
              <div className="pb-8">
                <p className="font-semibold text-gray-800">Booking Confirmed</p>
                <p className="text-xs text-gray-500 mt-1">Today at {booking.time}</p>
              </div>
            </div>
            {booking.status !== 'pending' && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div className="w-1 h-8 bg-gray-200 my-1"></div>
                </div>
                <div className="pb-8">
                  <p className="font-semibold text-gray-800">Technician Assigned</p>
                  <p className="text-xs text-gray-500 mt-1">Assigned to {mockTechnician.name}</p>
                </div>
              </div>
            )}
            {booking.status === 'in-progress' && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div className="w-1 h-8 bg-gray-200 my-1"></div>
                </div>
                <div className="pb-8">
                  <p className="font-semibold text-gray-800">Service in Progress</p>
                  <p className="text-xs text-gray-500 mt-1">Technician is working on your device</p>
                </div>
              </div>
            )}
            {booking.status === 'completed' && (
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-600"></div>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Service Completed</p>
                  <p className="text-xs text-gray-500 mt-1">Your device is ready</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/home"
            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <a
            href="tel:+919999999999"
            className="flex-1 border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition-colors text-center"
          >
            Contact Support
          </a>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <Link
            href="/home"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/orders"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">📦</span>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link
            href="/tracking"
            className="flex flex-col items-center py-3 px-4 text-blue-600 font-semibold"
          >
            <span className="text-2xl">📍</span>
            <span className="text-xs mt-1">Tracking</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
