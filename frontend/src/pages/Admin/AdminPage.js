import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Avatar,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react';
import {
  UserGroupIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'primary'
    },
    {
      title: 'Total Bookings',
      value: '5,678',
      change: '+8%',
      icon: <CalendarDaysIcon className="w-6 h-6" />,
      color: 'success'
    },
    {
      title: 'Active Chats',
      value: '45',
      change: '+5',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      color: 'warning'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+15%',
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      color: 'secondary'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'CUSTOMER',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'BUSINESS',
      status: 'active',
      joinDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'CUSTOMER',
      status: 'inactive',
      joinDate: '2024-01-08'
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN': return 'danger';
      case 'BUSINESS': return 'warning';
      case 'CUSTOMER': return 'primary';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-foreground-600">Manage your platform and monitor system performance</p>
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
                  <p className="text-sm text-success">{stat.change}</p>
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
        {/* Users Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Users Management</h2>
              <div className="flex space-x-2">
                <Input
                  placeholder="Search users..."
                  size="sm"
                  className="w-48"
                />
                <Select
                  placeholder="Filter by role"
                  size="sm"
                  className="w-32"
                >
                  <SelectItem key="all" value="all">All Roles</SelectItem>
                  <SelectItem key="CUSTOMER" value="CUSTOMER">Customer</SelectItem>
                  <SelectItem key="BUSINESS" value="BUSINESS">Business</SelectItem>
                  <SelectItem key="ADMIN" value="ADMIN">Admin</SelectItem>
                </Select>
              </div>
            </CardHeader>
            <CardBody>
              <Table aria-label="Users table">
                <TableHeader>
                  <TableColumn>USER</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>JOIN DATE</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff`}
                            size="sm"
                          />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-foreground-600">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip color={getRoleColor(user.role)} variant="flat" size="sm">
                          {user.role}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Chip color={getStatusColor(user.status)} variant="flat" size="sm">
                          {user.status}
                        </Chip>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="light">
                            Edit
                          </Button>
                          <Button size="sm" color="danger" variant="light">
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <div className="space-y-3">
                <Button
                  color="primary"
                  variant="bordered"
                  className="w-full justify-start"
                  startContent={<UserGroupIcon className="w-4 h-4" />}
                >
                  Add New User
                </Button>
                <Button
                  color="secondary"
                  variant="bordered"
                  className="w-full justify-start"
                  startContent={<CalendarDaysIcon className="w-4 h-4" />}
                >
                  View All Bookings
                </Button>
                <Button
                  color="warning"
                  variant="bordered"
                  className="w-full justify-start"
                  startContent={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                >
                  Monitor Chats
                </Button>
                <Button
                  color="success"
                  variant="bordered"
                  className="w-full justify-start"
                  startContent={<ChartBarIcon className="w-4 h-4" />}
                >
                  View Analytics
                </Button>
                <Button
                  color="default"
                  variant="bordered"
                  className="w-full justify-start"
                  startContent={<CogIcon className="w-4 h-4" />}
                >
                  System Settings
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* System Status */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-foreground">System Status</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground-600">Database</span>
                  <Chip color="success" size="sm">Online</Chip>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground-600">AI Service</span>
                  <Chip color="success" size="sm">Online</Chip>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground-600">Payment Gateway</span>
                  <Chip color="success" size="sm">Online</Chip>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground-600">Email Service</span>
                  <Chip color="warning" size="sm">Degraded</Chip>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
