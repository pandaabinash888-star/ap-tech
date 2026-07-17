'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'super_admin' | 'moderator' | 'support';
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

export default function AdminManagement() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'moderator' as const,
    permissions: [] as string[],
  });

  const rolePermissions = {
    super_admin: ['all'],
    moderator: ['bookings', 'technicians', 'users', 'notifications'],
    support: ['bookings', 'users', 'notifications'],
  };

  const allPermissions = ['bookings', 'technicians', 'services', 'users', 'analytics', 'settings', 'notifications', 'admins'];

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    const currentAdmin = JSON.parse(adminData);
    setAdmin(currentAdmin);

    // Only super admins can access this page
    if (currentAdmin.role !== 'admin' && currentAdmin.role !== 'super_admin') {
      router.push('/admin/dashboard');
      return;
    }

    const adminUsersData = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    setAdmins(adminUsersData);
  }, [router]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'moderator',
      permissions: [],
    });
    setShowModal(true);
  };

  const handleEdit = (adminUser: AdminUser) => {
    setEditingId(adminUser.id);
    setFormData({
      name: adminUser.name,
      email: adminUser.email,
      password: '',
      role: adminUser.role,
      permissions: adminUser.permissions,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill all required fields');
      return;
    }

    if (!editingId && !formData.password) {
      alert('Password is required for new admins');
      return;
    }

    const permissions = formData.role === 'super_admin' ? ['all'] : formData.permissions;

    if (editingId) {
      const updated = admins.map((a) =>
        a.id === editingId
          ? {
              ...a,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              permissions,
              ...(formData.password && { password: formData.password }),
            }
          : a
      );
      setAdmins(updated);
      localStorage.setItem('adminUsers', JSON.stringify(updated));
    } else {
      const newAdmin: AdminUser = {
        id: `admin_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        permissions,
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      const updated = [...admins, newAdmin];
      setAdmins(updated);
      localStorage.setItem('adminUsers', JSON.stringify(updated));
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this admin user?')) {
      const updated = admins.filter((a) => a.id !== id);
      setAdmins(updated);
      localStorage.setItem('adminUsers', JSON.stringify(updated));
    }
  };

  const togglePermission = (perm: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
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
            <p className="text-blue-200 text-sm">Admin User Management</p>
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
              onClick={() => {
                localStorage.removeItem('adminUser');
                router.push('/admin/login');
              }}
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
            <Link href="/admin/admins" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
              Admin Users
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Admin Users ({admins.length + 1})</h2>
            <p className="text-gray-600 text-sm">Manage administrator accounts and permissions</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Add Admin
          </button>
        </div>

        {/* Admin Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {admins.map((adminUser) => (
                <tr key={adminUser.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{adminUser.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{adminUser.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {adminUser.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      adminUser.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {adminUser.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(adminUser.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm gap-2 flex">
                    <button
                      onClick={() => handleEdit(adminUser)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(adminUser.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {admins.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No additional admin users yet</p>
              <button
                onClick={handleAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
              >
                Add First Admin User
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Admin User' : 'Add New Admin User'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@aptech.com"
                />
              </div>

              {!editingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    role: e.target.value as any,
                    permissions: (rolePermissions as any)[e.target.value] || []
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="super_admin">Super Admin (All Access)</option>
                  <option value="moderator">Moderator</option>
                  <option value="support">Support</option>
                </select>
              </div>

              {formData.role !== 'super_admin' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded">
                    {allPermissions.map((perm) => (
                      <label key={perm} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(perm)}
                          onChange={() => togglePermission(perm)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 capitalize">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {editingId ? 'Update' : 'Add'} Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
