'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    address: '',
    phone: '',
    notes: '',
  });

  const services = [
    { id: 1, name: 'Mobile Repair', price: 299, description: 'Screen, battery, speaker repair' },
    { id: 2, name: 'Laptop Repair', price: 499, description: 'Motherboard, HDD, RAM issues' },
    { id: 3, name: 'Battery Replacement', price: 199, description: 'Quick battery swap' },
    { id: 4, name: 'Screen Replacement', price: 349, description: 'Display fixing & replacement' },
    { id: 5, name: 'SSD Upgrade', price: 399, description: 'Storage upgrade service' },
    { id: 6, name: 'Software Installation', price: 149, description: 'Windows, antivirus, drivers' },
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    } else {
      const user = JSON.parse(userData);
      setUser(user);
      setBookingData(prev => ({
        ...prev,
        service: serviceId || '1',
        phone: user.phone || '',
      }));
    }
  }, [router, serviceId]);

  const whatsappNumber = '8817660170';
  const whatsappBookingLink = `https://wa.me/${whatsappNumber}?text=Hi%20AP%20TECH%2C%20I%20need%20help%20with%20booking%20a%20service`;
  
  const selectedService = services.find(s => s.id === parseInt(bookingData.service));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store booking data
    const booking = {
      ...bookingData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    router.push(`/booking-confirmation?id=${booking.id}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-blue-600">Book Service</h1>
          <div className="w-12"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* WhatsApp Contact Banner */}
        <div className="mb-6 bg-green-50 border border-green-300 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-green-900 mb-1">Need Help with Booking?</h3>
            <p className="text-sm text-green-800">Chat with us on WhatsApp: +91 {whatsappNumber}</p>
          </div>
          <a
            href={whatsappBookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold whitespace-nowrap ml-4"
          >
            WhatsApp Now
          </a>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${step > 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <div className={`flex-1 h-1 mx-2 ${step > 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Service</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {services.map(service => (
                  <label
                    key={service.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      bookingData.service === service.id.toString()
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={bookingData.service === service.id.toString()}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <h4 className="font-bold text-gray-800">{service.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">₹{service.price}</p>
                  </label>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Service</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Time
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <label
                      key={slot}
                      className={`p-2 border-2 rounded text-center cursor-pointer transition-all ${
                        bookingData.time === slot
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={slot}
                        checked={bookingData.time === slot}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="text-sm font-semibold text-gray-800">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!bookingData.date || !bookingData.time}
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm & Enter Details */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Booking</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-800 mb-2">{selectedService?.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{selectedService?.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-semibold">{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Service Charge:</span>
                  <span className="font-semibold">₹{selectedService?.price}</span>
                </div>
                <div className="flex justify-between text-sm mt-2 pt-2 border-t border-blue-200">
                  <span className="text-gray-600">Visit Charge:</span>
                  <span className="font-semibold">₹199</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-3 pt-2 border-t border-blue-200">
                  <span>Total:</span>
                  <span className="text-blue-600">₹{(selectedService?.price || 0) + 199}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={bookingData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={bookingData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or notes"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
