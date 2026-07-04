'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingTrackingDetail() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;
  const [booking, setBooking] = useState<any>(null);
  const whatsappNumber = '8817660170';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20AP%20TECH%2C%20I%20have%20a%20question%20about%20booking%20%23${bookingId}`;

  useEffect(() => {
    if (!bookingId) return;

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const foundBooking = bookings.find((b: any) => b.id === bookingId);
    
    if (foundBooking) {
      setBooking(foundBooking);
    }
  }, [bookingId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'confirmed': return 'text-blue-600';
      case 'in-progress': return 'text-purple-600';
      case 'completed': return 'text-green-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusStep = (status: string) => {
    const steps = ['pending', 'confirmed', 'in-progress', 'completed'];
    return steps.indexOf(status) + 1;
  };

  const trackingHistory = [
    { step: 1, status: 'pending', title: 'Booking Received', description: 'Your booking request has been received', icon: '📋' },
    { step: 2, status: 'confirmed', title: 'Confirmed', description: 'Technician has been assigned', icon: '✓' },
    { step: 3, status: 'in-progress', title: 'In Progress', description: 'Technician is on the way', icon: '🚗' },
    { step: 4, status: 'completed', title: 'Completed', description: 'Service has been completed', icon: '✅' },
  ];

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const currentStep = getStatusStep(booking.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Tracking</h1>
            <p className="text-sm text-gray-600 mt-1">Booking ID: {booking.id}</p>
          </div>
          <Link href="/orders" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Orders
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Status Timeline */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Service Status</h2>
          
          <div className="space-y-6">
            {trackingHistory.map((item, index) => (
              <div key={item.step} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                    currentStep >= item.step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {item.icon}
                  </div>
                  {index < trackingHistory.length - 1 && (
                    <div className={`w-1 h-16 mt-2 ${
                      currentStep > item.step ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>

                {/* Content */}
                <div className="pt-2 pb-6 flex-1">
                  <h3 className={`text-lg font-semibold ${getStatusColor(item.status)}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  {booking.status === item.status && (
                    <p className="text-sm text-blue-600 mt-2 font-medium">Current Status</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Service Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Service Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Service</p>
                <p className="font-semibold text-gray-900">{booking.serviceName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled Date</p>
                <p className="font-semibold text-gray-900">{booking.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled Time</p>
                <p className="font-semibold text-gray-900">{booking.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="font-semibold text-gray-900">{booking.description || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Charge</span>
                <span className="font-semibold">₹{booking.servicePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Visit Charge</span>
                <span className="font-semibold">₹199</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-lg font-bold text-blue-600">₹{booking.totalAmount}</span>
              </div>
              <div className={`mt-3 px-3 py-2 rounded text-center font-semibold ${
                booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status === 'completed' ? 'Payment Completed' : 'Payment Pending'}
              </div>
            </div>
          </div>
        </div>

        {/* Technician Info */}
        {booking.technicianName && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Assigned Technician</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {booking.technicianName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{booking.technicianName}</p>
                <p className="text-sm text-gray-600">Experience: {booking.technicianExperience || '5+ years'}</p>
                <p className="text-sm text-gray-600">Rating: {booking.technicianRating || '4.5'}/5</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-green-50 border border-green-300 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-900 mb-2">Need Assistance?</h3>
          <p className="text-green-800 mb-4">Contact us on WhatsApp for any queries about your booking.</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Chat on WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}
