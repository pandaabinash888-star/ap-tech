export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'mobile' | 'laptop' | 'desktop' | 'accessory';
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  timeSlot: string;
  address: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: Date;
  technicianId?: string;
  technicianName?: string;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  bookingId: string;
  totalAmount: number;
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  rating: number;
  reviews: number;
  skills: string[];
  available: boolean;
}
