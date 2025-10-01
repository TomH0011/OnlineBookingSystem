import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Link as NextUILink,
  Button,
  Input
} from '@nextui-org/react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="font-bold text-xl text-foreground">BookingSystem</span>
            </div>
            <p className="text-foreground-600 text-sm">
              The ultimate online booking platform with AI-powered customer support. 
              Book appointments, manage schedules, and get instant help.
            </p>
            <div className="flex space-x-4">
              <Button isIconOnly variant="light" size="sm">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Button>
              <Button isIconOnly variant="light" size="sm">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Button>
              <Button isIconOnly variant="light" size="sm">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <NextUILink as={Link} to="/" className="text-foreground-600 hover:text-primary">
                Home
              </NextUILink>
              <NextUILink as={Link} to="/booking" className="text-foreground-600 hover:text-primary">
                Book Appointment
              </NextUILink>
              <NextUILink as={Link} to="/chat" className="text-foreground-600 hover:text-primary">
                AI Support
              </NextUILink>
              <NextUILink as={Link} to="/about" className="text-foreground-600 hover:text-primary">
                About Us
              </NextUILink>
              <NextUILink as={Link} to="/contact" className="text-foreground-600 hover:text-primary">
                Contact
              </NextUILink>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <div className="flex flex-col space-y-2">
              <NextUILink as={Link} to="/services/consultation" className="text-foreground-600 hover:text-primary">
                Consultation
              </NextUILink>
              <NextUILink as={Link} to="/services/booking" className="text-foreground-600 hover:text-primary">
                Online Booking
              </NextUILink>
              <NextUILink as={Link} to="/services/support" className="text-foreground-600 hover:text-primary">
                AI Support
              </NextUILink>
              <NextUILink as={Link} to="/services/payment" className="text-foreground-600 hover:text-primary">
                Payment Processing
              </NextUILink>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="w-4 h-4 text-primary" />
                <span className="text-foreground-600 text-sm">support@bookingsystem.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-primary" />
                <span className="text-foreground-600 text-sm">+44 20 7946 0958</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4 text-primary" />
                <span className="text-foreground-600 text-sm">London, UK</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="font-medium text-foreground text-sm">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  size="sm"
                  className="flex-1"
                />
                <Button color="primary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-divider mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-foreground-600 text-sm">
              <span>© {currentYear} BookingSystem. All rights reserved.</span>
              <HeartIcon className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex space-x-6 text-sm">
              <NextUILink as={Link} to="/privacy" className="text-foreground-600 hover:text-primary">
                Privacy Policy
              </NextUILink>
              <NextUILink as={Link} to="/terms" className="text-foreground-600 hover:text-primary">
                Terms of Service
              </NextUILink>
              <NextUILink as={Link} to="/cookies" className="text-foreground-600 hover:text-primary">
                Cookie Policy
              </NextUILink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;