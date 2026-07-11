// Payment Gateway Service - Stripe, Razorpay, PayPal Integration

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'wallet' | 'netbanking' | 'paypal';
  provider: 'stripe' | 'razorpay' | 'paypal';
  icon: string;
  supported: boolean;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  timestamp: number;
  receipt?: string;
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  transactionId?: string;
  message: string;
  redirectUrl?: string;
}

class PaymentGateway {
  private payments: Payment[] = [];
  private stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_KEY || 'pk_test_demo';
  private razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_demo';
  private paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'demo';

  constructor() {
    this.loadPayments();
  }

  private loadPayments() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('payments');
      this.payments = stored ? JSON.parse(stored) : [];
    }
  }

  private savePayments() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('payments', JSON.stringify(this.payments));
    }
  }

  // Get available payment methods
  getPaymentMethods(): PaymentMethod[] {
    return [
      {
        id: 'stripe-card',
        name: 'Credit/Debit Card',
        type: 'card',
        provider: 'stripe',
        icon: '💳',
        supported: true,
      },
      {
        id: 'razorpay-upi',
        name: 'UPI',
        type: 'upi',
        provider: 'razorpay',
        icon: '📱',
        supported: true,
      },
      {
        id: 'razorpay-wallet',
        name: 'Digital Wallets',
        type: 'wallet',
        provider: 'razorpay',
        icon: '💰',
        supported: true,
      },
      {
        id: 'razorpay-netbanking',
        name: 'Net Banking',
        type: 'netbanking',
        provider: 'razorpay',
        icon: '🏦',
        supported: true,
      },
      {
        id: 'paypal',
        name: 'PayPal',
        type: 'paypal',
        provider: 'paypal',
        icon: '🅿️',
        supported: true,
      },
    ];
  }

  // Process Stripe payment
  async processStripePayment(
    amount: number,
    bookingId: string,
    token: string
  ): Promise<PaymentResponse> {
    try {
      // Simulate Stripe payment processing
      const paymentId = `stripe_${Date.now()}`;
      const transactionId = `txn_${Math.random().toString(36).substr(2, 9)}`;

      const payment: Payment = {
        id: paymentId,
        bookingId,
        amount,
        currency: 'INR',
        method: this.getPaymentMethods()[0],
        status: 'completed',
        transactionId,
        timestamp: Date.now(),
        receipt: `Receipt-${paymentId}`,
      };

      this.payments.push(payment);
      this.savePayments();

      return {
        success: true,
        paymentId,
        transactionId,
        message: 'Payment successful via Stripe',
      };
    } catch (error) {
      return {
        success: false,
        paymentId: '',
        message: 'Stripe payment failed',
      };
    }
  }

  // Process Razorpay payment
  async processRazorpayPayment(
    amount: number,
    bookingId: string,
    paymentMethodType: string
  ): Promise<PaymentResponse> {
    try {
      // Simulate Razorpay payment processing
      const paymentId = `razorpay_${Date.now()}`;
      const transactionId = `rpay_${Math.random().toString(36).substr(2, 9)}`;

      const payment: Payment = {
        id: paymentId,
        bookingId,
        amount,
        currency: 'INR',
        method: this.getPaymentMethods().find((m) => m.provider === 'razorpay') || this.getPaymentMethods()[1],
        status: 'completed',
        transactionId,
        timestamp: Date.now(),
        receipt: `Receipt-${paymentId}`,
      };

      this.payments.push(payment);
      this.savePayments();

      return {
        success: true,
        paymentId,
        transactionId,
        message: `Payment successful via Razorpay (${paymentMethodType})`,
      };
    } catch (error) {
      return {
        success: false,
        paymentId: '',
        message: 'Razorpay payment failed',
      };
    }
  }

  // Process PayPal payment
  async processPayPalPayment(
    amount: number,
    bookingId: string
  ): Promise<PaymentResponse> {
    try {
      // Simulate PayPal payment processing
      const paymentId = `paypal_${Date.now()}`;
      const transactionId = `pp_${Math.random().toString(36).substr(2, 9)}`;

      const payment: Payment = {
        id: paymentId,
        bookingId,
        amount,
        currency: 'INR',
        method: this.getPaymentMethods()[4],
        status: 'completed',
        transactionId,
        timestamp: Date.now(),
        receipt: `Receipt-${paymentId}`,
      };

      this.payments.push(payment);
      this.savePayments();

      return {
        success: true,
        paymentId,
        transactionId,
        message: 'Payment successful via PayPal',
      };
    } catch (error) {
      return {
        success: false,
        paymentId: '',
        message: 'PayPal payment failed',
      };
    }
  }

  // Get payment by ID
  getPayment(paymentId: string): Payment | undefined {
    return this.payments.find((p) => p.id === paymentId);
  }

  // Get payments by booking ID
  getPaymentsByBookingId(bookingId: string): Payment[] {
    return this.payments.filter((p) => p.bookingId === bookingId);
  }

  // Get all payments
  getAllPayments(): Payment[] {
    return this.payments;
  }

  // Process refund
  async processRefund(paymentId: string): Promise<PaymentResponse> {
    const payment = this.getPayment(paymentId);
    if (!payment) {
      return {
        success: false,
        paymentId,
        message: 'Payment not found',
      };
    }

    payment.status = 'refunded';
    this.savePayments();

    return {
      success: true,
      paymentId,
      message: 'Refund processed successfully',
    };
  }

  // Get payment statistics
  getPaymentStats() {
    const stats = {
      totalPayments: this.payments.length,
      totalAmount: this.payments.reduce((sum, p) => sum + p.amount, 0),
      completedPayments: this.payments.filter((p) => p.status === 'completed').length,
      failedPayments: this.payments.filter((p) => p.status === 'failed').length,
      refundedAmount: this.payments
        .filter((p) => p.status === 'refunded')
        .reduce((sum, p) => sum + p.amount, 0),
    };
    return stats;
  }
}

export const paymentGateway = new PaymentGateway();
