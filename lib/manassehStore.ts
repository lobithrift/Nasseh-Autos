import {
  Vehicle,
  RentalVehicle,
  AutomotiveService,
  ServiceBooking,
  RentalBooking,
  TestDriveRequest,
  FinancingRequest,
  SellValuationRequest,
  Testimonial,
  BlogPost,
  ContactMessage,
  AdminStats,
} from '@/types/manasseh';

// INITIAL DUMMY / REALISTIC NIGERIAN AUTOMOTIVE INVENTORY DATA
export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    slug: '2022-toyota-camry-xse',
    stock_number: 'HMA-V-101',
    make: 'Toyota',
    model: 'Camry XSE',
    year: 2022,
    price: 38500000,
    mileage: 32000,
    condition: 'Foreign Used',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    body_type: 'Sedan',
    engine: '2.5L 4-Cylinder DOHC',
    horsepower: 206,
    color: 'Midnight Black Metallic',
    location: 'DSC Township, Udu, Delta State',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'Red Leather Interior',
      'Panoramic Sunroof',
      'JBL Premium Audio',
      'Heated & Ventilated Front Seats',
      'Apple CarPlay & Android Auto',
      '360 Surround View Camera',
      'Adaptive Cruise Control',
      'Blind Spot Monitor',
    ],
    description:
      'Pristine condition 2022 Toyota Camry XSE with low mileage. Full options package, duty fully paid with genuine custom papers. Perfect blend of luxury, fuel efficiency, and sporty reliability.',
    created_at: new Date('2026-08-15').toISOString(),
  },
  {
    id: 'veh-2',
    slug: '2021-lexus-rx350-f-sport',
    stock_number: 'HMA-V-102',
    make: 'Lexus',
    model: 'RX 350 F Sport',
    year: 2021,
    price: 52000000,
    mileage: 41000,
    condition: 'Foreign Used',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    body_type: 'SUV',
    engine: '3.5L V6 DOHC 24V',
    horsepower: 295,
    color: 'Atomic Silver',
    location: 'DSC Township, Udu, Delta State',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'F Sport Styling Package',
      'Mark Levinson 15-Speaker Sound System',
      'Head-Up Display (HUD)',
      'Power Tailgate with Kick Sensor',
      'AWD All-Wheel Drive',
      'Wireless Phone Charger',
      'Adaptive Variable Suspension',
    ],
    description:
      'Exquisite 2021 Lexus RX 350 F-Sport AWD. Features aggressive F-Sport mesh front grille, 20-inch alloy wheels, dual exhaust, and ultra-comfortable leather cabin. Inspected and certified by Nasseh Autos technicians.',
    created_at: new Date('2026-08-20').toISOString(),
  },
  {
    id: 'veh-3',
    slug: '2022-mercedes-benz-gle450-4matic',
    stock_number: 'HMA-V-103',
    make: 'Mercedes-Benz',
    model: 'GLE 450 4MATIC',
    year: 2022,
    price: 85000000,
    mileage: 24000,
    condition: 'Foreign Used',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    body_type: 'SUV',
    engine: '3.0L Inline-6 Turbo with EQ Boost',
    horsepower: 362,
    color: 'Polar White',
    location: 'DSC Township, Udu, Delta State',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      'AMG Line Exterior Package',
      'MBUX Dual 12.3-inch Displays',
      'Burmester Surround Sound System',
      'AIRMATIC Air Suspension',
      'Panoramic Roof',
      'Ambient Lighting (64 Colors)',
      'Third-Row Seating (7 Passengers)',
    ],
    description:
      'Supreme luxury and performance. 2022 Mercedes-Benz GLE 450 4MATIC with EQ Boost mild-hybrid technology. Exceptionally smooth ride with full dealer inspection report available.',
    created_at: new Date('2026-09-01').toISOString(),
  },
  {
    id: 'veh-4',
    slug: '2023-toyota-land-cruiser-prado-tx-l',
    stock_number: 'HMA-V-104',
    make: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    year: 2023,
    price: 98000000,
    mileage: 12000,
    condition: 'Foreign Used',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    body_type: 'SUV',
    engine: '2.7L 4-Cylinder VVTi',
    horsepower: 164,
    color: 'Super White',
    location: 'DSC Township, Udu, Delta State',
    status: 'Available',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      '7 Seater Capacity',
      'Full Leather Upholstery',
      'Cool Box Central Console',
      '4WD High/Low Range Transfer',
      'Sunroof',
      'Side Steps',
      'Rear Climate Control',
    ],
    description:
      'The king of Nigerian roads. 2023 Toyota Land Cruiser Prado TX-L. Heavy duty 4WD system, plush 7-seater interior, high ground clearance, built for both Nigerian highway cruising and off-road capability.',
    created_at: new Date('2026-09-05').toISOString(),
  },
  {
    id: 'veh-5',
    slug: '2020-honda-accord-touring-2.0t',
    stock_number: 'HMA-V-105',
    make: 'Honda',
    model: 'Accord Touring 2.0T',
    year: 2020,
    price: 29500000,
    mileage: 48000,
    condition: 'Foreign Used',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    body_type: 'Sedan',
    engine: '2.0L Turbocharged 4-Cylinder',
    horsepower: 252,
    color: 'San Marino Red',
    location: 'DSC Township, Udu, Delta State',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      '10-Speed Automatic Transmission',
      'Adaptive Dampers',
      'Heated & Ventilated Seats',
      'Heads-Up Display',
      'Wireless Charging',
      'Honda Sensing Safety Suite',
    ],
    description:
      'Ultra responsive 2.0T turbocharged Honda Accord Touring. 252 horsepower mated to a smooth 10-speed automatic gearbox. Clean vehicle history, non-smoker owned.',
    created_at: new Date('2026-09-10').toISOString(),
  },
  {
    id: 'veh-6',
    slug: '2022-toyota-hilux-revolution-v6',
    stock_number: 'HMA-V-106',
    make: 'Toyota',
    model: 'Hilux Revolution Double Cab',
    year: 2022,
    price: 45000000,
    mileage: 28000,
    condition: 'Foreign Used',
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    body_type: 'Truck',
    engine: '2.8L 1GD-FTV Turbo Diesel',
    horsepower: 201,
    color: 'Oxide Bronze',
    location: 'DSC Township, Udu, Delta State',
    status: 'Available',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80',
    ],
    features: [
      '4x4 Heavy Duty Drive',
      'Heavy Duty Bedliner',
      'Tow Hitch Bar',
      'JBL Premium Audio',
      'Leather Interior',
      'Differential Lock',
    ],
    description:
      'Unstoppable utility truck. 2022 Toyota Hilux Double Cab 4x4 Turbo Diesel. Exceptional torque, ideal for executive travel, project management, and heavy duty towing in Delta State.',
    created_at: new Date('2026-09-12').toISOString(),
  },
];

