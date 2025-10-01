import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress
} from '@heroui/react';
import { useAuth } from '../../contexts/AuthContext';
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Bookings',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      color: 'primary'
    },
    {
      title: 'Active Chats',
      value: '3',
      change: '+2',
      changeType: 'positive',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      color: 'success'
    },
    {
      title: 'Revenue',
      value: '$2,450',
      change: '+8%',
      changeType: 'positive',
      icon: <CreditCardIcon className="w-6 h-6" />,
      color: 'warning'
    },
    {
      title: 'Upcoming',
      value: '5',
      change: 'Today',
      changeType: 'neutral',
      icon: <ClockIcon className="w-6 h-6" />,
      color: 'secondary'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      service: 'Consultation',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      customer: 'John Doe'
    },
    {
      id: 2,
      service: 'Follow-up',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'pending',
      customer: 'Jane Smith'
    },
    {
      id: 3,
      service: 'Initial Meeting',
      date: '2024-01-17',
      time: '3:30 PM',
      status: 'confirmed',
      customer: 'Mike Johnson'
    }
  ];

  const quickActions = [
    {
      title: 'New Booking',
      description: 'Create a new appointment',
      icon: <PlusIcon className="w-8 h-8" />,
      link: '/booking',
      color: 'primary'
    },
    {
      title: 'AI Support',
      description: 'Chat with our AI assistant',
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      link: '/chat',
      color: 'success'
    },
    {
      title: 'View Bookings',
      description: 'Manage your appointments',
      icon: <EyeIcon className="w-8 h-8" />,
      link: '/booking',
      color: 'secondary'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: <ChartBarIcon className="w-8 h-8" />,
      link: '/analytics',
      color: 'warning'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-foreground-600">
          Here's what's happening with your bookings today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-success' : 
                    stat.changeType === 'negative' ? 'text-danger' : 
                    'text-foreground-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`text-${stat.color} p-3 rounded-lg bg-${stat.color}-50`}>
                  {stat.icon}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Recent Bookings</h2>
              <Button as={Link} to="/booking" variant="light" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-divider rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                        <CalendarDaysIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{booking.service}</p>
                        <p className="text-sm text-foreground-600">{booking.customer}</p>
                        <p className="text-sm text-foreground-500">{booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <Chip
                      color={getStatusColor(booking.status)}
                      variant="flat"
                      size="sm"
                    >
                      {booking.status}
                    </Chip>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    as={Link}
                    to={action.link}
                    variant="bordered"
                    className="w-full justify-start h-auto p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-${action.color} p-2 rounded-lg bg-${action.color}-50`}>
                        {action.icon}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-foreground">{action.title}</p>
                        <p className="text-sm text-foreground-600">{action.description}</p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Progress Card */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">Monthly Progress</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground-600">Bookings Target</span>
                    <span className="text-sm font-medium text-foreground">18/25</span>
                  </div>
                  <Progress value={72} color="primary" className="mb-4" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground-600">Revenue Goal</span>
                    <span className="text-sm font-medium text-foreground">$1,800/$2,500</span>
                  </div>
                  <Progress value={72} color="success" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Role-specific content */}
      {user?.role === 'ADMIN' && (
        <Card className="mt-8">
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground">Admin Panel</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button as={Link} to="/admin/users" color="primary" variant="bordered">
                Manage Users
              </Button>
              <Button as={Link} to="/admin/analytics" color="secondary" variant="bordered">
                View Analytics
              </Button>
              <Button as={Link} to="/admin/settings" color="warning" variant="bordered">
                System Settings
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;
