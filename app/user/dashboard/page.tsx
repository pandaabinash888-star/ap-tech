'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, Mail, LogOut, Plus, Clock, CheckCircle, AlertCircle, Star, Download } from 'lucide-react';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));

    const userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    setBookings(userBookings);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/login');
  };

  const getBookingStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'green', icon: CheckCircle, label: 'Completed' };
      case 'in-progress':
        return { color: 'blue', icon: Clock, label: 'In Progress' };
      case 'pending':
        return { color: 'yellow', icon: AlertCircle, label: 'Pending' };
      default:
        return { color: 'gray', icon: AlertCircle, label: 'Unknown' };
    }
  };

  const downloadInvoice = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      const invoiceContent = `
INVOICE - AP TECH SERVICE
Booking ID: ${booking.id}
Date: ${booking.date}
Service: ${booking.service}
Amount: ₹${booking.amount || 'Pending'}
Status: ${booking.status}

Thank you for using AP TECH!
      `;
      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${bookingId}.txt`;
      a.click();
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AT</span>
            </div>
            <span className="font-bold text-xl">AP TECH</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{user.name || 'User'}</h1>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{user.phone || 'Not provided'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.address || 'Not provided'}</span>
                </div>
              </div>
            </div>
            <Link
              href="/booking"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Booking
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm mb-2">Total Bookings</p>
            <p className="text-3xl font-bold text-slate-900">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-600">{bookings.filter(b => b.status === 'completed').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm mb-2">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{bookings.filter(b => b.status === 'in-progress').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-slate-600 text-sm mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-slate-900">
              ₹{bookings.reduce((sum, b) => sum + (b.amount || 0), 0)}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-slate-200 flex">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'bookings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium transition ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Profile Settings
            </button>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="p-6">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 mb-4">No bookings yet</p>
                  <Link
                    href="/booking"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-block"
                  >
                    Book a Service
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const status = getBookingStatus(booking.status);
                    const StatusIcon = status.icon;
                    return (
                      <div key={booking.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-slate-900">Booking #{booking.id}</p>
                            <p className="text-sm text-slate-600">{booking.service}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-5 h-5 text-${status.color}-600`} />
                            <span className={`px-3 py-1 text-sm font-medium rounded-full bg-${status.color}-100 text-${status.color}-700`}>
                              {status.label}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-slate-600">Date</p>
                            <p className="font-medium">{booking.date}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Time</p>
                            <p className="font-medium">{booking.time || 'Not scheduled'}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Location</p>
                            <p className="font-medium">{booking.address || 'Not provided'}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Amount</p>
                            <p className="font-medium">₹{booking.amount || 'Pending'}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {booking.status === 'completed' && (
                            <>
                              <button
                                onClick={() => downloadInvoice(booking.id)}
                                className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Invoice
                              </button>
                              <button className="px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Review
                              </button>
                            </>
                          )}
                          {booking.status === 'pending' && (
                            <button className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition">
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <form className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name || ''}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue={user.phone || ''}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Address</label>
                  <textarea
                    defaultValue={user.address || ''}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
