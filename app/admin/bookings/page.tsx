'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function BookingsManagement() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    const bookingsData = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(bookingsData);
  }, [router]);

  const filteredBookings = bookings.filter((b) => {
    // Status filter
    if (filter !== 'all' && b.status !== filter) return false;
    
    // Search query filter (search in customer name and service name)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const customerMatch = b.customerName?.toLowerCase().includes(query);
      const serviceMatch = b.serviceName?.toLowerCase().includes(query);
      const idMatch = b.id?.toLowerCase().includes(query);
      if (!customerMatch && !serviceMatch && !idMatch) return false;
    }
    
    // Service filter
    if (serviceFilter !== 'all' && b.serviceName !== serviceFilter) return false;
    
    // Date range filter
    if (startDate) {
      const bookingDate = new Date(b.date);
      const filterStartDate = new Date(startDate);
      if (bookingDate < filterStartDate) return false;
    }
    if (endDate) {
      const bookingDate = new Date(b.date);
      const filterEndDate = new Date(endDate);
      filterEndDate.setHours(23, 59, 59, 999); // Include the entire end date
      if (bookingDate > filterEndDate) return false;
    }
    
    return true;
  });

  const uniqueServices = Array.from(new Set(bookings.map(b => b.serviceName).filter(Boolean)));

  const handleStatusUpdate = () => {
    if (!selectedBooking || !newStatus) return;

    const updated = bookings.map((b) =>
      b.id === selectedBooking.id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    setShowModal(false);
    setSelectedBooking(null);
  };

  const handleCancel = (bookingId: string) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!admin) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AP TECH Admin</h1>
            <p className="text-blue-200 text-sm">Booking Management</p>
          </div>
          <button
            onClick={() => router.push('/admin/login')}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6 overflow-x-auto">
            <Link href="/admin/dashboard" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
              Bookings
            </Link>
            <Link href="/admin/technicians" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Technicians
            </Link>
            <Link href="/admin/services" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Services
            </Link>
            <Link href="/admin/users" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Users
            </Link>
            <Link href="/admin/analytics" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Analytics
            </Link>
            <Link href="/admin/settings" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter and Stats */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">All Bookings ({filteredBookings.length})</h2>
            <p className="text-gray-600 text-sm">Manage and track customer service bookings</p>
          </div>

          {/* Search and Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by customer, service or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Services</option>
                {uniqueServices.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'confirmed', 'in-progress', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded transition capitalize text-sm ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.id.slice(0, 8)}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.customerName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{booking.date}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹{booking.totalCost}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setNewStatus(booking.status);
                            setShowModal(true);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Update Booking Status</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
              <input
                type="text"
                value={selectedBooking.id}
                disabled
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded border"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