// INITIAL SERVICES CATALOG
export const INITIAL_SERVICES: AutomotiveService[] = [
  {
    id: 'srv-1',
    slug: 'oil-filter-change',
    name: 'Oil & Filter Change',
    description:
      'Complete drain and replacement of engine oil with high performance synthetic oil, brand new filter, and multi-point engine check.',
    starting_price: 35000,
    price_range: '₦35,000 – ₦65,000',
    duration: '45–60 mins',
    icon_name: 'Oil',
    features: [
      'Full synthetic engine oil replacement',
      'OEM oil filter installation',
      'Engine fluid level check & top-up',
      'Tire pressure check & correction',
    ],
    active: true,
  },
  {
    id: 'srv-2',
    slug: 'brake-system-service',
    name: 'Brake Service & Maintenance',
    description:
      'Comprehensive inspection of brake pads, rotors, calipers, brake fluid flushing, and safety testing for confident stopping power.',
    starting_price: 45000,
    price_range: '₦45,000 – ₦85,000',
    duration: '1–2 hours',
    icon_name: 'Disc',
    features: [
      'Brake pad wear measurement & replacement',
      'Rotor resurfacing or replacement check',
      'Brake fluid flush & pressure bleeding',
      'ABS system diagnostics',
    ],
    active: true,
  },
  {
    id: 'srv-3',
    slug: 'ac-service-diagnostics',
    name: 'Air Conditioning Service & Gas Refill',
    description:
      'Air conditioning system pressure test, leak check, compressor test, cabin filter replacement, and eco-refrigerant gas top-up.',
    starting_price: 40000,
    price_range: '₦40,000 – ₦75,000',
    duration: '1–2 hours',
    icon_name: 'Wind',
    features: [
      'R134a / R1234yf refrigerant recharge',
      'AC compressor & condenser inspection',
      'Antibacterial evaporator treatment',
      'Cabin air filter replacement',
    ],
    active: true,
  },
  {
    id: 'srv-4',
    slug: 'computer-diagnostics',
    name: 'Full Computerized Engine Diagnostics',
    description:
      'Advanced OBD-II scanner diagnostics, ECU fault code reading, live sensor telemetry analysis, and clear check engine light codes.',
    starting_price: 25000,
    price_range: '₦25,000 – ₦45,000',
    duration: '30–60 mins',
    icon_name: 'Cpu',
    features: [
      'Comprehensive ECU fault code scan',
      'Live transmission telemetry check',
      'Detailed printed diagnostics report',
      'Technician recommendations consultation',
    ],
    active: true,
  },
  {
    id: 'srv-5',
    slug: 'suspension-steering',
    name: 'Suspension & Steering Overhaul',
    description:
      'Inspection and replacement of shocks, struts, ball joints, control arms, tie rods, and wheel alignment for smooth driving.',
    starting_price: 60000,
    price_range: '₦60,000 – ₦120,000',
    duration: '2–4 hours',
    icon_name: 'Activity',
    features: [
      'Front and rear shock absorber testing',
      'Bushing and ball joint inspection',
      'Power steering rack check',
      '3D Wheel alignment calibration',
    ],
    active: true,
  },
  {
    id: 'srv-6',
    slug: 'battery-electrical',
    name: 'Battery, Alternator & Electrical Service',
    description:
      'Battery load testing, alternator charging system check, starter motor inspection, wiring loom test, and battery replacement.',
    starting_price: 30000,
    price_range: '₦30,000 – ₦60,000',
    duration: '45 mins',
    icon_name: 'Zap',
    features: [
      'Digital battery cranking amp test',
      'Alternator voltage output measurement',
      'Terminal cleaning & corrosion proofing',
      'Genuine battery installation with warranty',
    ],
    active: true,
  },
  {
    id: 'srv-7',
    slug: 'general-preventive-servicing',
    name: 'General Maintenance & Full Servicing',
    description:
      'All-inclusive 50-point vehicle inspection, spark plug replacement, air filter change, transmission fluid check, and road test.',
    starting_price: 85000,
    price_range: '₦85,000 – ₦150,000',
    duration: '3–5 hours',
    icon_name: 'ShieldCheck',
    features: [
      '50-Point comprehensive vehicle check',
      'Engine oil & all filter replacements',
      'Spark plugs & fuel system cleaning',
      'Full computer diagnostic reset',
    ],
    active: true,
  },
];

