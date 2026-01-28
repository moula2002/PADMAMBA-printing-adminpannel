import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiUserPlus, 
  FiRefreshCw, 
  FiShield, 
  FiMoreVertical, 
  FiTrash2, 
  FiEdit3, 
  FiCheckCircle, 
  FiMail, 
  FiKey
} from 'react-icons/fi';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sample Admin/Staff Data
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@neutiaa.com', role: 'Super Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Support Team', email: 'support@neutiaa.com', role: 'Editor', status: 'Active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Manager', email: 'manager@neutiaa.com', role: 'Manager', status: 'Inactive', lastLogin: '1 day ago' },
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header with Fade-in Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end mb-8"
      >
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Users</h1>
          <p className="text-gray-500 font-medium">Manage administrative access and permissions</p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-3 bg-white border border-gray-200 rounded-2xl text-gray-600 shadow-sm"
          >
            <FiRefreshCw className={isRefreshing ? "animate-spin" : ""} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-indigo-100"
          >
            <FiUserPlus size={20} /> Create User
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards - Inspired by */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Admins', value: '3', color: 'blue', icon: <FiShield /> },
          { label: 'Verified', value: '2', color: 'green', icon: <FiCheckCircle /> },
          { label: 'Access Keys', value: '12', color: 'purple', icon: <FiKey /> }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            </div>
            <div className={`w-14 h-14 bg-${stat.color}-50 text-${stat.color}-500 rounded-2xl flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search Bar - Inspired by */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative mb-8"
      >
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input 
          type="text" 
          placeholder="Search by name, email or role..." 
          className="w-full pl-14 pr-6 py-5 rounded-[2rem] border-none shadow-sm focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase">Identity</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase">Role</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <AnimatePresence>
              {users.map((user, idx) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-100">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-gray-800">{user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                          <FiMail size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                        <FiEdit3 size={18} />
                      </button>
                      <button className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;