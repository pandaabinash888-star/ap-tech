'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminProfile() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'admin',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    const parsed = JSON.parse(adminData);
    setAdmin(parsed);
    setFormData({
      name: parsed.name || '',
      email: parsed.email || '',
      phone: parsed.phone || '',
      role: parsed.role || 'admin',
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updated = { ...admin, ...formData };
    localStorage.setItem('adminUser', JSON.stringify(updated));
    setAdmin(updated);
    setEditMode(false);
    setMessage('Profile updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

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
            <p className="text-blue-200 text-sm">Admin Profile</p>
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
          <div className="flex gap-6 overflow-x-auto">
            <Link href="/admin/dashboard" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Dashboard
            </Link>
            <Link href="/admin/bookings" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
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
            <Link href="/admin/profile" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        {message && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-800">{message}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <div className="text-4xl font-bold text-white">
                {admin.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{admin.name || 'Admin'}</h2>
              <p className="text-gray-600">{admin.email}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {admin.role?.toUpperCase() || 'ADMIN'}
                </span>
                {admin.loginTime && (
                  <span className="text-xs text-gray-500">
                    Last login: {new Date(admin.loginTime).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    !editMode ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    !editMode ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    !editMode ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'bg-white'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    !editMode ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : 'bg-white'
                  }`}
                >
                  <option value="admin">Super Admin</option>
                  <option value="moderator">Moderator</option>
                  <option value="support">Support</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-6 border-t">
              {!editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        name: admin.name || '',
                        email: admin.email || '',
                        phone: admin.phone || '',
                        role: admin.role || 'admin',
                      });
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Security</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Change your admin password</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                Change Password
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">Active Sessions</p>
                <p className="text-sm text-gray-600">Manage your login sessions</p>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                View Sessions
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
