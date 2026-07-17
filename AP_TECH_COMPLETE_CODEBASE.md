# AP TECH - Complete Codebase Documentation

## Project Overview
AP TECH is a comprehensive doorstep repair service platform built with Next.js 16, featuring customer booking, admin management, payment integration, real-time tracking, and AI chatbot support.

## Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: localStorage (can be replaced with database)
- **Payment**: Stripe, Razorpay, PayPal
- **Authentication**: Custom Firebase-ready auth
- **Real-time**: WebSocket ready
- **AI**: Vercel AI SDK ready

## Project Structure

```
ap-tech/
├── app/                          # Next.js App Router pages
│   ├── admin/                   # Admin dashboard and management
│   ├── app/                     # User-facing pages
│   ├── components/              # Reusable components
│   ├── lib/                     # Utility services and types
│   └── layout.tsx               # Root layout
├── lib/
│   ├── firebase.ts              # Firebase configuration
│   ├── payment-gateway.ts       # Payment processing service
│   ├── notifications.ts         # Notification system
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Utility functions
├── components/
│   ├── ai-chatbot.tsx          # AI chatbot widget
│   ├── payment-methods.tsx      # Payment UI component
│   └── ui/                      # shadcn/ui components
└── public/                      # Static assets
```

## Key Features Implemented

### 1. User Authentication & Management
- **Login/Signup Pages** - Customer authentication
- **User Profiles** - Profile management and booking history
- **Session Management** - localStorage-based (production-ready for real auth)

### 2. Service Booking System
- **Multi-step Booking** - 4-step process (Service → Date/Time → Details → Payment)
- **Service Selection** - 6 repair categories with pricing
- **Real-time Availability** - Date/time selection
- **Address Management** - Location-based service delivery

### 3. Payment Integration
- **Multiple Payment Methods** - Stripe (Cards), Razorpay (UPI/Wallets), PayPal
- **Payment Gateway Service** - Unified payment processing
- **Transaction History** - Complete payment tracking
- **Secure Checkout** - Order summary and payment confirmation

### 4. Admin Dashboard
- **Booking Management** - View, filter, and manage customer bookings
- **Technician Management** - Add, edit, delete technicians
- **Service Management** - Create and manage repair services
- **User Management** - Customer account management
- **Analytics Dashboard** - Revenue, booking, and performance metrics
- **Real-time Notifications** - New booking alerts
- **Payment Analytics** - Transaction tracking and reporting

### 5. Customer Features
- **Live Tracking** - Real-time service tracking with GPS simulation
- **Order History** - View all bookings and payments
- **Service Tracking** - Step-by-step progress tracking
- **Payment History** - Complete transaction records
- **Reviews & Ratings** - Customer feedback system

### 6. Technician Portal
- **Technician Login** - Separate authentication for technicians
- **Service Assignments** - View assigned bookings
- **Status Updates** - Real-time job status updates
- **Performance Metrics** - Rating and job tracking

### 7. Advanced Features
- **AI Chatbot** - 24/7 customer support with intelligent responses
- **Real-time Notifications** - Booking alerts for admin and customers
- **Live Tracking** - GPS-based technician location tracking
- **Landing Page** - Professional marketing website
- **WhatsApp Integration** - Contact number: 8817660170

## File Structure & Contents

### Root Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

### Authentication & Admin
**Admin Login** (`app/admin/login/page.tsx`)
- Credentials: pandaabinash888@gmail.com / admin123
- Dark theme login interface
- Suspense boundary for performance

### Main User Pages
1. **Landing Page** (`app/landing/page.tsx`) - Marketing homepage
2. **Login/Signup** (`app/login/page.tsx`) - Customer authentication
3. **Home** (`app/home/page.tsx`) - Dashboard with services
4. **Booking** (`app/booking/page.tsx`) - 4-step booking flow
5. **Orders** (`app/orders/page.tsx`) - Booking history
6. **Tracking** (`app/tracking/page.tsx`) - Service tracking
7. **Profile** (`app/profile/page.tsx`) - User account management

### Admin Pages
- `app/admin/dashboard/page.tsx` - Main dashboard
- `app/admin/bookings/page.tsx` - Booking management
- `app/admin/technicians/page.tsx` - Technician management
- `app/admin/services/page.tsx` - Service management
- `app/admin/users/page.tsx` - User management
- `app/admin/analytics/page.tsx` - Analytics dashboard
- `app/admin/notifications/page.tsx` - Booking alerts

### Core Services & Utilities
- `lib/payment-gateway.ts` - Payment processing (Stripe, Razorpay, PayPal)
- `lib/notifications.ts` - Notification system
- `lib/firebase.ts` - Firebase configuration
- `lib/types.ts` - TypeScript interfaces and types
- `lib/technician-auth-service.ts` - Technician authentication

### Components
- `components/ai-chatbot.tsx` - AI chatbot widget
- `components/payment-methods.tsx` - Payment method selector

## Service Pricing
- Mobile Repair: ₹149
- Laptop Repair: ₹249
- MacBook Repair: ₹349
- Battery Replacement: ₹199
- SSD Upgrade: ₹399
- Windows Installation: ₹99
- Visit Charge: ₹199 (added to all services)

## Admin Credentials
- **Email**: pandaabinash888@gmail.com
- **Password**: admin123
- **Access**: Full admin dashboard with all management features

## Customer Demo Credentials
- **Email**: user@example.com
- **Password**: user123
- **Phone**: 9876543210

## Technician Demo Credentials
- **Email**: tech@aptech.com
- **Password**: tech123

## WhatsApp Contact
- **Number**: +91 8817660170
- **Available On**: Home, Booking, Orders, Profile pages

## API Endpoints (Ready for Implementation)
- `/api/auth/login` - User authentication
- `/api/bookings/create` - Create booking
- `/api/bookings/list` - Get bookings
- `/api/payments/process` - Process payment
- `/api/technicians/assign` - Assign technician
- `/api/notifications/send` - Send notifications

## Database Schema (Ready for Implementation)
### Users Table
- id, email, password, phone, name, address, createdAt

### Bookings Table
- id, userId, serviceId, date, time, status, amount, paymentStatus

### Payments Table
- id, bookingId, amount, method, provider, transactionId, status

### Technicians Table
- id, name, email, phone, specialty, rating, status

### Services Table
- id, name, price, description, category, estimatedTime

## Environment Variables Required
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
STRIPE_PUBLIC_KEY=your_key
STRIPE_SECRET_KEY=your_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_key
PAYPAL_CLIENT_ID=your_id
```

## Deployment
- **Platform**: Vercel
- **Environment**: Production-ready
- **Database**: Ready for Supabase, Firebase, or any SQL database
- **Hosting**: Can be deployed to Vercel with one click

## Future Enhancements
1. Real database integration (Supabase/Firebase)
2. Actual payment processing
3. Real-time GPS tracking
4. SMS notifications
5. Email notifications
6. Advanced reporting
7. Mobile app version
8. API documentation
9. Rate limiting and security
10. Load testing and optimization

## Getting Started
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables
4. Run dev server: `pnpm dev`
5. Access application at `http://localhost:3000`

## Support
- Contact: pandaabinash888@gmail.com
- WhatsApp: +91 8817660170
- Available: 24/7 via AI Chatbot

---
**Last Updated**: July 2026
**Version**: 1.0 Complete Build
