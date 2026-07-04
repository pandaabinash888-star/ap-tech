'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrdersScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(storedBookings);
    }
  }, [router]);

  const services: any = {
    '1': { name: 'Mobile Repair', icon: '📱', price: 299 },
    '2': { name: 'Laptop Repair', icon: '💻', price: 499 },
    '3': { name: 'Battery Replacement', icon: '🔋', price: 199 },
    '4': { name: 'Screen Replacement', icon: '🖥', price: 349 },
    '5': { name: 'SSD Upgrade', icon: '💾', price: 399 },
    '6': { name: 'Software Installation', icon: '⚙️', price: 149 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === activeTab);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-blue-600">My Orders</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'pending', 'confirmed', 'in-progress', 'completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-colors capitalize ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">You haven't made any bookings yet</p>
            <Link
              href="/home"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => {
              const service = services[booking.service];
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">{service?.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800">{service?.name}</h3>
                        <p className="text-sm text-gray-600">ID: {booking.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Date</p>
                      <p className="font-semibold text-gray-800">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Time</p>
                      <p className="font-semibold text-gray-800">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Price</p>
                      <p className="font-semibold text-gray-800">₹{(service?.price || 0) + 199}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Address</p>
                      <p className="font-semibold text-gray-800 text-sm truncate">{booking.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/tracking?id=${booking.id}`}
                      className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
                    >
                      Track Service
                    </Link>
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => {
                          const updated = bookings.map(b =>
                            b.id === booking.id ? { ...b, status: 'cancelled' } : b
                          );
                          setBookings(updated);
                          localStorage.setItem('bookings', JSON.stringify(updated));
                        }}
                        className="flex-1 border-2 border-red-600 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-around">
          <Link
            href="/home"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/orders"
            className="flex flex-col items-center py-3 px-4 text-blue-600 font-semibold"
          >
            <span className="text-2xl">📦</span>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link
            href="/tracking"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
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
