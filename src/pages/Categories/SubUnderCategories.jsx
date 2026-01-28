import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiRefreshCw, 
  FiCamera, 
  FiX 
} from 'react-icons/fi';

const SubUnderCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Data derived from
  const [data] = useState([
    { id: '0jp40rgkmtwopjso53z4', name: 'Gowns', status: 'Active', sortOrder: 0, commission: '—', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=50&h=50&fit=crop' },
    { id: '49d6vzF63MkHl5I1tsYm', name: 'Men Innerwear', status: 'Active', sortOrder: 0, commission: '10%', image: 'https://images.unsplash.com/photo-1582844244671-a5490e3d5442?w=50&h=50&fit=crop' },
    { id: '5qimNwLBHkY9LHQH4AMr', name: 'Womens Dress', status: 'Active', sortOrder: 0, commission: '—', image: 'https://images.unsplash.com/photo-1539008835279-43467f2f2cf3?w=50&h=50&fit=crop' },
    { id: '7CNTmOy1RBtkPIVpUEgT', name: 'Men footwear', status: 'Active', sortOrder: 0, commission: '—', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop' },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sub Under Category Management</h1>
          <p className="text-gray-500 text-sm">Manage your product sub under categories</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all font-semibold shadow-sm"
          >
            <FiPlus /> Add Sub Under Category
          </button>
          <button className="p-2.5 border rounded-xl bg-white text-gray-600 hover:bg-gray-100 shadow-sm border-gray-200">
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* Stats and Search Area */}
      <div className="bg-blue-50/50 p-6 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-blue-100 min-w-[180px]">
            <p className="text-blue-600 font-black text-2xl">20</p>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Sub Under Categories</p>
          </div>
          <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-green-100 min-w-[100px]">
            <p className="text-green-600 font-black text-2xl">20</p>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active</p>
          </div>
        </div>

        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 text-xl" />
          <input 
            type="text" 
            placeholder="Search sub under category..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition-all bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Management Table */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest">Name</th>
              <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest">Document ID</th>
              <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-center">Sort Order</th>
              <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest">Commission</th>
              <th className="px-6 py-5 font-bold text-xs uppercase tracking-widest text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover border border-gray-100 shadow-sm" />
                    <span className="font-bold text-gray-700">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs font-mono">{item.id}</td>
                <td className="px-6 py-4">
                  <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-black">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-purple-50 text-purple-600 w-8 h-8 inline-flex items-center justify-center rounded-full text-xs font-black">
                    {item.sortOrder}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black ${item.commission === '—' ? 'text-gray-300' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    {item.commission}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="p-2.5 bg-blue-50 text-blue-500 rounded-xl hover:bg-blue-100 transition-colors border border-blue-100 shadow-sm">
                      <FiEdit size={18} />
                    </button>
                    <button className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors border border-red-100 shadow-sm">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex justify-between items-center shadow-lg">
              <h2 className="text-xl font-black">Add Sub Under Category</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="hover:bg-white/20 p-2 rounded-xl transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-8 overflow-y-auto space-y-6">
              
              {/* Image Upload Section */}
              <div>
                <label className="text-sm font-black text-gray-700 block mb-3 uppercase tracking-tight">Image</label>
                <label className="w-full h-44 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all group border-spacing-4">
                  <FiCamera className="text-blue-500 text-3xl group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-gray-400 tracking-wide">Upload Image</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* Selection Section */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-black text-gray-700 block mb-2 uppercase tracking-tight">Category *</label>
                  <select className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-400/10 focus:border-blue-400 bg-white transition-all appearance-none cursor-pointer font-bold text-gray-600">
                    <option value="">Select Category</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-black text-gray-700 block mb-2 uppercase tracking-tight">Sub Category *</label>
                  <select className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-400/10 focus:border-blue-400 bg-white transition-all appearance-none cursor-pointer font-bold text-gray-600">
                    <option value="">Select Sub Category</option>
                  </select>
                </div>
              </div>

              {/* Name and Status Section */}
              <div>
                <label className="text-sm font-black text-gray-700 block mb-2 uppercase tracking-tight">Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter sub under category name" 
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-400/10 focus:border-blue-400 transition-all font-bold placeholder-gray-300"
                />
              </div>

              <div className="flex justify-between items-center bg-blue-50/40 p-5 rounded-3xl border border-blue-100">
                <p className="font-black text-gray-700 text-sm tracking-wide">Active Status</p>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-black text-green-600 uppercase">Active</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              {/* Commission and Sort Section */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="text-sm font-black text-gray-700 block mb-2 uppercase tracking-tight">Sort Order *</label>
                  <input type="number" defaultValue="0" className="w-full p-4 border-2 border-gray-100 rounded-2xl font-bold" />
                </div>
                <div>
                  <label className="text-sm font-black text-gray-700 block mb-2 uppercase tracking-tight">Commission Type</label>
                  <select className="w-full p-4 border-2 border-gray-100 rounded-2xl font-bold">
                    <option>Percent</option>
                    <option>Flat</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-black text-gray-700 block mb-2 uppercase tracking-tight">Commission Value</label>
                  <input type="number" defaultValue="0" className="w-full p-4 border-2 border-gray-100 rounded-2xl font-bold" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-gray-50 flex gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 bg-white border-2 border-gray-100 rounded-2xl font-black text-gray-500 hover:bg-gray-100 transition-all shadow-sm"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:scale-[1.02] transition-all active:scale-95">
                Create Sub Under Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubUnderCategories;