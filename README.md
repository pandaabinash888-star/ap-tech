# AP TECH - Doorstep Mobile & Laptop Repair Service

A modern web application for booking professional doorstep repair services for mobile phones, laptops, and other devices.

## Features

- **User Authentication**: Sign up and login system with profile management
- **Service Browsing**: Explore various repair services with descriptions and pricing
- **Booking System**: Multi-step booking flow with date/time selection
- **Order Management**: View all bookings with filtering by status
- **Real-time Tracking**: Track your service technician and order status
- **User Profile**: Manage personal information and view booking history
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

## Screens & Routes

### Public Screens
- `/splash` - Splash/Welcome screen (3 second redirect)
- `/login` - Login and Sign Up page

### Protected Screens (Require Authentication)
- `/home` - Home screen with featured offer and services grid
- `/booking` - Multi-step service booking flow
- `/booking-confirmation` - Booking confirmation and details
- `/orders` - List of all bookings with filtering options
- `/tracking` - Real-time service tracking and technician information
- `/profile` - User profile management and settings

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: localStorage (for demo purposes)
- **Authentication**: Simple localStorage-based auth (ready for Firebase integration)
- **Database Ready**: Firebase configuration files included

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables (create `.env.local`):
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── page.tsx                    # Root redirects to /splash
├── layout.tsx                  # Root layout
├── splash/
│   └── page.tsx               # Splash screen
├── login/
│   └── page.tsx               # Login and signup
├── home/
│   └── page.tsx               # Home screen with services
├── booking/
│   └── page.tsx               # Booking form (multi-step)
├── booking-confirmation/
│   └── page.tsx               # Confirmation page
├── orders/
│   └── page.tsx               # Orders list
├── tracking/
│   └── page.tsx               # Order tracking
└── profile/
    └── page.tsx               # User profile

lib/
├── firebase.ts                # Firebase configuration
├── types.ts                   # TypeScript interfaces
└── utils.ts                   # Utility functions
```

## Features Breakdown

### Authentication
- Login/Sign Up form with validation
- localStorage-based session (production should use Firebase/NextAuth)
- Profile management with editable user information

### Booking Flow
1. **Service Selection** - Browse and select from 6 service categories
2. **Schedule** - Choose preferred date and time slot
3. **Confirmation** - Review booking details and enter address
4. **Order Summary** - View booking confirmation with cost breakdown

### Order Management
- Filter orders by status: All, Pending, Confirmed, In Progress, Completed
- Cancel pending bookings
- Quick access to tracking from orders list

### Tracking
- Multi-step progress indicator
- Service details and timeline
- Assigned technician information (mock data)
- Location tracking UI (simulated)
- Activity timeline

### User Profile
- View and edit personal information
- Booking statistics (total, completed, amount spent)
- Recent booking history
- Account settings
- Logout functionality

## Services Available

1. **Mobile Repair** (₹299 + ₹199 visit charge)
   - Screen, battery, speaker repair

2. **Laptop Repair** (₹499 + ₹199 visit charge)
   - Motherboard, HDD, RAM issues

3. **Battery Replacement** (₹199 + ₹199 visit charge)
   - Quick battery swap

4. **Screen Replacement** (₹349 + ₹199 visit charge)
   - Display fixing & replacement

5. **SSD Upgrade** (₹399 + ₹199 visit charge)
   - Storage upgrade service

6. **Software Installation** (₹149 + ₹199 visit charge)
   - Windows, antivirus, drivers installation

## Future Enhancements

- Firebase authentication integration
- Real database with Firestore
- Payment integration (Stripe/Razorpay)
- Email/SMS notifications
- Real technician assignment system
- Actual GPS tracking
- Reviews and ratings system
- Chat support with technicians
- Push notifications

## Mock Data

The application uses localStorage to store:
- User information
- Bookings/Orders
- Status tracking

To reset data: Clear browser localStorage for the domain

## Development Notes

- **Authentication**: Currently uses localStorage for demo. Replace with Firebase auth in `lib/firebase.ts`
- **Database**: Ready for Firebase Firestore integration
- **Storage**: Firebase Storage configured for technician images and service photos
- **Responsive**: Mobile-first design with Tailwind CSS
- **Navigation**: Bottom tab navigation on mobile, consistent across all screens

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

## Support

For support, call: +91 9999999999

---

Built with ❤️ for professional doorstep repair services
