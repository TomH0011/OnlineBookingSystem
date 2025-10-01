import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Avatar,
  Divider,
  Switch,
  Chip
} from '@heroui/react';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon, EnvelopeIcon, KeyIcon, BellIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      username: user?.username || ''
    }
  });

  const onSubmit = (data) => {
    updateUser(data);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-foreground-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="text-center p-8">
              <Avatar
                src={`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=3b82f6&color=fff`}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-foreground mb-1">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-foreground-600 mb-2">{user?.email}</p>
              <p className="text-sm text-foreground-500 mb-4">
                Customer Support ID: {user?.customerSupportId}
              </p>
              <Chip color="primary" variant="flat">
                {user?.role}
              </Chip>
            </CardBody>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-foreground">Personal Information</h3>
              <Button
                color={isEditing ? 'danger' : 'primary'}
                variant={isEditing ? 'light' : 'solid'}
                onPress={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    {...register('firstName', { required: 'First name is required' })}
                    label="First Name"
                    variant="bordered"
                    isDisabled={!isEditing}
                    isInvalid={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                    startContent={<UserIcon className="w-4 h-4 text-foreground-400" />}
                  />
                  <Input
                    {...register('lastName', { required: 'Last name is required' })}
                    label="Last Name"
                    variant="bordered"
                    isDisabled={!isEditing}
                    isInvalid={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                    startContent={<UserIcon className="w-4 h-4 text-foreground-400" />}
                  />
                </div>

                <Input
                  {...register('username', { required: 'Username is required' })}
                  label="Username"
                  variant="bordered"
                  isDisabled={!isEditing}
                  isInvalid={!!errors.username}
                  errorMessage={errors.username?.message}
                  startContent={<UserIcon className="w-4 h-4 text-foreground-400" />}
                />

                <Input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  label="Email"
                  type="email"
                  variant="bordered"
                  isDisabled={!isEditing}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  startContent={<EnvelopeIcon className="w-4 h-4 text-foreground-400" />}
                />

                {isEditing && (
                  <div className="flex justify-end space-x-2">
                    <Button variant="light" onPress={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button color="primary" type="submit">
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardBody>
          </Card>

          {/* Security Settings */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-xl font-semibold text-foreground">Security</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Button
                  color="primary"
                  variant="bordered"
                  startContent={<KeyIcon className="w-4 h-4" />}
                  className="w-full justify-start"
                >
                  Change Password
                </Button>
                <Button
                  color="secondary"
                  variant="bordered"
                  startContent={<KeyIcon className="w-4 h-4" />}
                  className="w-full justify-start"
                >
                  Two-Factor Authentication
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Notification Settings */}
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-xl font-semibold text-foreground">Notifications</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="w-5 h-5 text-foreground-400" />
                    <div>
                      <p className="font-medium text-foreground">Email Notifications</p>
                      <p className="text-sm text-foreground-600">Receive booking updates via email</p>
                    </div>
                  </div>
                  <Switch defaultSelected />
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="w-5 h-5 text-foreground-400" />
                    <div>
                      <p className="font-medium text-foreground">SMS Notifications</p>
                      <p className="text-sm text-foreground-600">Receive booking reminders via SMS</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BellIcon className="w-5 h-5 text-foreground-400" />
                    <div>
                      <p className="font-medium text-foreground">Marketing Emails</p>
                      <p className="text-sm text-foreground-600">Receive updates about new features</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