// INITIAL RENTAL FLEET
export const INITIAL_RENTALS: RentalVehicle[] = [
  {
    id: 'rent-1',
    slug: 'prado-rental-2022',
    make: 'Toyota',
    model: 'Land Cruiser Prado TX-L',
    year: 2022,
    daily_rate: 150000,
    weekly_rate: 900000,
    deposit: 200000,
    seats: 7,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    body_type: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    ],
    mileage_policy: 'Unlimited within Delta State',
    availability_status: 'Available',
    description:
      'Executive 7-seater SUV with chauffeur available upon request. Premium leather, cold AC, ideal for VIP movement, corporate engagements, and airport pickups.',
  },
  {
    id: 'rent-2',
    slug: 'camry-rental-2021',
    make: 'Toyota',
    model: 'Camry SE',
    year: 2021,
    daily_rate: 65000,
    weekly_rate: 400000,
    deposit: 100000,
    seats: 5,
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    body_type: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    mileage_policy: 'Unlimited within Delta State',
    availability_status: 'Available',
    description:
      'Sleek and comfortable executive sedan for business trips, weddings, and personal transit in Udu, Warri, Asaba and surrounding areas.',
  },
  {
    id: 'rent-3',
    slug: 'hilux-rental-2022',
    make: 'Toyota',
    model: 'Hilux 4x4 Double Cab',
    year: 2022,
    daily_rate: 120000,
    weekly_rate: 750000,
    deposit: 150000,
    seats: 5,
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    body_type: 'Truck',
    images: [
      'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80',
    ],
    mileage_policy: 'Unlimited within Delta State',
    availability_status: 'Available',
    description:
      'Rugged 4x4 double cab truck built for industrial sites, security escort details, and heavy duty site inspections across Delta State.',
  },
];

