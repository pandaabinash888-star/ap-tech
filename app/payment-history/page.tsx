'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { paymentGateway, Payment } from '@/lib/payment-gateway';
import { Download, Filter, Search } from 'lucide-react';

export default function PaymentHistoryPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Load all payments
    const allPayments = paymentGateway.getAllPayments();
    setPayments(allPayments);
    setFilteredPayments(allPayments);
  }, [router]);

  useEffect(() => {
    let filtered = payments;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.id.includes(searchTerm) || p.transactionId?.includes(searchTerm)
      );
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, payments]);

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProviderIcon = (provider: string) => {
    const icons: Record<string, string> = {
      stripe: '💳',
      razorpay: '🅡',
      paypal: '🅿️',
    };
    return icons[provider] || '💰';
  };

  const stats = {
    totalTransactions: payments.length,
    totalSpent: payments.reduce((sum, p) => sum + p.amount, 0),
    completedPayments: payments.filter((p) => p.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-800 text-xl"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold text-blue-600">Payment History</h1>
          </div>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Back to Profile
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Transactions</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalTransactions}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Total Amount Spent</p>
            <p className="text-3xl font-bold text-green-600">₹{stats.totalSpent}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm mb-2">Successful Payments</p>
            <p className="text-3xl font-bold text-blue-600">{stats.completedPayments}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Payment ID or Transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredPayments.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No payments found</p>
              <Link href="/home" className="text-blue-600 hover:text-blue-700 font-medium">
                Go back to home
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Provider</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800 font-mono">{payment.id}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{getProviderIcon(payment.method.provider)}</span>
                          <span className="capitalize">{payment.method.provider}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">₹{payment.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(payment.timestamp).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {payment.transactionId || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => {
                            const receipt = `Payment Receipt\n\nPayment ID: ${payment.id}\nTransaction ID: ${payment.transactionId}\nAmount: ₹${payment.amount}\nDate: ${new Date(payment.timestamp).toLocaleString()}\nStatus: ${payment.status}`;
                            const blob = new Blob([receipt], { type: 'text/plain' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `receipt-${payment.id}.txt`;
                            a.click();
                          }}
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
