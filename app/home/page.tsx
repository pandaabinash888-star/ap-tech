'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const services = [
    {
      id: 1,
      name: 'Mobile Repair',
      icon: '📱',
      category: 'mobile',
      description: 'Screen, battery, speaker repair',
    },
    {
      id: 2,
      name: 'Laptop Repair',
      icon: '💻',
      category: 'laptop',
      description: 'Motherboard, HDD, RAM issues',
    },
    {
      id: 3,
      name: 'Battery Replacement',
      icon: '🔋',
      category: 'accessory',
      description: 'Quick battery swap',
    },
    {
      id: 4,
      name: 'Screen Replacement',
      icon: '🖥',
      category: 'desktop',
      description: 'Display fixing & replacement',
    },
    {
      id: 5,
      name: 'SSD Upgrade',
      icon: '💾',
      category: 'laptop',
      description: 'Storage upgrade service',
    },
    {
      id: 6,
      name: 'Software Installation',
      icon: '⚙️',
      category: 'desktop',
      description: 'Windows, antivirus, drivers',
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">AP TECH</h1>
            <p className="text-xs text-gray-500">Doorstep Repair Service</p>
          </div>
          <Link
            href="/profile"
            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold hover:bg-blue-700 transition-colors"
          >
            {user.name?.charAt(0).toUpperCase()}
          </Link>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Professional Doorstep Repair</h2>
          <p className="text-blue-100 mb-4">Mobile • Laptop • Desktop</p>
          <div className="bg-orange-500 text-white px-4 py-2 rounded-full inline-block font-semibold text-sm">
            Visit Charge ₹199 Only
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Service */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Featured Offer</h3>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-8 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold mb-2">Free Diagnosis</p>
              <p className="text-sm text-purple-100">Get your device checked for free</p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors">
              Avail Now
            </button>
          </div>
        </section>

        {/* Services Grid */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/booking?service=${service.id}`}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                  Book Now
                  <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gray-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Need Emergency Help?</h3>
          <p className="text-gray-600 mb-6">Call us for urgent repairs</p>
          <a
            href="tel:+919999999999"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Call Now
          </a>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-around">
          <Link
            href="/home"
            className="flex flex-col items-center py-3 px-4 text-blue-600 font-semibold"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/orders"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">📦</span>
            <span className="text-xs mt-1">Orders</span>
          </Link>
          <Link
            href="/tracking"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">📍</span>
            <span className="text-xs mt-1">Tracking</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Padding for bottom nav */}
      <div className="h-20"></div>
    </div>
  );
}
