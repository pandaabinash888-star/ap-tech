'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CompanyDetails {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  logo?: string;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
}

export default function AdminSettings() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('details');

  // Company Details State
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    name: 'AP TECH',
    description: '',
    email: '',
    phone: '',
    address: '',
    businessHours: '',
    logo: undefined,
  });

  // Photo Gallery State
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoCaption, setPhotoCaption] = useState('');

  // Events State
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: undefined as string | undefined,
  });

  useEffect(() => {
    const adminData = localStorage.getItem('adminUser');
    if (!adminData) {
      router.push('/admin/login');
      return;
    }
    setAdmin(JSON.parse(adminData));

    // Load company details
    const companyData = localStorage.getItem('companyDetails');
    if (companyData) {
      setCompanyDetails(JSON.parse(companyData));
    }

    // Load photos
    const photosData = localStorage.getItem('photos');
    if (photosData) {
      setPhotos(JSON.parse(photosData));
    }

    // Load events
    const eventsData = localStorage.getItem('events');
    if (eventsData) {
      setEvents(JSON.parse(eventsData));
    }
  }, [router]);

  // Company Details Handlers
  const handleSaveCompanyDetails = () => {
    if (!companyDetails.name || !companyDetails.email || !companyDetails.phone) {
      alert('Please fill all required fields');
      return;
    }
    localStorage.setItem('companyDetails', JSON.stringify(companyDetails));
    alert('Company details saved successfully!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setCompanyDetails({ ...companyDetails, logo: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Photo Gallery Handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (editingPhotoId) {
          const updated = photos.map((p) =>
            p.id === editingPhotoId
              ? { ...p, url: dataUrl, caption: photoCaption }
              : p
          );
          setPhotos(updated);
          localStorage.setItem('photos', JSON.stringify(updated));
        } else {
          const newPhoto: Photo = {
            id: `photo_${Date.now()}`,
            url: dataUrl,
            caption: photoCaption,
            uploadedAt: new Date().toISOString(),
          };
          const updated = [...photos, newPhoto];
          setPhotos(updated);
          localStorage.setItem('photos', JSON.stringify(updated));
        }
        setShowPhotoModal(false);
        setPhotoCaption('');
        setEditingPhotoId(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      const updated = photos.filter((p) => p.id !== id);
      setPhotos(updated);
      localStorage.setItem('photos', JSON.stringify(updated));
    }
  };

  const handleAddPhotoClick = () => {
    setEditingPhotoId(null);
    setPhotoCaption('');
    setShowPhotoModal(true);
  };

  const handleEditPhoto = (photo: Photo) => {
    setEditingPhotoId(photo.id);
    setPhotoCaption(photo.caption);
    setShowPhotoModal(true);
  };

  // Events Handlers
  const handleAddEventClick = () => {
    setEditingEventId(null);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: undefined,
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEventId(event.id);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
    });
    setShowEventModal(true);
  };

  const handleEventImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setEventForm({ ...eventForm, image: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEvent = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time || !eventForm.location) {
      alert('Please fill all required fields');
      return;
    }

    if (editingEventId) {
      const updated = events.map((e) =>
        e.id === editingEventId ? { ...e, ...eventForm } : e
      );
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
    } else {
      const newEvent: Event = {
        id: `event_${Date.now()}`,
        ...eventForm,
      };
      const updated = [...events, newEvent];
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
    }
    setShowEventModal(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      localStorage.setItem('events', JSON.stringify(updated));
    }
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
            <p className="text-blue-200 text-sm">Settings</p>
          </div>
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
            <Link href="/admin/settings" className="py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-4 px-6 text-center font-medium transition ${
                activeTab === 'details'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Company Details
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-4 px-6 text-center font-medium transition ${
                activeTab === 'photos'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-4 px-6 text-center font-medium transition ${
                activeTab === 'events'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Events & News
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Company Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={companyDetails.name}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={companyDetails.email}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={companyDetails.phone}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={companyDetails.address}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                    <input
                      type="text"
                      value={companyDetails.businessHours}
                      onChange={(e) => setCompanyDetails({ ...companyDetails, businessHours: e.target.value })}
                      placeholder="e.g., Mon-Sat: 10AM-6PM"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={companyDetails.description}
                    onChange={(e) => setCompanyDetails({ ...companyDetails, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Company description and about"
                  />
                </div>

                {companyDetails.logo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo Preview</label>
                    <div className="p-4 bg-gray-50 rounded">
                      <img src={companyDetails.logo} alt="Company Logo" className="max-h-40 object-contain" />
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSaveCompanyDetails}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                >
                  Save Details
                </button>
              </div>
            )}

            {/* Photo Gallery Tab */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Photos ({photos.length})</h3>
                  <button
                    onClick={handleAddPhotoClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                  >
                    Add Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo) => (
                    <div key={photo.id} className="bg-gray-50 rounded-lg overflow-hidden shadow">
                      <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <p className="text-sm text-gray-900 font-medium mb-2">{photo.caption}</p>
                        <p className="text-xs text-gray-500 mb-3">
                          {new Date(photo.uploadedAt).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPhoto(photo)}
                            className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {photos.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded">
                    <p className="text-gray-500 mb-4">No photos uploaded yet</p>
                    <button
                      onClick={handleAddPhotoClick}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                    >
                      Upload First Photo
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Events & News Tab */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">Events & News ({events.length})</h3>
                  <button
                    onClick={handleAddEventClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                  >
                    Add Event
                  </button>
                </div>

                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-gray-500">Date & Time</p>
                              <p className="font-medium text-gray-900">
                                {event.date} at {event.time}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Location</p>
                              <p className="font-medium text-gray-900">{event.location}</p>
                            </div>
                          </div>
                        </div>
                        {event.image && (
                          <div className="ml-4">
                            <img src={event.image} alt={event.title} className="w-24 h-24 object-cover rounded" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {events.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded">
                    <p className="text-gray-500 mb-4">No events added yet</p>
                    <button
                      onClick={handleAddEventClick}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
                    >
                      Create First Event
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingPhotoId ? 'Edit Photo' : 'Upload Photo'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                <input
                  type="text"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Photo description"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowPhotoModal(false);
                  setPhotoCaption('');
                  setEditingPhotoId(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => document.querySelector('input[type="file"]')?.click?.()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Select Image
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingEventId ? 'Edit Event' : 'Add Event'}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Event description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Event location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEventImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowEventModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                {editingEventId ? 'Update' : 'Add'} Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
