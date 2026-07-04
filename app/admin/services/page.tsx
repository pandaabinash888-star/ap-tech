'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  icon: string;
  estimatedTime: number;
}

export default function ServicesManagement() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [services, setServices] = useState<Service[]>([
    {
      id: 'svc_1',
      name: 'Mobile Repair',
      category: 'mobile',
      description: 'Screen, battery, speaker repair',
      basePrice: 299,
      icon: '📱',
      estimatedTime: 60,
    },
    {
      id: 'svc_2',
      name: 'Laptop Repair',
      category: 'laptop',
      description: 'Motherboard, HDD, RAM issues',
      basePrice: 399,
      icon: '💻',
      estimatedTime: 120,
    },
    {
      id: 'svc_3',
      name: 'Battery Replacement',
      category: 'accessory',
      description: 'Quick battery swap',
      basePrice: 199,
      icon: '🔋',
      estimatedTime: 30,
    },
    {
      id: 'svc_4',
      name: 'Screen Replacement',
      category: 'desktop',
      description: 'Display fixing & replacement',
      basePrice: 349,
      icon: '🖥',
      estimatedTime: 60,
    },
    {
      id: 'svc_5',
      name: 'SSD Upgrade',
      category: 'storage',
      description: 'Fast SSD installation',
      basePrice: 249,
      icon: '💾',
      estimatedTime: 45,
    },
    {
      id: 'svc_6',
      name: 'Windows Installation',
      category: 'software',
      description: 'Fresh OS installation & setup',
      basePrice: 149,
      icon: '🛠',
      estimatedTime: 90,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    basePrice: 0,
    icon: '',
    estimatedTime: 0,
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    const servicesData = localStorage.getItem('services');
    if (servicesData) {
      setServices(JSON.parse(servicesData));
    }
  }, [router]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      basePrice: 0,
      icon: '',
      estimatedTime: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      basePrice: service.basePrice,
      icon: service.icon,
      estimatedTime: service.estimatedTime,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || formData.basePrice === 0) {
      alert('Please fill all required fields');
      return;
    }

    if (editingId) {
      const updated = services.map((s) =>
        s.id === editingId ? { ...s, ...formData } : s
      );
      setServices(updated);
      localStorage.setItem('services', JSON.stringify(updated));
    } else {
      const newService: Service = {
        id: `svc_${Date.now()}`,
        ...formData as any,
      };
      const updated = [...services, newService];
      setServices(updated);
      localStorage.setItem('services', JSON.stringify(updated));
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem('services', JSON.stringify(updated));
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
            <p className="text-blue-200 text-sm">Service Management</p>
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
            <Link href="/admin/services" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium">
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
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Services ({services.length})</h2>
            <p className="text-gray-600 text-sm">Manage repair services and pricing</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Add Service
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-center">
                <div className="text-5xl mb-2">{service.icon}</div>
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <p className="text-gray-600 text-xs">Base Price</p>
                    <p className="text-2xl font-bold text-blue-600">₹{service.basePrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs">Est. Time</p>
                    <p className="text-2xl font-bold text-purple-600">{service.estimatedTime}m</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">Category: <span className="font-semibold">{service.category}</span></p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mobile Repair"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon/Emoji</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="📱"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., mobile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Service description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Price (₹)</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Est. Time (mins)</label>
                  <input
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
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
                {editingId ? 'Update' : 'Add'} Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
