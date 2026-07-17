export class ExportService {
  static exportBookingsToCSV() {
    const bookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
    
    const headers = ['ID', 'Customer', 'Email', 'Service', 'Date', 'Status', 'Amount'];
    const rows = bookings.map((b: any) => [
      b.id,
      b.customerName,
      b.customerEmail,
      b.serviceName,
      b.date,
      b.status,
      b.amount || 'Pending',
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map((cell: any) => `"${cell}"`).join(',')),
    ].join('\n');

    this.downloadFile(csv, 'bookings.csv', 'text/csv');
  }

  static exportReportToPDF() {
    const bookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
    const metrics = this.getMetrics(bookings);

    const report = `
AP TECH - SERVICE REPORT
Generated: ${new Date().toLocaleString()}

SUMMARY METRICS
Total Bookings: ${metrics.total}
Completed: ${metrics.completed}
In Progress: ${metrics.inProgress}
Pending: ${metrics.pending}
Total Revenue: ₹${metrics.revenue}

BOOKING DETAILS
${bookings.map((b: any) => `
Booking ID: ${b.id}
Customer: ${b.customerName}
Service: ${b.serviceName}
Date: ${b.date}
Status: ${b.status}
Amount: ₹${b.amount || 'Pending'}
---`).join('\n')}
    `;

    this.downloadFile(report, 'report.txt', 'text/plain');
  }

  static exportAnalyticsToJSON() {
    const bookings = JSON.parse(localStorage.getItem('adminBookings') || '[]');
    const analytics = {
      generatedAt: new Date().toISOString(),
      metrics: this.getMetrics(bookings),
      bookingsByStatus: this.groupByStatus(bookings),
      bookingsByService: this.groupByService(bookings),
      monthlyTrend: this.getMonthlyTrend(bookings),
    };

    this.downloadFile(JSON.stringify(analytics, null, 2), 'analytics.json', 'application/json');
  }

  private static getMetrics(bookings: any[]) {
    return {
      total: bookings.length,
      completed: bookings.filter((b: any) => b.status === 'completed').length,
      inProgress: bookings.filter((b: any) => b.status === 'in-progress').length,
      pending: bookings.filter((b: any) => b.status === 'pending').length,
      revenue: bookings.reduce((sum: number, b: any) => sum + (b.amount || 0), 0),
      avgValue: bookings.length > 0 ? bookings.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) / bookings.length : 0,
    };
  }

  private static groupByStatus(bookings: any[]) {
    return bookings.reduce((acc: any, b: any) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {});
  }

  private static groupByService(bookings: any[]) {
    return bookings.reduce((acc: any, b: any) => {
      acc[b.serviceName] = (acc[b.serviceName] || 0) + 1;
      return acc;
    }, {});
  }

  private static getMonthlyTrend(bookings: any[]) {
    const trend: any = {};
    bookings.forEach((b: any) => {
      const month = new Date(b.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      trend[month] = (trend[month] || 0) + 1;
    });
    return trend;
  }

  private static downloadFile(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
