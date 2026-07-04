'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NotificationService } from '@/lib/notifications';

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    totalTechnicians: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
  });
  const [recentNotifications, setRecentNotifications] = useState<any[]>([]);

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    // Load stats from localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const technicians = JSON.parse(localStorage.getItem('technicians') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const completed = bookings.filter((b: any) => b.status === 'completed').length;
    const pending = bookings.filter((b: any) => b.status === 'pending' || b.status === 'confirmed').length;

    const revenue = bookings
      .filter((b: any) => b.status === 'completed')
      .reduce((sum: number, b: any) => sum + (b.totalCost || 0), 0);

    setStats({
      totalBookings: bookings.length,
      completedBookings: completed,
      pendingBookings: pending,
      totalTechnicians: technicians.length,
      totalUsers: users.length,
      monthlyRevenue: revenue,
    });

    // Load recent notifications
    const notifications = NotificationService.getAdminNotifications();
    setRecentNotifications(notifications.slice(-5).reverse());
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
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
            <p className="text-blue-200 text-sm">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{admin.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-6">
            <Link href="/admin/dashboard" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium">
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
            <Link href="/admin/analytics" className="py-3 px-2 hover:text-blue-600 text-gray-600">
              Analytics
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Recent Notifications Alert */}
        {recentNotifications.length > 0 && (
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Recent Booking Alerts</h3>
                <div className="space-y-2">
                  {recentNotifications.map((notif) => (
                    <div key={notif.id} className="text-sm text-blue-800">
                      <p className="font-medium">{notif.title}</p>
                      <p className="text-blue-700">{notif.message}</p>
                      <p className="text-xs text-blue-600 mt-1">{new Date(notif.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/admin/notifications"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm whitespace-nowrap"
              >
                View All
              </Link>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Bookings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalBookings}
                </h3>
              </div>
              <div className="text-4xl text-blue-600">📋</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">All time</p>
          </div>

          {/* Completed Bookings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <h3 className="text-3xl font-bold text-green-600 mt-2">
                  {stats.completedBookings}
                </h3>
              </div>
              <div className="text-4xl">✅</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              {stats.totalBookings > 0
                ? `${((stats.completedBookings / stats.totalBookings) * 100).toFixed(1)}%`
                : '0%'}{' '}
              success rate
            </p>
          </div>

          {/* Pending Bookings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <h3 className="text-3xl font-bold text-orange-600 mt-2">
                  {stats.pendingBookings}
                </h3>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">Awaiting completion</p>
          </div>

          {/* Total Technicians */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Technicians</p>
                <h3 className="text-3xl font-bold text-purple-600 mt-2">
                  {stats.totalTechnicians}
                </h3>
              </div>
              <div className="text-4xl">🔧</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">Active team members</p>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Users</p>
                <h3 className="text-3xl font-bold text-indigo-600 mt-2">
                  {stats.totalUsers}
                </h3>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">Registered customers</p>
          </div>

          {/* Monthly Revenue */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <h3 className="text-3xl font-bold text-green-700 mt-2">
                  ₹{stats.monthlyRevenue}
                </h3>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <p className="text-gray-500 text-xs mt-4">From completed services</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/bookings"
              className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition"
            >
              <h3 className="font-semibold text-gray-900">View Bookings</h3>
              <p className="text-sm text-gray-600">Manage all service bookings</p>
            </Link>
            <Link
              href="/admin/technicians"
              className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition"
            >
              <h3 className="font-semibold text-gray-900">Manage Technicians</h3>
              <p className="text-sm text-gray-600">Add/edit technician profiles</p>
            </Link>
            <Link
              href="/admin/services"
              className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition"
            >
              <h3 className="font-semibold text-gray-900">Manage Services</h3>
              <p className="text-sm text-gray-600">Update services and pricing</p>
            </Link>
            <Link
              href="/admin/users"
              className="p-4 border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 transition"
            >
              <h3 className="font-semibold text-gray-900">User Management</h3>
              <p className="text-sm text-gray-600">View and manage users</p>
            </Link>
            <Link
              href="/admin/analytics"
              className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition"
            >
              <h3 className="font-semibold text-gray-900">Analytics & Reports</h3>
              <p className="text-sm text-gray-600">View detailed reports</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
