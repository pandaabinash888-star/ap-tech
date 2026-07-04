'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, MapPin, CreditCard, BarChart3, Star, Users } from 'lucide-react';
import { AIChatbot } from '@/components/ai-chatbot';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <AIChatbot />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AT</span>
              </div>
              <span className="font-bold text-xl text-slate-900">AP TECH</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition">Services</a>
              <a href="#technology" className="text-slate-600 hover:text-slate-900 transition">Technology</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition">Pricing</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 transition">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-slate-600 hover:text-slate-900 transition">
                Sign In
              </Link>
              <Link href="/booking" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              Trusted by 50,000+ customers across India
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Professional Device Repair <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">at Your Doorstep</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Same-day doorstep repair for mobile phones, laptops, and desktops. Transparent pricing, certified technicians, and real-time tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/booking" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-xl transition flex items-center gap-2">
              Book a Service <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-slate-200 text-slate-900 rounded-lg font-semibold hover:border-slate-300 transition">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">₹199</div>
              <p className="text-sm text-slate-600">Fixed Visit Charge</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">2-4 hrs</div>
              <p className="text-sm text-slate-600">Average Repair Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">4.9/5</div>
              <p className="text-sm text-slate-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Advanced Technology Features</h2>
            <p className="text-xl text-slate-600">Experience the future of device repair</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Real-time Tracking */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-time GPS Tracking</h3>
              <p className="text-slate-600 mb-4">Track your technician&apos;s exact location and receive live updates on estimated arrival time</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Live location updates
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ETA notifications
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Service status updates
                </li>
              </ul>
            </div>

            {/* AI Chatbot */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">AI Assistant Support</h3>
              <p className="text-slate-600 mb-4">Get instant answers to your questions with our intelligent chatbot available 24/7</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  24/7 instant responses
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Diagnosis assistance
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Troubleshooting guides
                </li>
              </ul>
            </div>

            {/* Payment Integration */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure Online Payments</h3>
              <p className="text-slate-600 mb-4">Pay safely with multiple payment options including credit cards, UPI, and digital wallets</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Multiple payment methods
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Bank-level encryption
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  EMI options available
                </li>
              </ul>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Service Analytics</h3>
              <p className="text-slate-600 mb-4">Get detailed insights about your repair history, costs saved, and service patterns</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Repair history reports
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Cost savings tracking
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  Warranty management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-xl text-slate-600">Professional repair for all your devices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📱', title: 'Mobile Phone Repair', desc: 'Screen replacement, battery, camera, charging port' },
              { icon: '💻', title: 'Laptop Repair', desc: 'Hard drive, RAM, motherboard, keyboard replacement' },
              { icon: '🖥', title: 'Desktop Repair', desc: 'Component replacement, software issues, upgrades' },
              { icon: '🔋', title: 'Battery Replacement', desc: 'All phone and laptop battery types' },
              { icon: '💾', title: 'Data Recovery', desc: 'Safe data retrieval from damaged devices' },
              { icon: '🛠', title: 'Custom Upgrades', desc: 'RAM, SSD, and performance upgrades' },
            ].map((service, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-slate-600">Join thousands of satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Raj Kumar', role: 'Delhi', rating: 5, text: 'Amazing service! Technician came on time and fixed my phone in 30 minutes. Highly recommended!' },
              { name: 'Priya Singh', role: 'Mumbai', rating: 5, text: 'Best laptop repair service I&apos;ve used. Transparent pricing and professional work. Will use again!' },
              { name: 'Amit Patel', role: 'Bangalore', rating: 5, text: 'Real-time tracking is so convenient. I could see exactly when the technician would arrive.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 border border-slate-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600">No hidden charges, what you see is what you pay</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-slate-900">₹199</span>
                  <span className="text-slate-600">Fixed Visit Charge</span>
                </div>
                <p className="text-slate-600">Covers technician visit and diagnosis. Repair charges depend on the service.</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">No booking charges</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Service charges vary (₹149-₹499)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Parts are charged separately</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">6-month warranty on repairs</span>
                </div>
              </div>

              <Link href="/booking" className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-xl transition flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-8">Subscribe to get special offers and service updates</p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>

          {submitted && (
            <p className="text-green-400 mt-4">Thank you for subscribing!</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AT</span>
                </div>
                <span className="font-bold text-white">AP TECH</span>
              </div>
              <p className="text-sm">Professional device repair at your doorstep</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Mobile Repair</a></li>
                <li><a href="#" className="hover:text-white transition">Laptop Repair</a></li>
                <li><a href="#" className="hover:text-white transition">Desktop Repair</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm">WhatsApp: +91 8817660170</p>
              <p className="text-sm">Email: pandaabinash888@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; 2024 AP TECH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
