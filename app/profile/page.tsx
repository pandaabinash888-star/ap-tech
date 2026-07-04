'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
      });

      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(storedBookings);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalSpent = bookings.reduce((sum, b) => {
    const price = {
      '1': 299, '2': 499, '3': 199, '4': 349, '5': 399, '6': 149
    }[b.service] || 0;
    return b.status === 'completed' ? sum + price + 199 : sum;
  }, 0);

  if (!user) {
    return null;
  }

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
          <h1 className="text-xl font-bold text-blue-600">My Profile</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{user.name || 'User'}</h2>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-blue-300">
            <div>
              <p className="text-blue-100 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold mt-1">{bookings.length}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Completed</p>
              <p className="text-3xl font-bold mt-1">{completedBookings}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Total Spent</p>
              <p className="text-2xl font-bold mt-1">₹{totalSpent}</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Full Name</span>
                <span className="font-semibold text-gray-800">{user.name || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold text-gray-800">{user.email || 'Not set'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Phone Number</span>
                <span className="font-semibold text-gray-800">{user.phone || 'Not set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {bookings.slice(-3).reverse().map((booking, idx) => {
                const services: any = {
                  '1': '📱 Mobile Repair',
                  '2': '💻 Laptop Repair',
                  '3': '🔋 Battery Replacement',
                  '4': '🖥 Screen Replacement',
                  '5': '💾 SSD Upgrade',
                  '6': '⚙️ Software Installation',
                };
                return (
                  <div key={booking.id} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-800">{services[booking.service]}</p>
                      <p className="text-sm text-gray-600">{booking.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/orders"
              className="block text-center text-blue-600 font-semibold mt-6 hover:text-blue-700"
            >
              View All Bookings
            </Link>
          </div>
        )}

        {/* Settings Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              <span className="flex items-center gap-3">
                <span className="text-xl">🔔</span>
                <span className="font-semibold text-gray-800">Push Notifications</span>
              </span>
              <span className="text-gray-600">Enabled</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              <span className="flex items-center gap-3">
                <span className="text-xl">🔒</span>
                <span className="font-semibold text-gray-800">Privacy</span>
              </span>
              <span className="text-gray-600">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
              <span className="flex items-center gap-3">
                <span className="text-xl">❓</span>
                <span className="font-semibold text-gray-800">Help & Support</span>
              </span>
              <span className="text-gray-600">→</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mb-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Version Info */}
        <div className="text-center text-sm text-gray-600">
          <p>AP TECH • Version 1.0.0</p>
          <p className="mt-1">Made with ❤️ for your convenience</p>
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
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">📍</span>
            <span className="text-xs mt-1">Tracking</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-3 px-4 text-blue-600 font-semibold"
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
