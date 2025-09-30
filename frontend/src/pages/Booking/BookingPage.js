import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react';
import { CalendarDaysIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const services = [
    { key: 'consultation', label: 'Consultation' },
    { key: 'follow-up', label: 'Follow-up' },
    { key: 'meeting', label: 'Meeting' },
    { key: 'training', label: 'Training' }
  ];

  const onSubmit = (data) => {
    const newBooking = {
      id: Date.now(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    toast.success('Booking created successfully!');
    reset();
    onClose();
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    onOpen();
  };

  const handleDelete = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
    toast.success('Booking deleted successfully!');
  };

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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookings</h1>
          <p className="text-foreground-600">Manage your appointments and schedules</p>
        </div>
        <Button
          color="primary"
          startContent={<PlusIcon className="w-4 h-4" />}
          onPress={onOpen}
        >
          New Booking
        </Button>
      </div>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-foreground">Your Bookings</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Bookings table">
            <TableHeader>
              <TableColumn>SERVICE</TableColumn>
              <TableColumn>DATE & TIME</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.serviceName}</p>
                      <p className="text-sm text-foreground-600">{booking.serviceDescription}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{booking.bookingDateTime}</p>
                      <p className="text-sm text-foreground-600">${booking.price}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.durationMinutes} min</TableCell>
                  <TableCell>
                    <Chip color={getStatusColor(booking.status)} variant="flat" size="sm">
                      {booking.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(booking)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => handleDelete(booking.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Create/Edit Booking Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3 className="text-xl font-semibold text-foreground">
                  {selectedBooking ? 'Edit Booking' : 'Create New Booking'}
                </h3>
              </ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      {...register('serviceName', { required: 'Service is required' })}
                      label="Service"
                      placeholder="Select a service"
                      variant="bordered"
                      isInvalid={!!errors.serviceName}
                      errorMessage={errors.serviceName?.message}
                    >
                      {services.map((service) => (
                        <SelectItem key={service.key} value={service.key}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input
                      {...register('bookingDateTime', { required: 'Date and time is required' })}
                      label="Date & Time"
                      type="datetime-local"
                      variant="bordered"
                      isInvalid={!!errors.bookingDateTime}
                      errorMessage={errors.bookingDateTime?.message}
                    />

                    <Input
                      {...register('durationMinutes', { 
                        required: 'Duration is required',
                        valueAsNumber: true
                      })}
                      label="Duration (minutes)"
                      type="number"
                      variant="bordered"
                      isInvalid={!!errors.durationMinutes}
                      errorMessage={errors.durationMinutes?.message}
                    />

                    <Input
                      {...register('price', { 
                        required: 'Price is required',
                        valueAsNumber: true
                      })}
                      label="Price ($)"
                      type="number"
                      step="0.01"
                      variant="bordered"
                      isInvalid={!!errors.price}
                      errorMessage={errors.price?.message}
                    />
                  </div>

                  <Textarea
                    {...register('serviceDescription')}
                    label="Description"
                    placeholder="Describe the service..."
                    variant="bordered"
                    rows={3}
                  />

                  <Textarea
                    {...register('notes')}
                    label="Notes"
                    placeholder="Additional notes..."
                    variant="bordered"
                    rows={2}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    {selectedBooking ? 'Update' : 'Create'} Booking
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BookingPage;