// INITIAL TESTIMONIALS
export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    customer_name: 'Engr. Ovie Efe',
    review:
      'Purchased my Toyota Land Cruiser Prado from Nasseh Autos. The documentation was 100% genuine, vehicle condition was spotless, and their customer service is top notch in Delta State.',
    rating: 5,
    vehicle_or_service: '2023 Toyota Land Cruiser Prado',
    location: 'DSC Township, Delta State',
    published: true,
    created_at: new Date('2026-08-10').toISOString(),
  },
  {
    id: 't-2',
    customer_name: 'Dr. Blessing Okoro',
    review:
      'I brought my Lexus RX350 for computer diagnostics and full suspension overhaul. Their workshop has modern equipment and honest technicians. They gave me a clear reference status to track progress online!',
    rating: 5,
    vehicle_or_service: 'Full Suspension & Diagnostics',
    location: 'Warri, Delta State',
    published: true,
    created_at: new Date('2026-08-25').toISOString(),
  },
  {
    id: 't-3',
    customer_name: 'Chief Tariye K.',
    review:
      'Rented two Hilux 4x4 trucks for a 2-week project inspection trip. Vehicles were in excellent mechanical condition and never gave any trouble. Will definitely rent from Nasseh Autos again.',
    rating: 5,
    vehicle_or_service: 'Car Rental Service',
    location: 'Asaba, Delta State',
    published: true,
    created_at: new Date('2026-09-02').toISOString(),
  },
];

// INITIAL BLOG POSTS
export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'essential-car-maintenance-tips-for-nigerian-roads',
    title: '10 Essential Car Maintenance Tips for Nigerian Roads',
    excerpt:
      'Learn how to protect your engine, suspension, and tires against heat, dust, and potholed roads in Delta State.',
    content: `
      Driving in Nigeria requires proactive vehicle maintenance to prevent unexpected breakdowns. Heat, dust, and uneven road surfaces put extra strain on critical components.

      ### 1. Monitor Tire Pressure Regularly
      Under-inflated tires overheat faster under tropical sun and blowout risks increase significantly. Check your tire pressure at least twice a month.

      ### 2. Check Suspension Bushings and Shock Absorbers
      Potholes quickly wear down ball joints and shock absorber seals. Have your suspension inspected every 10,000 kilometers.

      ### 3. Use Synthetic Engine Oil
      High temperatures degrade standard mineral oils quickly. Full synthetic oil maintains viscosity and protects your engine block from excessive thermal friction.

      ### 4. Service Air Conditioning Cabin Filters
      Dust accumulation clogs cabin filters, placing extra strain on your AC compressor. Clean or replace filters every 6 months for optimal cooling.
    `,
    category: 'Vehicle Maintenance',
    featured_image:
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    author: 'Nasseh Autos Technical Team',
    read_time: '4 min read',
    published_at: new Date('2026-09-01').toISOString(),
  },
  {
    id: 'blog-2',
    slug: 'foreign-used-vs-locally-used-cars-buying-guide',
    title: 'Foreign Used (Tokunbo) vs. Locally Used Cars: What You Must Know',
    excerpt:
      'A comprehensive guide to evaluating custom documents, mileage history, mechanical integrity, and total cost of ownership.',
    content: `
      When buying a vehicle in Delta State or across Nigeria, deciding between Foreign Used (popularly called Tokunbo) and Locally Used vehicles is one of the most critical decisions.

      ### Key Factors to Evaluate:
      - **Custom Clearance Documentation**: Ensure full custom duty receipts are verified.
      - **VIN History Verification**: Always run a VIN check to confirm original mileage and damage history.
      - **Inspection Report**: Require a 50-point diagnostic check from an established auto center before paying.
    `,
    category: 'Car Buying Guide',
    featured_image:
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    author: 'Nasseh Autos',
    read_time: '6 min read',
    published_at: new Date('2026-09-12').toISOString(),
  },
];

// INITIAL SAMPLE SERVICE BOOKINGS
export const INITIAL_SERVICE_BOOKINGS: ServiceBooking[] = [
  {
    id: 'HMA-SB-8921',
    customer_name: 'Engr. Paul Erabor',
    email: 'paul.erabor@example.com',
    phone: '08031234567',
    vehicle_make: 'Toyota',
    vehicle_model: 'Camry',
    vehicle_year: 2020,
    registration_number: 'EFR-452-AA',
    service_id: 'srv-1',
    service_name: 'Oil & Filter Change',
    problem_description: 'Scheduled maintenance oil change and air filter check.',
    appointment_date: '2026-09-28',
    appointment_time: '10:00 AM',
    service_location: 'DSC Township Service Center, Udu',
    status: 'Inspection',
    estimated_cost: 35000,
    approved_amount: 35000,
    notes: 'Vehicle arrived at workshop. Technicians performing 50-point diagnostic check.',
    created_at: new Date('2026-09-25').toISOString(),
    updated_at: new Date('2026-09-26').toISOString(),
  },
];

// CLIENT-SIDE LOCALSTORAGE HELPERS
const STORAGE_KEYS = {
  VEHICLES: 'hma_vehicles_v1',
  SERVICE_BOOKINGS: 'hma_service_bookings_v1',
  RENTAL_BOOKINGS: 'hma_rental_bookings_v1',
  TEST_DRIVES: 'hma_test_drives_v1',
  FINANCING: 'hma_financing_v1',
  SELL_REQUESTS: 'hma_sell_requests_v1',
  CONTACT_MESSAGES: 'hma_contact_messages_v1',
};

// 1. VEHICLES STORE
export function getStoredVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return INITIAL_VEHICLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(INITIAL_VEHICLES));
      return INITIAL_VEHICLES;
    }
    return JSON.parse(raw) as Vehicle[];
  } catch {
    return INITIAL_VEHICLES;
  }
}

export function saveVehicleToStore(vehicle: Vehicle): Vehicle {
  const existing = getStoredVehicles();
  const index = existing.findIndex((v) => v.id === vehicle.id);
  let updated: Vehicle[];

  if (index >= 0) {
    updated = [...existing];
    updated[index] = { ...vehicle, updated_at: new Date().toISOString() };
  } else {
    updated = [vehicle, ...existing];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(updated));
  }
  return vehicle;
}

export function deleteVehicleFromStore(id: string): void {
  const existing = getStoredVehicles();
  const filtered = existing.filter((v) => v.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(filtered));
  }
}

// 2. SERVICE BOOKINGS STORE
export function getStoredServiceBookings(): ServiceBooking[] {
  if (typeof window === 'undefined') return INITIAL_SERVICE_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICE_BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SERVICE_BOOKINGS, JSON.stringify(INITIAL_SERVICE_BOOKINGS));
      return INITIAL_SERVICE_BOOKINGS;
    }
    return JSON.parse(raw) as ServiceBooking[];
  } catch {
    return INITIAL_SERVICE_BOOKINGS;
  }
}

export function saveServiceBookingToStore(booking: ServiceBooking): ServiceBooking {
  const existing = getStoredServiceBookings();
  const updated = [booking, ...existing.filter((b) => b.id !== booking.id)];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SERVICE_BOOKINGS, JSON.stringify(updated));
  }
  return booking;
}

