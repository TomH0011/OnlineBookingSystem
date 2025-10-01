import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider
} from '@heroui/react';
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const features = [
    {
      icon: <CalendarDaysIcon className="w-8 h-8" />,
      title: 'Easy Booking',
      description: 'Book appointments in seconds with our intuitive calendar system.'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      title: 'AI Support',
      description: 'Get instant help from our AI-powered customer support chatbot.'
    },
    {
      icon: <CreditCardIcon className="w-8 h-8" />,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with Stripe integration.'
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: 'Data Security',
      description: 'Your data is protected with enterprise-grade security measures.'
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: '24/7 Availability',
      description: 'Book and manage appointments anytime, anywhere.'
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: 'Multi-Role Support',
      description: 'Perfect for customers, businesses, and administrators.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'This platform has revolutionized how we manage appointments. The AI support is incredible!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Customer',
      content: 'Booking appointments has never been easier. The interface is clean and intuitive.',
      rating: 5
    },
    {
      name: 'Emma Wilson',
      role: 'Administrator',
      content: 'The admin panel gives us complete control over our booking system. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Book Smarter,{' '}
              <span className="text-primary">Not Harder</span>
            </h1>
            <p className="text-xl text-foreground-600 mb-8 max-w-3xl mx-auto">
              The ultimate online booking platform with AI-powered customer support. 
              Book appointments, manage schedules, and get instant help from our intelligent chatbot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/register"
                size="lg"
                color="primary"
                className="font-semibold"
              >
                Get Started Free
              </Button>
              <Button
                as={Link}
                to="/login"
                size="lg"
                variant="bordered"
                className="font-semibold"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-foreground-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with user-friendly design to deliver 
              the best booking experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardBody className="text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-600">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-foreground-600">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardBody>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground-600 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <Divider className="my-4" />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground-600">{testimonial.role}</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Booking Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who have revolutionized their appointment booking process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/register"
              size="lg"
              color="secondary"
              className="font-semibold"
            >
              Start Free Trial
            </Button>
            <Button
              as={Link}
              to="/contact"
              size="lg"
              variant="bordered"
              className="font-semibold border-white text-white hover:bg-white hover:text-primary"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-foreground-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-foreground-600">Bookings Made</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-foreground-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-foreground-600">AI Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
