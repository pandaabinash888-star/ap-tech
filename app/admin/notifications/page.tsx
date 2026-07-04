'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NotificationService } from '@/lib/notifications';

export default function AdminNotifications() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'booking_created'>('all');

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    loadNotifications();

    // Auto-refresh notifications every 5 seconds
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, [router]);

  const loadNotifications = () => {
    let allNotifications = NotificationService.getAllNotifications();
    
    if (filter === 'unread') {
      allNotifications = allNotifications.filter(n => !n.adminRead);
    } else if (filter === 'booking_created') {
      allNotifications = allNotifications.filter(n => n.type === 'booking_created');
    }

    setNotifications(allNotifications.reverse());
  };

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  const handleMarkAsRead = (notificationId: string) => {
    NotificationService.markAsRead(notificationId);
    loadNotifications();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      NotificationService.clearNotifications();
      loadNotifications();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (!admin) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const unreadCount = notifications.filter(n => !n.adminRead).length;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">AP TECH Admin</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
            <Link href="/admin/notifications" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium">
              Notifications
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="border-b p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
              <p className="text-sm text-gray-600 mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Clear All
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="border-b bg-gray-50 px-6 py-3 flex gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('booking_created')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'booking_created'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              New Bookings
            </button>
          </div>

          {/* Notifications List */}
          <div className="divide-y">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-500">No notifications to display</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notif.adminRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                        {!notif.adminRead && (
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mt-2">{notif.message}</p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                        <span>Booking ID: {notif.bookingId}</span>
                        <span>{new Date(notif.timestamp).toLocaleString()}</span>
                      </div>
                      {notif.data && (
                        <div className="mt-3 bg-white rounded border p-3 text-sm">
                          <p><strong>Customer:</strong> {notif.data.customerName}</p>
                          <p><strong>Service:</strong> {notif.data.serviceName}</p>
                          <p><strong>Date:</strong> {notif.data.date} at {notif.data.time}</p>
                          <p><strong>Amount:</strong> ₹{notif.data.totalAmount}</p>
                          <p><strong>Phone:</strong> {notif.data.phone}</p>
                        </div>
                      )}
                    </div>
                    {!notif.adminRead && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm ml-4 whitespace-nowrap"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
