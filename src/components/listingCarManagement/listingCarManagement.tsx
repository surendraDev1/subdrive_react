import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  isAvailable: boolean;
  unavailableDates?: [Date, Date];
}

const ListingManagementDashboard: React.FC = () => {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [editingListing, setEditingListing] = useState<CarListing | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch listings from your API
    // This is a mock implementation
    const mockListings: CarListing[] = [
      { id: '1', make: 'Toyota', model: 'Camry', year: 2020, price: 50, isAvailable: true },
      { id: '2', make: 'Honda', model: 'Civic', year: 2019, price: 45, isAvailable: true },
    ];
    setListings(mockListings);
  }, []);

  const handleEdit = (record: CarListing) => {
    setEditingListing(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this listing?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        setListings(listings.filter(listing => listing.id !== id));
        message.success('Listing deleted successfully');
      },
    });
  };

  const handleSave = (values: any) => {
    const updatedListings = listings.map(listing =>
      listing.id === editingListing?.id ? { ...listing, ...values } : listing
    );
    setListings(updatedListings);
    setIsModalVisible(false);
    setEditingListing(null);
    message.success('Listing updated successfully');
  };

  const handleAvailabilityChange = (id: string, isAvailable: boolean) => {
    const updatedListings = listings.map(listing =>
      listing.id === id ? { ...listing, isAvailable } : listing
    );
    setListings(updatedListings);
    message.success(`Listing marked as ${isAvailable ? 'available' : 'unavailable'}`);
  };

  const columns = [
    { title: 'Make', dataIndex: 'make', key: 'make' },
    { title: 'Model', dataIndex: 'model', key: 'model' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (price: number) => `$${price}/day` },
    { 
      title: 'Status', 
      dataIndex: 'isAvailable', 
      key: 'isAvailable',
      render: (isAvailable: boolean, record: CarListing) => (
        <Button 
          type={isAvailable ? 'primary' : 'default'} 
          onClick={() => handleAvailabilityChange(record.id, !isAvailable)}
        >
          {isAvailable ? 'Available' : 'Unavailable'}
        </Button>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: CarListing) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current.isBefore(dayjs());
  };

  return (
    <div>
      <h1>Your Car Listings</h1>
      <Table dataSource={listings} columns={columns} rowKey="id" />
      <Modal
        title="Edit Listing"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingListing || {}}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item name="make" label="Make" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="model" label="Model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="price" label="Price per day" rules={[{ required: true }]}>
            <Input type="number" prefix="$" />
          </Form.Item>
          <Form.Item name="unavailableDates" label="Unavailable Dates">
            <DatePicker.RangePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListingManagementDashboard;