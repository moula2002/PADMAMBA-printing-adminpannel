import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSettings, 
  FiLock, 
  FiBell, 
  FiGlobe, 
  FiDatabase, 
  FiSave, 
  FiUser, 
  FiShield, 
  FiSmartphone, 
  FiCreditCard 
} from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: <FiSettings /> },
    { id: 'security', label: 'Security', icon: <FiLock /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell /> },
    { id: 'billing', label: 'Payment & Plans', icon: <FiCreditCard /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
        <p className="text-gray-500 font-medium">Configure your platform preferences and security</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-72 space-y-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-transparent'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
            >
              {activeTab === 'general' && <GeneralSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Components for Different Tabs --- */

const GeneralSettings = () => (
  <div className="p-8 space-y-8">
    <div className="flex justify-between items-center border-b border-gray-50 pb-6">
      <h2 className="text-xl font-black text-gray-800">General Information</h2>
      <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-sm">
        <FiSave /> Save Changes
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Site Name</label>
        <input type="text" defaultValue="Neuti Admin" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 font-bold text-gray-700" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Support Email</label>
        <input type="email" defaultValue="support@neuti.com" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 font-bold text-gray-700" />
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">System Language</label>
        <select className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 font-bold text-gray-700 appearance-none">
          <option>English (US)</option>
          <option>Hindi</option>
          <option>Spanish</option>
        </select>
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div className="p-8 space-y-8">
    <div className="border-b border-gray-50 pb-6">
      <h2 className="text-xl font-black text-gray-800">Security & Authentication</h2>
    </div>

    <div className="space-y-6">
      <div className="flex items-center justify-between p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-100">
            <FiShield />
          </div>
          <div>
            <p className="font-black text-gray-800">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Secure your account with 2FA.</p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
        </label>
      </div>

      <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
        <p className="font-black text-gray-800 flex items-center gap-2"><FiLock className="text-indigo-500" /> Change Password</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="password" placeholder="New Password" className="p-4 bg-white rounded-2xl border border-gray-100 outline-none" />
          <input type="password" placeholder="Confirm Password" className="p-4 bg-white rounded-2xl border border-gray-100 outline-none" />
        </div>
        <button className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors">Update Password</button>
      </div>
    </div>
  </div>
);

const NotificationSettings = () => (
  <div className="p-8 space-y-8">
    <div className="border-b border-gray-50 pb-6">
      <h2 className="text-xl font-black text-gray-800">Notification Preferences</h2>
    </div>
    
    <div className="space-y-4">
      {[
        { title: 'Order Updates', desc: 'Get notified when a new order is placed.', icon: <FiGlobe className="text-orange-500" /> },
        { title: 'New Customers', desc: 'Alert when a user registers on the platform.', icon: <FiUser className="text-blue-500" /> },
        { title: 'System Alerts', desc: 'Security and maintenance notifications.', icon: <FiSmartphone className="text-purple-500" /> }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors">
          <div className="flex items-center gap-4">
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="font-bold text-gray-800">{item.title}</p>
              <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
            </div>
          </div>
          <input type="checkbox" className="w-6 h-6 rounded-lg accent-indigo-600" defaultChecked={i !== 1} />
        </div>
      ))}
    </div>
  </div>
);

export default Settings;