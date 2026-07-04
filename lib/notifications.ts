// Notification Service for handling all booking notifications
// Supports: In-app notifications, Email, WhatsApp

export interface Notification {
  id: string;
  type: 'booking_created' | 'booking_confirmed' | 'booking_in_progress' | 'booking_completed' | 'booking_cancelled';
  title: string;
  message: string;
  bookingId: string;
  customerId: string;
  adminRead: boolean;
  timestamp: Date;
  data?: any;
}

const WHATSAPP_NUMBER = '8817660170';
const ADMIN_EMAIL = 'admin@aptech.com';

export class NotificationService {
  // Store notifications in localStorage
  static addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'adminRead'>) {
    const notifications = this.getAllNotifications();
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      adminRead: false,
    };
    
    notifications.push(newNotification);
    localStorage.setItem('app_notifications', JSON.stringify(notifications));
    
    // Trigger browser notification if permitted
    this.sendBrowserNotification(newNotification);
    
    return newNotification;
  }

  static getAllNotifications(): Notification[] {
    if (typeof window === 'undefined') return [];
    const notifications = localStorage.getItem('app_notifications');
    return notifications ? JSON.parse(notifications) : [];
  }

  static getAdminNotifications(): Notification[] {
    return this.getAllNotifications().filter(n => !n.adminRead);
  }

  static markAsRead(notificationId: string) {
    const notifications = this.getAllNotifications();
    const updated = notifications.map(n =>
      n.id === notificationId ? { ...n, adminRead: true } : n
    );
    localStorage.setItem('app_notifications', JSON.stringify(updated));
  }

  static clearNotifications() {
    localStorage.setItem('app_notifications', JSON.stringify([]));
  }

  // Send browser notification
  static sendBrowserNotification(notification: Notification) {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/icon.svg',
      });
    }
  }

  // Generate WhatsApp message
  static generateWhatsAppMessage(booking: any): string {
    return `New Booking Alert! 
Customer: ${booking.customerName}
Service: ${booking.serviceName}
Date: ${booking.date}
Time: ${booking.time}
Amount: ₹${booking.totalAmount}
Contact: ${booking.phone}

Status: ${booking.status}`;
  }

  // Generate email content
  static generateEmailContent(booking: any): { subject: string; body: string } {
    return {
      subject: `New Service Booking - AP TECH [ID: ${booking.id}]`,
      body: `
        <h2>New Booking Received</h2>
        <p><strong>Customer Details:</strong></p>
        <ul>
          <li>Name: ${booking.customerName}</li>
          <li>Phone: ${booking.phone}</li>
          <li>Address: ${booking.address}</li>
        </ul>
        
        <p><strong>Service Details:</strong></p>
        <ul>
          <li>Service: ${booking.serviceName}</li>
          <li>Date: ${booking.date}</li>
          <li>Time: ${booking.time}</li>
          <li>Description: ${booking.description || 'N/A'}</li>
        </ul>
        
        <p><strong>Pricing:</strong></p>
        <ul>
          <li>Service Charge: ₹${booking.servicePrice}</li>
          <li>Visit Charge: ₹199</li>
          <li>Total Amount: ₹${booking.totalAmount}</li>
        </ul>
        
        <p><strong>Booking Status:</strong> ${booking.status}</p>
        <p>Log in to admin panel to manage this booking.</p>
      `,
    };
  }

  // Send notification to WhatsApp (mock - requires API integration)
  static async sendWhatsAppNotification(booking: any) {
    const message = this.generateWhatsAppMessage(booking);
    
    // In production, integrate with WhatsApp API (Twilio, WhatsApp Business API, etc.)
    console.log('[Notification] WhatsApp message to admin:', message);
    
    // Mock implementation - store in localStorage
    const notifications = localStorage.getItem('whatsapp_queue') || '[]';
    const queue = JSON.parse(notifications);
    queue.push({
      to: WHATSAPP_NUMBER,
      message,
      timestamp: new Date(),
      status: 'pending',
    });
    localStorage.setItem('whatsapp_queue', JSON.stringify(queue));
  }

  // Send notification to Email (mock - requires API integration)
  static async sendEmailNotification(booking: any) {
    const { subject, body } = this.generateEmailContent(booking);
    
    // In production, use SendGrid, Nodemailer, AWS SES, or similar
    console.log('[Notification] Email to admin:', { subject, to: ADMIN_EMAIL });
    
    // Mock implementation - store in localStorage
    const notifications = localStorage.getItem('email_queue') || '[]';
    const queue = JSON.parse(notifications);
    queue.push({
      to: ADMIN_EMAIL,
      subject,
      body,
      timestamp: new Date(),
      status: 'pending',
    });
    localStorage.setItem('email_queue', JSON.stringify(queue));
  }

  // Send booking notification to customer via email
  static async sendCustomerEmailNotification(customer: any, booking: any) {
    const emailContent = {
      subject: `Your AP TECH Booking Confirmation - Order #${booking.id}`,
      body: `
        <h2>Booking Confirmed!</h2>
        <p>Hi ${customer.name},</p>
        
        <p>Thank you for booking with AP TECH. Here are your booking details:</p>
        
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><strong>Service:</strong> ${booking.serviceName}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Total Amount:</strong> ₹${booking.totalAmount}</p>
        
        <p>A technician will visit you at the scheduled time. If you need to reschedule or cancel, please contact us via WhatsApp: +91 ${WHATSAPP_NUMBER}</p>
        
        <p>Thank you!</p>
        <p>AP TECH Team</p>
      `,
    };
    
    console.log('[Notification] Customer email:', { to: customer.email, ...emailContent });
  }

  // Create notification for new booking
  static notifyNewBooking(booking: any) {
    // Add in-app notification
    this.addNotification({
      type: 'booking_created',
      title: 'New Booking',
      message: `${booking.customerName} booked ${booking.serviceName} for ${booking.date}`,
      bookingId: booking.id,
      customerId: booking.customerId,
      data: booking,
    });

    // Send WhatsApp and Email to admin
    this.sendWhatsAppNotification(booking);
    this.sendEmailNotification(booking);
  }

  // Create notification for booking status update
  static notifyBookingStatusChange(booking: any, oldStatus: string, newStatus: string) {
    this.addNotification({
      type: 'booking_confirmed' as any,
      title: `Booking ${newStatus}`,
      message: `Booking #${booking.id} status updated to ${newStatus}`,
      bookingId: booking.id,
      customerId: booking.customerId,
      data: booking,
    });
  }
}
