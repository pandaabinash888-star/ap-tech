'use client';

import { useState } from 'react';
import { BarChart3, TrendingDown, Zap, AlertCircle } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter' | 'year'>('month');

  const stats = {
    totalRepairs: 12,
    totalSpent: 18500,
    averageRepairTime: 165, // minutes
    satisfactionRate: 4.8,
    moneyLeftUnspent: 2300, // vs original quoted
  };

  const repairs = [
    { date: '2024-06-20', service: 'Screen Replacement', device: 'iPhone 14', cost: 3499, status: 'completed', time: 120 },
    { date: '2024-06-10', service: 'Battery Replacement', device: 'MacBook Pro', cost: 4999, status: 'completed', time: 240 },
    { date: '2024-05-28', service: 'Keyboard Repair', device: 'Dell Laptop', cost: 2899, status: 'completed', time: 180 },
    { date: '2024-05-15', service: 'Charging Port Fix', device: 'Samsung S23', cost: 1999, status: 'completed', time: 90 },
  ];

  const monthlyData = [
    { month: 'April', repairs: 2, cost: 6500 },
    { month: 'May', repairs: 4, cost: 9500 },
    { month: 'June', repairs: 6, cost: 12500 },
  ];

  const maxRepairs = Math.max(...monthlyData.map(d => d.repairs));
  const maxCost = Math.max(...monthlyData.map(d => d.cost));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Repair Analytics</h1>
          <p className="text-slate-600">Track your service history and savings</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {(['month', 'quarter', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {range === 'month' ? 'Last 30 Days' : range === 'quarter' ? 'Last 90 Days' : 'Last Year'}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-sm text-slate-600 font-semibold uppercase tracking-wide mb-2">Total Repairs</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalRepairs}</div>
            <p className="text-xs text-slate-600 mt-2">Services completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-sm text-slate-600 font-semibold uppercase tracking-wide mb-2">Total Spent</div>
            <div className="text-3xl font-bold text-slate-900">₹{stats.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-slate-600 mt-2">Repair investments</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-sm text-slate-600 font-semibold uppercase tracking-wide mb-2">Avg. Time</div>
            <div className="text-3xl font-bold text-slate-900">{Math.round(stats.averageRepairTime / 60)}h {stats.averageRepairTime % 60}m</div>
            <p className="text-xs text-slate-600 mt-2">Per repair</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-sm text-slate-600 font-semibold uppercase tracking-wide mb-2">Satisfaction</div>
            <div className="text-3xl font-bold text-yellow-500">{stats.satisfactionRate}</div>
            <p className="text-xs text-slate-600 mt-2">Customer rating</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border border-green-200">
            <div className="text-sm text-green-700 font-semibold uppercase tracking-wide mb-2">Money Saved</div>
            <div className="text-3xl font-bold text-green-600">₹{stats.moneyLeftUnspent.toLocaleString()}</div>
            <p className="text-xs text-green-700 mt-2">vs original quotes</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Repair Trends</h3>
            
            <div className="space-y-6">
              {/* Repairs Chart */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Number of Repairs</h4>
                <div className="space-y-2">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-semibold text-slate-600">{data.month}</div>
                      <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all"
                          style={{ width: `${(data.repairs / maxRepairs) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-12 text-right text-sm font-semibold text-slate-900">{data.repairs}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Chart */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Monthly Spending</h4>
                <div className="space-y-2">
                  {monthlyData.map((data) => (
                    <div key={`cost-${data.month}`} className="flex items-center gap-4">
                      <div className="w-16 text-sm font-semibold text-slate-600">{data.month}</div>
                      <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg transition-all"
                          style={{ width: `${(data.cost / maxCost) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-20 text-right text-sm font-semibold text-slate-900">₹{data.cost.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Most Common Services</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Screen Replacement', count: 4, percentage: 33 },
                { name: 'Battery Replacement', count: 3, percentage: 25 },
                { name: 'Keyboard Repair', count: 2, percentage: 17 },
                { name: 'Port Repair', count: 2, percentage: 17 },
                { name: 'Other', count: 1, percentage: 8 },
              ].map((service, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{service.name}</span>
                    <span className="text-sm font-semibold text-slate-600">{service.count}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        idx === 0 ? 'bg-blue-500' :
                        idx === 1 ? 'bg-purple-500' :
                        idx === 2 ? 'bg-pink-500' :
                        idx === 3 ? 'bg-indigo-500' :
                        'bg-slate-400'
                      }`}
                      style={{ width: `${service.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repair History */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Recent Repairs</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-8 py-4 font-semibold text-slate-700">Date</th>
                  <th className="text-left px-8 py-4 font-semibold text-slate-700">Service</th>
                  <th className="text-left px-8 py-4 font-semibold text-slate-700">Device</th>
                  <th className="text-left px-8 py-4 font-semibold text-slate-700">Cost</th>
                  <th className="text-left px-8 py-4 font-semibold text-slate-700">Duration</th>
                  <th className="text-left px-8 py-4 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair, idx) => (
                  <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition">
                    <td className="px-8 py-4 text-slate-900">{repair.date}</td>
                    <td className="px-8 py-4 text-slate-900">{repair.service}</td>
                    <td className="px-8 py-4 text-slate-600">{repair.device}</td>
                    <td className="px-8 py-4 font-semibold text-slate-900">₹{repair.cost.toLocaleString()}</td>
                    <td className="px-8 py-4 text-slate-600">{repair.time} mins</td>
                    <td className="px-8 py-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        {repair.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-600" />
              Cost Breakdown
            </h3>

            <div className="space-y-4">
              {[
                { category: 'Service Charges', amount: 6500, percentage: 35 },
                { category: 'Parts & Components', amount: 9500, percentage: 51 },
                { category: 'Visit Charges', amount: 2500, percentage: 14 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">{item.category}</span>
                    <span className="text-sm font-bold text-slate-900">₹{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        idx === 0 ? 'bg-blue-500' :
                        idx === 1 ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Smart Insights
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-900">Most Used Service</p>
                  <p className="text-sm text-slate-700">Screen replacement accounts for 33% of your repairs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-900">Average Repair Cost</p>
                  <p className="text-sm text-slate-700">Your average repair costs ₹1,541, which is 12% below city average</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-slate-900">Warranty Coverage</p>
                  <p className="text-sm text-slate-700">All your repairs have 6-month warranties. No active claims.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
