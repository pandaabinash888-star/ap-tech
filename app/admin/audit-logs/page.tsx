'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  category: string;
  details: string;
  targetId?: string;
  timestamp: string;
  ipAddress?: string;
  status: 'success' | 'failed';
}

export default function AuditLogs() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    const auditLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    setLogs(auditLogs.reverse());
  }, [router]);

  useEffect(() => {
    let filtered = logs;

    // Filter by category
    if (filter !== 'all') {
      filtered = filtered.filter(log => log.category === filter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log =>
        log.action.toLowerCase().includes(query) ||
        log.adminEmail.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query)
      );
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date();
      const logDate = new Date();
      
      if (dateFilter === 'today') {
        logDate.setHours(0, 0, 0, 0);
      } else if (dateFilter === 'week') {
        logDate.setDate(now.getDate() - 7);
      } else if (dateFilter === 'month') {
        logDate.setMonth(now.getMonth() - 1);
      }

      filtered = filtered.filter(log => new Date(log.timestamp) >= logDate);
    }

    setFilteredLogs(filtered);
  }, [logs, filter, searchQuery, dateFilter]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const logActivity = (action: string, category: string, details: string, status: 'success' | 'failed' = 'success') => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      adminEmail: admin?.email || 'unknown',
      action,
      category,
      details,
      timestamp: new Date().toISOString(),
      status,
    };

    const existingLogs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
    const updated = [...existingLogs, newLog];
    localStorage.setItem('auditLogs', JSON.stringify(updated));
  };

  if (!admin) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const categories = ['all', 'booking', 'technician', 'service', 'user', 'admin', 'settings', 'login'];
  const getActionColor = (status: string) => {
    return status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AP TECH Admin</h1>
            <p className="text-blue-200 text-sm">Audit Logs & Activity</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{admin.email}</span>
            <Link
              href="/admin/profile"
              className="px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded transition text-sm"
            >
              Profile
            </Link>
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
          <div className="flex gap-6 overflow-x-auto">
            <Link href="/admin/dashboard" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Bookings
            </Link>
            <Link href="/admin/analytics" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Analytics
            </Link>
            <Link href="/admin/audit-logs" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
              Audit Logs
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Activity & Audit Logs</h2>
          <p className="text-gray-600">Track all admin actions and system activities for security and compliance</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by action, email, or details..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Total Activities</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{logs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Successful</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{logs.filter(l => l.status === 'success').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Failed</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{logs.filter(l => l.status === 'failed').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-gray-600 text-sm">Today</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {logs.filter(l => {
                const logDate = new Date(l.timestamp);
                const today = new Date();
                return logDate.toDateString() === today.toDateString();
              }).length}
            </p>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Admin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Details</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.adminEmail}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{log.action}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium capitalize">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{log.details}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-gray-500">No audit logs found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Log Stats */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(1).map(cat => {
              const count = logs.filter(l => l.category === cat).length;
              return (
                <div key={cat} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm capitalize">{cat}s</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
