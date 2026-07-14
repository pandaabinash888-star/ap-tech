'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TechnicianDashboard() {
  const router = useRouter();
  const [technician, setTechnician] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('assigned');

  useEffect(() => {
    const techData = JSON.parse(localStorage.getItem('technicianUser') || 'null');
    if (!techData) {
      router.push('/technician/login');
    } else {
      setTechnician(techData);
      loadJobs();
    }
  }, [router]);

  const loadJobs = () => {
    const mockJobs = [
      {
        id: 'JOB001',
        customerName: 'Rajesh Kumar',
        service: 'AC Repair',
        location: '123 Main St, Downtown',
        date: new Date().toLocaleDateString(),
        time: '10:00 AM',
        status: 'assigned',
        priority: 'high',
        description: 'AC not cooling properly',
        phone: '+91-99999-00000',
      },
      {
        id: 'JOB002',
        customerName: 'Priya Singh',
        service: 'Refrigerator Service',
        location: '456 Oak Ave, Uptown',
        date: new Date().toLocaleDateString(),
        time: '2:30 PM',
        status: 'assigned',
        priority: 'medium',
        description: 'Strange noise from compressor',
        phone: '+91-98888-11111',
      },
      {
        id: 'JOB003',
        customerName: 'Amit Patel',
        service: 'Washing Machine Repair',
        location: '789 Elm St, Midtown',
        date: new Date(Date.now() - 86400000).toLocaleDateString(),
        time: '11:00 AM',
        status: 'completed',
        priority: 'low',
        description: 'Water leak from bottom',
        phone: '+91-97777-22222',
        earnings: 500,
      },
    ];
    setJobs(mockJobs);
  };

  const handleLogout = () => {
    localStorage.removeItem('technicianUser');
    router.push('/technician/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!technician) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><p>Loading...</p></div>;
  }

  const filteredJobs = jobs.filter(job => 
    activeTab === 'assigned' ? job.status === 'assigned' : 
    activeTab === 'completed' ? job.status === 'completed' : 
    jobs
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">AP TECH</h1>
            <span className="text-sm text-orange-600 font-medium">Technician Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{technician.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Name</h3>
            <p className="text-2xl font-bold text-gray-900">{technician.name}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Rating</h3>
            <p className="text-2xl font-bold text-gray-900">⭐ {technician.rating}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Completed Jobs</h3>
            <p className="text-2xl font-bold text-gray-900">{technician.completedJobs}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Phone</h3>
            <p className="text-sm text-gray-900 font-mono">{technician.phone}</p>
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Specializations</h2>
          <div className="flex flex-wrap gap-2">
            {technician.specializations.map((spec: string, idx: number) => (
              <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Jobs Section */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b flex">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'assigned'
                  ? 'border-b-2 border-orange-600 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Assigned Jobs ({jobs.filter(j => j.status === 'assigned').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'completed'
                  ? 'border-b-2 border-orange-600 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Completed ({jobs.filter(j => j.status === 'completed').length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'all'
                  ? 'border-b-2 border-orange-600 text-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Jobs ({jobs.length})
            </button>
          </div>

          {/* Jobs List */}
          <div className="p-6">
            {filteredJobs.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No jobs available</p>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{job.customerName}</h3>
                        <p className="text-sm text-gray-600">{job.service}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                        <span className={`font-bold text-sm ${getPriorityColor(job.priority)}`}>
                          {job.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-600">Date</p>
                        <p className="font-semibold text-gray-900">{job.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Time</p>
                        <p className="font-semibold text-gray-900">{job.time}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{job.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <p className="font-semibold text-gray-900">{job.phone}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{job.description}</p>

                    <div className="flex gap-2">
                      {job.status === 'assigned' && (
                        <>
                          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm font-medium transition">
                            Start Job
                          </button>
                          <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded text-sm font-medium transition">
                            Call Customer
                          </button>
                        </>
                      )}
                      {job.status === 'completed' && (
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Completed • Earned ₹{job.earnings}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
