export type VehicleCondition = 'New' | 'Foreign Used' | 'Locally Used';
export type TransmissionType = 'Automatic' | 'Manual' | 'CVT';
export type FuelType = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
export type BodyType = 'SUV' | 'Sedan' | 'Truck' | 'Coupe' | 'Hatchback' | 'Van' | 'Convertible';
export type VehicleStatus = 'Available' | 'Reserved' | 'Sold' | 'Pending Inspection' | 'Unavailable';
export type RentalStatus = 'Available' | 'Reserved' | 'Rented' | 'Maintenance';

export interface Vehicle {
  id: string;
  slug: string;
  stock_number: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number; // in km
  condition: VehicleCondition;
  transmission: TransmissionType;
  fuel_type: FuelType;
  body_type: BodyType;
  engine: string;
  horsepower: number;
  color: string;
  location: string;
  status: VehicleStatus;
  featured: boolean;
  images: string[];
  features: string[];
  description: string;
  vin?: string;
  created_at: string;
  updated_at?: string;
}

export interface VehicleFilterState {
  searchQuery: string;
  condition: string;
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  maxMileage: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  status: string;
  sortBy: string;
}

export interface RentalVehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  daily_rate: number;
  weekly_rate: number;
  deposit: number;
  seats: number;
  transmission: TransmissionType;
  fuel_type: FuelType;
  body_type: BodyType;
  images: string[];
  mileage_policy: string;
  availability_status: RentalStatus;
  description: string;
}

export interface RentalBooking {
  id: string;
  rental_vehicle_id: string;
  vehicle_name: string;
  customer_name: string;
  email: string;
  phone: string;
  pickup_date: string;
  pickup_time: string;
  return_date: string;
  return_time: string;
  pickup_location: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  created_at: string;
}

export interface AutomotiveService {
  id: string;
  slug: string;
  name: string;
  description: string;
  starting_price: number;
  price_range?: string;
  duration: string;
  icon_name: string;
  features: string[];
  active: boolean;
}

export type ServiceStatusStep =
  | 'Booking Received'
  | 'Vehicle Checked In'
  | 'Inspection'
  | 'Estimate Prepared'
  | 'Awaiting Approval'
  | 'Repair in Progress'
  | 'Quality Check'
  | 'Ready for Collection'
  | 'Completed';

export interface ServiceBooking {
  id: string; // Booking reference e.g., HMA-SB-8921
  customer_name: string;
  email: string;
  phone: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  registration_number: string;
  service_id: string;
  service_name: string;
  problem_description: string;
  appointment_date: string;
  appointment_time: string;
  service_location: string;
  status: ServiceStatusStep;
  estimated_cost?: number;
  approved_amount?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface TestDriveRequest {
  id: string;
  vehicle_id: string;
  vehicle_title: string;
  customer_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  created_at: string;
}

export interface FinancingRequest {
  id: string;
  vehicle_id?: string;
  vehicle_title?: string;
  customer_name: string;
  email: string;
  phone: string;
  vehicle_price: number;
  deposit_amount: number;
  loan_term_months: number;
  estimated_monthly_payment: number;
  employment_status: string;
  monthly_income?: string;
  status: 'New' | 'Under Review' | 'Approved' | 'Declined';
  created_at: string;
}

export interface SellValuationRequest {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  expected_price: number;
  location: string;
  description: string;
  status: 'Pending Valuation' | 'Offer Sent' | 'Accepted' | 'Declined';
  created_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  review: string;
  rating: number; // 1-5
  vehicle_or_service: string;
  image_url?: string;
  location?: string;
  published: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string;
  author: string;
  read_time: string;
  published_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Replied' | 'Archived';
  created_at: string;
}

export interface AdminStats {
  totalVehicles: number;
  availableVehicles: number;
  rentalVehicles: number;
  activeServiceBookings: number;
  testDriveRequests: number;
  financingRequests: number;
  sellRequests: number;
  unreadContactMessages: number;
}
