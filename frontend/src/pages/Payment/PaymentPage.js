import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Divider,
  Chip
} from '@nextui-org/react';
import { CreditCardIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment processed successfully!');
    }, 3000);
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCardIcon className="w-5 h-5" />,
      description: 'Pay with Visa, Mastercard, or American Express'
    }
  ];

  const recentPayments = [
    {
      id: 1,
      amount: '$150.00',
      service: 'Consultation',
      date: '2024-01-15',
      status: 'completed',
      method: 'Visa **** 4242'
    },
    {
      id: 2,
      amount: '$75.00',
      service: 'Follow-up',
      date: '2024-01-10',
      status: 'completed',
      method: 'Mastercard **** 5555'
    },
    {
      id: 3,
      amount: '$200.00',
      service: 'Training Session',
      date: '2024-01-08',
      status: 'pending',
      method: 'Visa **** 4242'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Payment</h1>
        <p className="text-foreground-600">Manage your payments and billing information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground">Make Payment</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {/* Service Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Service
                </label>
                <Input
                  value="Consultation Session"
                  variant="bordered"
                  isDisabled
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Amount
                </label>
                <Input
                  value="$150.00"
                  variant="bordered"
                  isDisabled
                />
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Payment Method
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary-50'
                          : 'border-divider hover:border-primary'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-primary">{method.icon}</div>
                        <div>
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-foreground-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    variant="bordered"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM/YY"
                      variant="bordered"
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      variant="bordered"
                    />
                  </div>
                  <Input
                    label="Cardholder Name"
                    placeholder="John Doe"
                    variant="bordered"
                  />
                </div>
              )}

              <Divider />

              {/* Payment Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground-600">Service Fee</span>
                  <span className="text-foreground">$150.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground-600">Processing Fee</span>
                  <span className="text-foreground">$4.50</span>
                </div>
                <Divider />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">$154.50</span>
                </div>
              </div>

              <Button
                color="primary"
                size="lg"
                className="w-full font-semibold"
                onPress={handlePayment}
                isLoading={isProcessing}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : 'Pay $154.50'}
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground">Payment History</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="p-4 border border-divider rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className="font-medium text-foreground">{payment.service}</span>
                    </div>
                    <Chip
                      color={getStatusColor(payment.status)}
                      variant="flat"
                      size="sm"
                    >
                      {payment.status}
                    </Chip>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-foreground-600">{payment.method}</p>
                      <p className="text-sm text-foreground-500">{payment.date}</p>
                    </div>
                    <span className="font-semibold text-foreground">{payment.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
