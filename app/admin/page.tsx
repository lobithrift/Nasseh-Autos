'use client';

import React, { useState } from 'react';
import {
  getStoredVehicles,
  getStoredServiceBookings,
  getStoredRentalBookings,
  getStoredTestDrives,
  getStoredFinancingRequests,
  getStoredSellRequests,
  getStoredContactMessages,
  getAdminStats,
  saveVehicleToStore,
  deleteVehicleFromStore,
  updateServiceBookingStatusInStore,
} from '@/lib/manassehStore';
import { Vehicle, ServiceBooking, ServiceStatusStep } from '@/types/manasseh';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  LayoutDashboard,
  Car,
  Wrench,
  Key,
  Plus,
  Trash2,
  Edit,
  DollarSign,
  Phone,
  Mail,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Check,
} from 'lucide-react';

const STATUS_OPTIONS: ServiceStatusStep[] = [
  'Booking Received',
  'Vehicle Checked In',
  'Inspection',
  'Estimate Prepared',
  'Awaiting Approval',
  'Repair in Progress',
  'Quality Check',
  'Ready for Collection',
  'Completed',
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'services' | 'testdrives' | 'financing' | 'sell'>('vehicles');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nasseh_admin_logged_in') === 'true';
    }
    return false;
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [vehicles, setVehicles] = useState(() => getStoredVehicles());
  const [serviceBookings, setServiceBookings] = useState(() => getStoredServiceBookings());
  const [testDrives] = useState(() => getStoredTestDrives());
  const [financingRequests] = useState(() => getStoredFinancingRequests());
  const [sellRequests] = useState(() => getStoredSellRequests());

  const stats = getAdminStats();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = 'nassehautos@gmail.com';
    const altEmail = 'admin@nassehautos.com';
    const validPass = 'NassehAutos2026!';

    if (
      (loginEmail.trim().toLowerCase() === validEmail || loginEmail.trim().toLowerCase() === altEmail) &&
      loginPassword === validPass
    ) {
      setIsAuthenticated(true);
      setLoginError('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('nasseh_admin_logged_in', 'true');
      }
    } else {
      setLoginError('Invalid admin email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nasseh_admin_logged_in');
    }
  };

  // Add Vehicle Modal
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [newVehForm, setNewVehForm] = useState({
    make: '',
    model: '',
    year: 2022,
    price: 35000000,
    mileage: 25000,
    condition: 'Foreign Used' as any,
    transmission: 'Automatic' as any,
    fuel_type: 'Petrol' as any,
    body_type: 'SUV' as any,
    color: 'Black',
    description: '',
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehForm.make || !newVehForm.model) return;

    const slug = `${newVehForm.year}-${newVehForm.make}-${newVehForm.model}-${Date.now().toString().slice(-4)}`
      .toLowerCase()
      .replace(/\s+/g, '-');

    const createdVeh: Vehicle = {
      id: `veh-${Date.now()}`,
      slug,
      stock_number: `NA-V-${Math.floor(100 + Math.random() * 900)}`,
      make: newVehForm.make,
      model: newVehForm.model,
      year: Number(newVehForm.year),
      price: Number(newVehForm.price),
      mileage: Number(newVehForm.mileage),
      condition: newVehForm.condition,
      transmission: newVehForm.transmission,
      fuel_type: newVehForm.fuel_type,
      body_type: newVehForm.body_type,
      engine: '2.5L 4-Cylinder',
      horsepower: 200,
      color: newVehForm.color,
      location: 'DSC Township, Delta State',
      status: 'Available',
      featured: true,
      images: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      ],
      features: ['Full Option', 'Leather Interior', 'Air Conditioning', 'Reverse Camera'],
      description: newVehForm.description || 'Pristine condition vehicle recently imported and inspected.',
      created_at: new Date().toISOString(),
    };

    saveVehicleToStore(createdVeh);
    setVehicles(getStoredVehicles());
    setAddVehicleModalOpen(false);
    setNewVehForm({
      make: '',
      model: '',
      year: 2022,
      price: 35000000,
      mileage: 25000,
      condition: 'Foreign Used',
      transmission: 'Automatic',
      fuel_type: 'Petrol',
      body_type: 'SUV',
      color: 'Black',
      description: '',
    });
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle from inventory?')) {
      deleteVehicleFromStore(id);
      setVehicles(getStoredVehicles());
    }
  };

  const handleUpdateServiceStatus = (id: string, newStatus: ServiceStatusStep) => {
    updateServiceBookingStatusInStore(id, newStatus);
    setServiceBookings(getStoredServiceBookings());
  };

  const formatNaira = (val: number) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 animate-fadeIn">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Key className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Nasseh Autos Admin Portal</h1>
            <p className="text-xs text-slate-500 font-semibold">
              Authorized access only. Please enter your administrator credentials to manage inventory and bookings.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <X className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Admin Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="nassehautos@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Password</label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-red"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold uppercase tracking-wider text-xs shadow-lg shadow-brand-red/20 transition-all cursor-pointer"
            >
              Sign In To Dashboard
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-slate-400">
            Protected by Nasseh Autos Security System &bull; Unauthorized access is strictly logged.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Admin Management Dashboard' }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-black text-white p-8 rounded-3xl border border-zinc-800">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-brand-red" />
            Nasseh Autos Admin Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage vehicle inventory, track workshop service bookings, and respond to customer leads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddVehicleModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-red/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vehicle</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-700"
            title="Log out of admin"
          >
            <X className="w-4 h-4 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Vehicles</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.totalVehicles}</p>
          <span className="text-[11px] text-emerald-600 font-bold">{stats.availableVehicles} Available</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Service Bookings</span>
          <p className="text-2xl sm:text-3xl font-black text-brand-red">{stats.activeServiceBookings}</p>
          <span className="text-[11px] text-slate-500 font-semibold">Workshop Repairs</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Test Drive Requests</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.testDriveRequests}</p>
          <span className="text-[11px] text-slate-500 font-semibold">Leads</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Financing & Sell Inquiries</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{stats.financingRequests + stats.sellRequests}</p>
          <span className="text-[11px] text-slate-500 font-semibold">Valuations</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 overflow-x-auto text-xs font-bold">
        {[
          { id: 'vehicles', label: 'Inventory Management', count: vehicles.length },
          { id: 'services', label: 'Service Bookings', count: serviceBookings.length },
          { id: 'testdrives', label: 'Test Drive Requests', count: testDrives.length },
          { id: 'financing', label: 'Financing Requests', count: financingRequests.length },
          { id: 'sell', label: 'Sell / Trade Requests', count: sellRequests.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-brand-red text-brand-red font-black'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label} <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: VEHICLES INVENTORY MANAGEMENT */}
      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Stock ID</th>
                    <th className="p-4">Vehicle Title</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {vehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-mono font-bold text-brand-red">{v.stock_number}</td>
                      <td className="p-4 font-bold text-slate-900">
                        {v.year} {v.make} {v.model}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-700">
                          {v.condition}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-slate-900">{formatNaira(v.price)}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                          {v.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteVehicle(v.id)}
                          className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SERVICE BOOKINGS MANAGEMENT */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase tracking-wider">
                    <th className="p-4">Ref ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Vehicle</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Appointment</th>
                    <th className="p-4">Status & Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {serviceBookings.map((sb) => (
                    <tr key={sb.id} className="hover:bg-slate-50/80">
                      <td className="p-4 font-mono font-bold text-brand-red">{sb.id}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{sb.customer_name}</p>
                        <p className="text-[11px] text-slate-500">{sb.phone}</p>
                      </td>
                      <td className="p-4">
                        {sb.vehicle_year} {sb.vehicle_make} {sb.vehicle_model}
                      </td>
                      <td className="p-4 font-bold text-slate-800">{sb.service_name}</td>
                      <td className="p-4 text-slate-600">{sb.appointment_date} ({sb.appointment_time})</td>
                      <td className="p-4">
                        <select
                          value={sb.status}
                          onChange={(e) => handleUpdateServiceStatus(sb.id, e.target.value as any)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold focus:outline-none focus:border-brand-red bg-white"
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEST DRIVE REQUESTS */}
      {activeTab === 'testdrives' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Test Drive Requests</h3>
          {testDrives.length === 0 ? (
            <p className="text-xs text-slate-500">No test drive requests recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {testDrives.map((td) => (
                <div key={td.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{td.customer_name} &bull; {td.phone}</p>
                  <p className="text-brand-red font-semibold">{td.vehicle_title}</p>
                  <p className="text-slate-500">Date: {td.preferred_date} ({td.preferred_time})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FINANCING REQUESTS */}
      {activeTab === 'financing' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Financing Applications</h3>
          {financingRequests.length === 0 ? (
            <p className="text-xs text-slate-500">No financing requests recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {financingRequests.map((fr) => (
                <div key={fr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{fr.customer_name} &bull; {fr.phone}</p>
                  <p>Vehicle Price: {formatNaira(fr.vehicle_price)} | Deposit: {formatNaira(fr.deposit_amount)}</p>
                  <p className="text-slate-500">Term: {fr.loan_term_months} Months | Income: {fr.monthly_income}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SELL REQUESTS */}
      {activeTab === 'sell' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Sell / Trade-In Valuation Requests</h3>
          {sellRequests.length === 0 ? (
            <p className="text-xs text-slate-500">No valuation requests recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {sellRequests.map((sr) => (
                <div key={sr.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900">{sr.customer_name} ({sr.phone})</p>
                  <p className="text-brand-red font-bold">{sr.year} {sr.make} {sr.model} &bull; {sr.mileage.toLocaleString()} km</p>
                  <p>Expected Price: {formatNaira(sr.expected_price)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD VEHICLE MODAL */}
      {addVehicleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddVehicleModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-slate-900">Add New Inventory Vehicle</h3>

            <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Make *</label>
                  <input
                    type="text"
                    required
                    value={newVehForm.make}
                    onChange={(e) => setNewVehForm({ ...newVehForm, make: e.target.value })}
                    placeholder="e.g. Toyota"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Model *</label>
                  <input
                    type="text"
                    required
                    value={newVehForm.model}
                    onChange={(e) => setNewVehForm({ ...newVehForm, model: e.target.value })}
                    placeholder="e.g. Camry"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Year</label>
                  <input
                    type="number"
                    value={newVehForm.year}
                    onChange={(e) => setNewVehForm({ ...newVehForm, year: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Price (₦)</label>
                  <input
                    type="number"
                    value={newVehForm.price}
                    onChange={(e) => setNewVehForm({ ...newVehForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Mileage (km)</label>
                  <input
                    type="number"
                    value={newVehForm.mileage}
                    onChange={(e) => setNewVehForm({ ...newVehForm, mileage: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700">Condition</label>
                  <select
                    value={newVehForm.condition}
                    onChange={(e) => setNewVehForm({ ...newVehForm, condition: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  >
                    <option value="Foreign Used">Foreign Used (Tokunbo)</option>
                    <option value="New">Brand New</option>
                    <option value="Locally Used">Locally Used</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Body Type</label>
                  <select
                    value={newVehForm.body_type}
                    onChange={(e) => setNewVehForm({ ...newVehForm, body_type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  value={newVehForm.description}
                  onChange={(e) => setNewVehForm({ ...newVehForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-brand-red mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm uppercase tracking-wider shadow-lg"
              >
                Save Vehicle to Inventory
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
