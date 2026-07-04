'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Analytics() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    avgBookingValue: 0,
    totalUsers: 0,
    totalTechnicians: 0,
    avgRating: 0,
    bookingsByService: [] as any[],
    bookingsByStatus: [] as any[],
    revenueByMonth: [] as any[],
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    // Load data
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const technicians = JSON.parse(localStorage.getItem('technicians') || '[]');

    // Calculate stats
    const totalRevenue = bookings
      .filter((b: any) => b.status === 'completed')
      .reduce((sum: number, b: any) => sum + (b.totalCost || 0), 0);

    const completed = bookings.filter((b: any) => b.status === 'completed').length;
    const cancelled = bookings.filter((b: any) => b.status === 'cancelled').length;

    const avgBookingValue = bookings.length > 0 ? Math.round(totalRevenue / completed) : 0;

    // Bookings by service
    const bookingsByService: { [key: string]: number } = {};
    bookings.forEach((b: any) => {
      bookingsByService[b.serviceName] = (bookingsByService[b.serviceName] || 0) + 1;
    });

    // Bookings by status
    const bookingsByStatus: { [key: string]: number } = {};
    bookings.forEach((b: any) => {
      bookingsByStatus[b.status] = (bookingsByStatus[b.status] || 0) + 1;
    });

    // Get technician ratings
    const avgRating = technicians.length > 0
      ? (technicians.reduce((sum: number, t: any) => sum + (t.rating || 0), 0) / technicians.length).toFixed(1)
      : 0;

    setStats({
      totalRevenue,
      totalBookings: bookings.length,
      completedBookings: completed,
      cancelledBookings: cancelled,
      avgBookingValue,
      totalUsers: users.length,
      totalTechnicians: technicians.length,
      avgRating: parseFloat(avgRating as string),
      bookingsByService: Object.entries(bookingsByService).map(([name, count]) => ({ name, count })),
      bookingsByStatus: Object.entries(bookingsByStatus).map(([status, count]) => ({ status, count })),
      revenueByMonth: [],
    });
  }, [router]);

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
            <p className="text-blue-200 text-sm">Analytics & Reports</p>
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
          <div className="flex gap-6">
            <Link href="/admin/dashboard" className="py-3 px-2 hover:text-blue-600 text-gray-600">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="py-3 px-2 hover:text-blue-600 text-gray-600">
              Bookings
            </Link>
            <Link href="/admin/technicians" className="py-3 px-2 hover:text-blue-600 text-gray-600">
              Technicians
            </Link>
            <Link href="/admin/services" className="py-3 px-2 hover:text-blue-600 text-gray-600">
              Services
            </Link>
            <Link href="/admin/users" className="py-3 px-2 hover:text-blue-600 text-gray-600">
              Users
            </Link>
            <Link href="/admin/analytics" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium">
              Analytics
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">₹{stats.totalRevenue}</h3>
            <p className="text-xs text-gray-500 mt-2">From completed services</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Avg Booking Value</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">₹{stats.avgBookingValue}</h3>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalBookings > 0 ? `${stats.completedBookings} completed` : 'No bookings yet'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Completion Rate</p>
            <h3 className="text-3xl font-bold text-purple-600 mt-2">
              {stats.totalBookings > 0
                ? `${Math.round((stats.completedBookings / stats.totalBookings) * 100)}%`
                : '0%'}
            </h3>
            <p className="text-xs text-gray-500 mt-2">{stats.completedBookings} of {stats.totalBookings}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Avg Technician Rating</p>
            <h3 className="text-3xl font-bold text-yellow-600 mt-2">⭐ {stats.avgRating}</h3>
            <p className="text-xs text-gray-500 mt-2">{stats.totalTechnicians} technicians</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bookings by Service */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Bookings by Service</h2>
            <div className="space-y-4">
              {stats.bookingsByService.length > 0 ? (
                stats.bookingsByService.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-700">{item.name}</p>
                      <span className="text-sm font-bold text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            stats.totalBookings > 0 ? (item.count / stats.totalBookings) * 100 : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No booking data available</p>
              )}
            </div>
          </div>

          {/* Bookings by Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Bookings by Status</h2>
            <div className="space-y-4">
              {stats.bookingsByStatus.length > 0 ? (
                stats.bookingsByStatus.map((item) => {
                  let statusColor = 'bg-gray-600';
                  if (item.status === 'completed') statusColor = 'bg-green-600';
                  if (item.status === 'in-progress') statusColor = 'bg-blue-600';
                  if (item.status === 'confirmed') statusColor = 'bg-purple-600';
                  if (item.status === 'pending') statusColor = 'bg-yellow-600';
                  if (item.status === 'cancelled') statusColor = 'bg-red-600';

                  return (
                    <div key={item.status}>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-gray-700 capitalize">{item.status}</p>
                        <span className="text-sm font-bold text-gray-900">{item.count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${statusColor}`}
                          style={{
                            width: `${
                              stats.totalBookings > 0 ? (item.count / stats.totalBookings) * 100 : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">No booking data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Team Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="text-gray-600 text-sm">Total Technicians</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTechnicians}</p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <p className="text-gray-600 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <p className="text-gray-600 text-sm">Cancellation Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalBookings > 0
                  ? `${Math.round((stats.cancelledBookings / stats.totalBookings) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Overall Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">{stats.totalBookings}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{stats.completedBookings}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Cancelled</p>
              <p className="text-2xl font-bold text-red-600 mt-2">{stats.cancelledBookings}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">
                {stats.totalBookings - stats.completedBookings - stats.cancelledBookings}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
