'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, MessageCircle, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LiveTrackingPage() {
  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2090 });
  const [eta, setEta] = useState(5);
  const [status, setStatus] = useState<'pending' | 'on_way' | 'arrived' | 'in_progress' | 'completed'>('on_way');

  useEffect(() => {
    // Simulate technician movement
    const interval = setInterval(() => {
      setPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.002,
        lng: prev.lng + (Math.random() - 0.5) * 0.002,
      }));

      setEta((prev) => (prev > 0 ? prev - 1 : 0));

      // Update status based on ETA
      if (eta <= 2 && status === 'on_way') {
        setStatus('arrived');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [eta, status]);

  const technician = {
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    rating: 4.9,
    reviews: 234,
    vehicle: 'Blue Honda City',
    experience: '5 years',
  };

  const booking = {
    id: 'BK#2024001',
    service: 'iPhone 14 Screen Replacement',
    date: '2024-07-05',
    time: '02:30 PM',
    address: '123 Main Street, Delhi 110001',
    amount: '₹3,999',
  };

  const timeline = [
    { step: 'Booking Confirmed', time: '02:00 PM', completed: true },
    { step: 'Technician Assigned', time: '02:05 PM', completed: true },
    { step: 'On the way', time: '02:10 PM', completed: true },
    { step: 'Arrived', time: eta <= 0 ? '02:30 PM' : '--', completed: eta <= 0 },
    { step: 'Service in progress', time: 'Soon', completed: false },
    { step: 'Service completed', time: 'Later', completed: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Live Service Tracking</h1>
          <p className="text-slate-600">Booking {booking.id}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map and Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Container */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-50 relative flex items-center justify-center">
                {/* Simplified Map View */}
                <div className="relative w-full h-full">
                  {/* Grid background */}
                  <svg className="w-full h-full absolute inset-0 opacity-10">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>

                  {/* Technician Location */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${((position.lng + 77.3) % 0.1) * 1000}%`,
                      top: `${((position.lat - 28.5) % 0.1) * 1000}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Customer Location (destination) */}
                  <div className="absolute right-20 bottom-20">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-green-300"></div>
                  </div>

                  {/* Route line */}
                  <svg className="w-full h-full absolute inset-0" style={{ pointerEvents: 'none' }}>
                    <line x1="20%" y1="50%" x2="80%" y2="60%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" opacity="0.5" />
                  </svg>
                </div>

                {/* Map Info Overlay */}
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold text-slate-900">ETA: {eta} mins</p>
                </div>
              </div>

              {/* Address and Details */}
              <div className="p-6 border-t border-slate-200">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">{booking.address}</p>
                    <p className="text-sm text-slate-600 mt-1">Service scheduled for {booking.time}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Service Timeline</h3>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.completed ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      {item.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${item.completed ? 'text-slate-900' : 'text-slate-600'}`}>
                        {item.step}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technician Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Your Technician</h3>
              
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                  {technician.name.charAt(0)}
                </div>
                <p className="font-semibold text-slate-900">{technician.name}</p>
                <p className="text-sm text-slate-600">{technician.experience} experience</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-yellow-700">★</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{technician.rating}</p>
                    <p className="text-xs text-slate-600">{technician.reviews} reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${technician.phone}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </a>
                <a
                  href={`https://wa.me/${technician.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Service</p>
                  <p className="font-semibold text-slate-900 mt-1">{booking.service}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Date & Time</p>
                  <p className="font-semibold text-slate-900 mt-1">{booking.date} at {booking.time}</p>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Amount</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{booking.amount}</p>
                </div>
              </div>
            </div>

            {/* Status Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Service in Progress</p>
                  <p className="text-sm text-blue-700 mt-1">Your technician will arrive soon. Please keep your device ready.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
