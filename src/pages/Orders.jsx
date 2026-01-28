import React, { useState } from 'react';
import { 
  FiSearch, 
  FiRefreshCw, 
  FiFilter, 
  FiCalendar, 
  FiDownload, 
  FiEye, 
  FiTrash2, 
  FiShoppingBag, 
  FiCheckCircle, 
  FiClock, 
  FiDollarSign 
} from 'react-icons/fi';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Data derived from design
  const [orders] = useState([
    { 
      id: 'LfTzgf6Q42NuEcCks4cj', 
      items: 1, 
      customer: 'sundalman', 
      email: 'sundalman@gmail.com', 
      amount: '₹613', 
      status: 'Pending', 
      date: 'Dec 24, 2025', 
      time: '10:16 AM' 
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-500 text-sm">Track and manage all customer orders</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex flex-col items-center">
             <span className="text-[10px] font-bold text-blue-400 uppercase">Total Revenue</span>
             <span className="text-xl font-black text-gray-800">₹42,762</span>
          </div>
          <button className="p-3 border rounded-xl bg-white text-gray-600 hover:bg-gray-100 shadow-sm flex items-center gap-2 font-bold text-sm">
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      {/* Colorful Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Orders - Blue */}
        <div className="bg-blue-600 p-6 rounded-[2rem] shadow-lg text-white flex justify-between items-center relative overflow-hidden">
          <div>
            <p className="text-sm font-medium opacity-80 uppercase">Total Orders</p>
            <p className="text-4xl font-black mt-1">38</p>
          </div>
          <FiShoppingBag size={48} className="opacity-20 absolute -right-2 -bottom-2" />
        </div>

        {/* Delivered - Green */}
        <div className="bg-emerald-500 p-6 rounded-[2rem] shadow-lg text-white flex justify-between items-center relative overflow-hidden">
          <div>
            <p className="text-sm font-medium opacity-80 uppercase">Delivered</p>
            <p className="text-4xl font-black mt-1">0</p>
          </div>
          <FiCheckCircle size={48} className="opacity-20 absolute -right-2 -bottom-2" />
        </div>

        {/* Pending - Orange */}
        <div className="bg-orange-500 p-6 rounded-[2rem] shadow-lg text-white flex justify-between items-center relative overflow-hidden">
          <div>
            <p className="text-sm font-medium opacity-80 uppercase">Pending</p>
            <p className="text-4xl font-black mt-1">0</p>
          </div>
          <FiClock size={48} className="opacity-20 absolute -right-2 -bottom-2" />
        </div>

        {/* Avg. Order - Purple */}
        <div className="bg-purple-600 p-6 rounded-[2rem] shadow-lg text-white flex justify-between items-center relative overflow-hidden">
          <div>
            <p className="text-sm font-medium opacity-80 uppercase">Avg. Order</p>
            <p className="text-4xl font-black mt-1">₹1125</p>
          </div>
          <FiDollarSign size={48} className="opacity-20 absolute -right-2 -bottom-2" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-blue-50/40 p-6 rounded-3xl border border-blue-100 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search orders by customer, order ID, or email..." 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
            <FiFilter className="text-gray-400" /> All Status
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
            <FiCalendar className="text-gray-400" /> All Time
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-bold text-gray-400">Showing 38 of 38 orders</p>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 text-sm">
            <FiDownload /> Export Orders
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Order Details</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-5">
                  <p className="font-bold text-gray-800">{order.id}</p>
                  <p className="text-xs text-gray-400">{order.items} items</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-sm uppercase">
                      {order.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="font-black text-gray-800 text-lg">{order.amount}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-2">
                    <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 w-fit">
                      <FiClock size={12} /> {order.status}
                    </span>
                    <select className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-600 outline-none focus:ring-2 focus:ring-blue-400">
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="font-bold text-gray-700 text-sm">{order.date}</p>
                  <p className="text-[10px] text-gray-400">{order.time}</p>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-100">
                      <FiEye size={16} /> View
                    </button>
                    <button className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;