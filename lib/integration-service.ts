export class IntegrationService {
  static syncBookingToAdmin(booking: any) {
    const adminBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
    const newBooking = {
      ...booking,
      customerName: booking.customerName || 'User',
      customerEmail: booking.email,
      customerPhone: booking.phone,
      status: booking.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    adminBookings.push(newBooking);
    localStorage.setItem('adminBookings', JSON.stringify(adminBookings));
    
    this.logActivity({
      action: 'Booking Created',
      details: `New booking ${booking.id} for ${booking.service}`,
      category: 'booking',
    });
  }

  static logActivity(activity: any) {
    const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
    activityLog.push({
      ...activity,
      timestamp: new Date().toISOString(),
      admin: 'system',
    });
    localStorage.setItem('activityLog', JSON.stringify(activityLog));
  }

  static updateBookingStatus(bookingId: string, status: string) {
    const adminBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
    const booking = adminBookings.find((b: any) => b.id === bookingId);
    if (booking) {
      booking.status = status;
      localStorage.setItem('adminBookings', JSON.stringify(adminBookings));
      
      this.logActivity({
        action: 'Booking Status Updated',
        details: `Booking ${bookingId} status changed to ${status}`,
        category: 'booking',
      });
    }
  }

  static getAdminBookingMetrics() {
    const adminBookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
    return {
      total: adminBookings.length,
      pending: adminBookings.filter((b: any) => b.status === 'pending').length,
      completed: adminBookings.filter((b: any) => b.status === 'completed').length,
      inProgress: adminBookings.filter((b: any) => b.status === 'in-progress').length,
      revenue: adminBookings.reduce((sum: number, b: any) => sum + (b.amount || 0), 0),
    };
  }

  static createAdminActivity(action: string, details: string, category: string = 'admin') {
    this.logActivity({ action, details, category });
  }
}
