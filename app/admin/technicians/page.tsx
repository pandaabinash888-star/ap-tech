'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  experience: number;
  rating: number;
  status: 'active' | 'inactive';
  joinDate: string;
  completedJobs?: number;
  totalEarnings?: number;
  avgResponseTime?: number;
}

export default function TechniciansManagement() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specializations: [] as string[],
    experience: 0,
    status: 'active',
  });

  const services = ['Mobile Repair', 'Laptop Repair', 'Desktop Repair', 'Battery Replacement', 'SSD Upgrade', 'Windows Installation'];

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    const techData = JSON.parse(localStorage.getItem('technicians') || '[]');
    setTechnicians(techData);
  }, [router]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specializations: [],
      experience: 0,
      status: 'active',
    });
    setShowModal(true);
  };

  const handleEdit = (tech: Technician) => {
    setEditingId(tech.id);
    setFormData({
      name: tech.name,
      email: tech.email,
      phone: tech.phone,
      specializations: tech.specializations,
      experience: tech.experience,
      status: tech.status,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all fields');
      return;
    }

    if (editingId) {
      const updated = technicians.map((t) =>
        t.id === editingId
          ? { ...t, ...formData }
          : t
      );
      setTechnicians(updated);
      localStorage.setItem('technicians', JSON.stringify(updated));
    } else {
      const newTech: Technician = {
        id: `tech_${Date.now()}`,
        ...formData as any,
        rating: 4.5,
        joinDate: new Date().toISOString().split('T')[0],
      };
      const updated = [...technicians, newTech];
      setTechnicians(updated);
      localStorage.setItem('technicians', JSON.stringify(updated));
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = technicians.filter((t) => t.id !== id);
    setTechnicians(updated);
    localStorage.setItem('technicians', JSON.stringify(updated));
  };

  const toggleSpecialization = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(service)
        ? prev.specializations.filter((s) => s !== service)
        : [...prev.specializations, service],
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
            <p className="text-blue-200 text-sm">Technician Management</p>
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
            <Link href="/admin/bookings" className="py-3 px-2 hover:text-blue-600 text-gray-600 whitespace-nowrap">
              Bookings
            </Link>
            <Link href="/admin/technicians" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
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
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Technicians ({technicians.length})</h2>
            <p className="text-gray-600 text-sm">Manage your repair team</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Add Technician
          </button>
        </div>

        {/* Technicians Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map((tech) => (
            <div key={tech.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-24"></div>
              <div className="p-6 -mt-12 relative">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.email}</p>
                  <p className="text-sm text-gray-600">{tech.phone}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Specializations:</p>
                  <div className="flex flex-wrap gap-1">
                    {tech.specializations.slice(0, 2).map((spec) => (
                      <span key={spec} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {spec}
                      </span>
                    ))}
                    {tech.specializations.length > 2 && (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        +{tech.specializations.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-semibold">{tech.experience} yrs</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rating</p>
                    <p className="font-semibold">⭐ {tech.rating}</p>
                  </div>
                </div>

                {tech.completedJobs !== undefined && (
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs bg-gray-50 p-2 rounded">
                    <div>
                      <p className="text-gray-600">Jobs</p>
                      <p className="font-semibold">{tech.completedJobs}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Earnings</p>
                      <p className="font-semibold">₹{tech.totalEarnings}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Response</p>
                      <p className="font-semibold">{tech.avgResponseTime}min</p>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tech.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {tech.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(tech)}
                    className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tech.id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {technicians.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">No technicians added yet</p>
            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
            >
              Add First Technician
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Technician' : 'Add New Technician'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter technician name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(service)}
                        onChange={() => toggleSpecialization(service)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
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
                {editingId ? 'Update' : 'Add'} Technician
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
