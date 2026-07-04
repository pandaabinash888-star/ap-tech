'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalBookings: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export default function UsersManagement() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    const userData = JSON.parse(localStorage.getItem('users') || '[]');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    const usersWithStats = userData.map((user: any) => {
      const userBookings = bookings.filter((b: any) => b.userId === user.id);
      const totalSpent = userBookings.reduce((sum: number, b: any) => sum + (b.totalCost || 0), 0);

      return {
        ...user,
        totalBookings: userBookings.length,
        totalSpent,
        status: user.status || 'active',
      };
    });

    setUsers(usersWithStats);
  }, [router]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const toggleUserStatus = (userId: string) => {
    const updated = users.map((u) =>
      u.id === userId
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    );
    setUsers(updated);

    const usersData = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsersData = usersData.map((u: any) =>
      u.id === userId
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsersData));
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
            <p className="text-blue-200 text-sm">User Management</p>
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
            <Link href="/admin/users" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium">
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
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex-1 w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'inactive'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded transition capitalize ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Bookings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.city}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {user.totalBookings}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{user.totalSpent}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          className={`px-3 py-1 rounded transition text-xs font-medium ${
                            user.status === 'active'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Users</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">{users.length}</h3>
            <p className="text-xs text-gray-500 mt-2">Registered customers</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Active Users</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {users.filter((u) => u.status === 'active').length}
            </h3>
            <p className="text-xs text-gray-500 mt-2">Currently active</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <h3 className="text-3xl font-bold text-purple-600 mt-2">
              ₹{users.reduce((sum, u) => sum + u.totalSpent, 0)}
            </h3>
            <p className="text-xs text-gray-500 mt-2">From all users</p>
          </div>
        </div>
      </main>
    </div>
  );
}
