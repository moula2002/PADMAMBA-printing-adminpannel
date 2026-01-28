import React, { useState } from 'react';
import { 
  FiSearch, 
  FiRefreshCw, 
  FiFilter, 
  FiDownload, 
  FiUserCheck, 
  FiUserMinus, 
  FiUsers, 
  FiMail, 
  FiSlash 
} from 'react-icons/fi';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Data derived from design
  const [customers] = useState([
    { 
      id: '341SL2IjYUWW...', 
      name: 'Paramesh', 
      email: 'Parameshparmi46@gmail.com', 
      joinedDate: '1/28/2026', 
      status: 'Active' 
    },
    { 
      id: 'odEXLvhSggUk...', 
      name: 'sundalman', 
      email: 'sundalman@gmail.com', 
      joinedDate: '1/28/2026', 
      status: 'Active' 
    },
    { 
      id: 'tjK080aIbuPP...', 
      name: 'spider man', 
      email: 'sm5042410@gmail.com', 
      joinedDate: '1/28/2026', 
      status: 'Active' 
    },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-500 text-sm">Manage and monitor your customer accounts</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-blue-50 px-4 py-1.5 rounded-xl border border-blue-100 flex flex-col items-center">
             <span className="text-[10px] font-bold text-blue-400 uppercase">Total Customers</span>
             <span className="text-xl font-black text-gray-800">3</span>
          </div>
          <button className="p-3 border rounded-xl bg-white text-gray-600 hover:bg-gray-100 shadow-sm flex items-center gap-2 font-bold text-sm transition-colors">
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-blue-50/40 p-6 rounded-3xl border border-blue-100 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers by name, email, or ID..." 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 shadow-sm">
            <FiFilter className="text-gray-400" /> All Status
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 shadow-sm">
            <FiDownload className="text-gray-400" /> Export
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Users</p>
            <p className="text-2xl font-black text-gray-800">3</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 border border-green-100">
            <FiUserCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Blocked Users</p>
            <p className="text-2xl font-black text-gray-800">0</p>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-400 border border-red-100">
            <FiUserMinus size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Showing</p>
            <p className="text-2xl font-black text-gray-800">3</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 border border-blue-100">
            <FiUsers size={24} />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm uppercase shadow-md shadow-indigo-100">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">Joined {user.joinedDate}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <FiMail className="text-gray-300" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border border-green-100">
                    <FiUserCheck size={12} /> {user.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 inline-block">
                    <span className="text-xs font-mono text-gray-400">{user.id}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl font-bold text-xs hover:bg-red-100 transition-colors border border-red-100 ml-auto shadow-sm">
                    <FiSlash size={14} /> Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;