export function getServiceBookingById(id: string): ServiceBooking | null {
  const bookings = getStoredServiceBookings();
  const ref = (id || '').trim().toUpperCase();
  return bookings.find((b) => b.id.toUpperCase() === ref) || null;
}

export function updateServiceBookingStatusInStore(
  id: string,
  newStatus: any,
  notes?: string
): ServiceBooking | null {
  const existing = getStoredServiceBookings();
  let updatedBooking: ServiceBooking | null = null;

  const updatedList = existing.map((b) => {
    if (b.id.toUpperCase() === id.toUpperCase()) {
      updatedBooking = {
        ...b,
        status: newStatus,
        notes: notes !== undefined ? notes : b.notes,
        updated_at: new Date().toISOString(),
      };
      return updatedBooking;
    }
    return b;
  });

  if (updatedBooking && typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SERVICE_BOOKINGS, JSON.stringify(updatedList));
  }
  return updatedBooking;
}

// 3. RENTAL BOOKINGS STORE
export function getStoredRentalBookings(): RentalBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RENTAL_BOOKINGS);
    return raw ? (JSON.parse(raw) as RentalBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveRentalBookingToStore(booking: RentalBooking): RentalBooking {
  const existing = getStoredRentalBookings();
  const updated = [booking, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.RENTAL_BOOKINGS, JSON.stringify(updated));
  }
  return booking;
}

// 4. TEST DRIVE REQUESTS STORE
export function getStoredTestDrives(): TestDriveRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_DRIVES);
    return raw ? (JSON.parse(raw) as TestDriveRequest[]) : [];
  } catch {
    return [];
  }
}

export function saveTestDriveToStore(request: TestDriveRequest): TestDriveRequest {
  const existing = getStoredTestDrives();
  const updated = [request, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TEST_DRIVES, JSON.stringify(updated));
  }
  return request;
}

// 5. FINANCING REQUESTS STORE
export function getStoredFinancingRequests(): FinancingRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FINANCING);
    return raw ? (JSON.parse(raw) as FinancingRequest[]) : [];
  } catch {
    return [];
  }
}

export function saveFinancingRequestToStore(request: FinancingRequest): FinancingRequest {
  const existing = getStoredFinancingRequests();
  const updated = [request, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.FINANCING, JSON.stringify(updated));
  }
  return request;
}

// 6. SELL VALUATION REQUESTS STORE
export function getStoredSellRequests(): SellValuationRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SELL_REQUESTS);
    return raw ? (JSON.parse(raw) as SellValuationRequest[]) : [];
  } catch {
    return [];
  }
}

export function saveSellRequestToStore(request: SellValuationRequest): SellValuationRequest {
  const existing = getStoredSellRequests();
  const updated = [request, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SELL_REQUESTS, JSON.stringify(updated));
  }
  return request;
}

// 7. CONTACT MESSAGES STORE
export function getStoredContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_MESSAGES);
    return raw ? (JSON.parse(raw) as ContactMessage[]) : [];
  } catch {
    return [];
  }
}

export function saveContactMessageToStore(message: ContactMessage): ContactMessage {
  const existing = getStoredContactMessages();
  const updated = [message, ...existing];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(updated));
  }
  return message;
}

// 8. ADMIN STATS GENERATOR
export function getAdminStats(): AdminStats {
  const vehicles = getStoredVehicles();
  const services = getStoredServiceBookings();
  const testDrives = getStoredTestDrives();
  const financing = getStoredFinancingRequests();
  const sellRequests = getStoredSellRequests();
  const messages = getStoredContactMessages();

  return {
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter((v) => v.status === 'Available').length,
    rentalVehicles: INITIAL_RENTALS.length,
    activeServiceBookings: services.filter((s) => s.status !== 'Completed').length,
    testDriveRequests: testDrives.length,
    financingRequests: financing.length,
    sellRequests: sellRequests.length,
    unreadContactMessages: messages.filter((m) => m.status === 'Unread').length,
  };
}
