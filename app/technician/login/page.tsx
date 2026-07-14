'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TechnicianLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    // Demo technician credentials
    const technicianEmails = ['john.tech@gmail.com', 'sarah.repair@gmail.com', 'mike.service@gmail.com'];
    const technicianPassword = 'tech123';

    if (technicianEmails.includes(email) && password === technicianPassword) {
      const technicianData = {
        id: `tech_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: email,
        role: 'technician',
        phone: '+91-98765-43210',
        specializations: ['AC Repair', 'Refrigerator Service', 'Washing Machine Repair'],
        rating: 4.8,
        completedJobs: 127,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem('technicianUser', JSON.stringify(technicianData));
      if (rememberMe) {
        localStorage.setItem('rememberTechEmail', email);
      }
      router.push('/technician/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-slate-900 to-orange-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          {/* Header with gradient accent */}
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-10">
            <div className="text-center">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-4 border border-white/20">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">AP TECH</h1>
              <p className="text-orange-200 text-xs tracking-widest uppercase font-medium">Technician Portal</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-950 border border-red-800 rounded-lg p-4 flex items-start gap-3 animate-in">
                <svg
                  className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-200 text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-slate-500 transition"
                  placeholder="john.tech@gmail.com"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-orange-400 hover:text-orange-300 text-xs font-medium transition"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-slate-500 transition"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 bg-slate-800 border border-slate-700 rounded focus:ring-2 focus:ring-orange-500 text-orange-600 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition">
                  Remember this email
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-7"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                📋 Demo Credentials
              </p>
              <div className="space-y-3 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div>
                  <p className="text-slate-500 text-xs mb-1">Email Options</p>
                  <code className="text-orange-400 text-xs font-mono block">john.tech@gmail.com</code>
                  <code className="text-orange-400 text-xs font-mono block">sarah.repair@gmail.com</code>
                  <code className="text-orange-400 text-xs font-mono block">mike.service@gmail.com</code>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-1">Password</p>
                  <code className="text-orange-400 text-xs font-mono">
                    tech123
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            AP TECH Technician System
          </p>
          <div className="flex gap-4 justify-center mt-3">
            <Link href="/" className="text-orange-400 hover:text-orange-300 text-xs font-medium transition">
              Back to Home
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/admin/login" className="text-orange-400 hover:text-orange-300 text-xs font-medium transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
