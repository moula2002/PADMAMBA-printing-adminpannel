import React, { useState } from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiRefreshCw, 
  FiFilter, 
  FiTag, 
  FiLayers, 
  FiDownload, 
  FiChevronLeft, 
  FiChevronRight,
  FiX
} from 'react-icons/fi';

const Brands = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Data derived from
  const [brands] = useState([
    { id: 'ub3SSXyF...', name: 'Jockey', subcategory: 'Women Fashion', status: 'Active' },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
          <p className="text-gray-500 text-sm">Manage and organize your product brands</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-1 rounded-xl border border-blue-50 flex flex-col items-center">
             <span className="text-[10px] font-bold text-blue-400 uppercase">Total Brands</span>
             <span className="text-xl font-black text-gray-800">1</span>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all font-bold shadow-lg shadow-indigo-100"
          >
            <FiPlus size={20} /> Add New Brand
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Brands</p>
            <p className="text-2xl font-black text-gray-800">1</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 border border-green-100">
            <FiTag size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Subcategories</p>
            <p className="text-2xl font-black text-gray-800">14</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 border border-blue-100">
            <FiLayers size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Showing</p>
            <p className="text-2xl font-black text-gray-800">1</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 border border-purple-100">
            <FiFilter size={24} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-blue-50/40 p-6 rounded-3xl border border-blue-100 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search brands by name..." 
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
            <FiFilter className="text-gray-400" /> All Subcategories
          </button>
          <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50">
            All Status
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 text-sm">
            <FiRefreshCw /> Refresh Data
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 text-sm">
            <FiDownload /> Export Brands
          </button>
        </div>
      </div>

      {/* Brand Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Brand</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subcategory</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-100">
                      {brand.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{brand.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">ID: {brand.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 w-fit border border-blue-100">
                    <FiLayers size={12} /> {brand.subcategory}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> {brand.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-100">
                      <FiEdit size={14} /> Edit
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-500 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors border border-red-100">
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50/30 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400">Showing 1 of 1 brands</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-400 font-bold text-xs cursor-not-allowed">
              Previous
            </button>
            <button className="w-8 h-8 bg-indigo-600 text-white rounded-lg font-bold text-xs">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 font-bold text-xs hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Create New Brand Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-gray-800">Create New Brand</h2>
                <p className="text-gray-400 text-sm mt-1">Add a new brand to your catalog</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 pt-2 space-y-6">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Subcategory</label>
                <select className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-400/10 focus:border-indigo-400 bg-white transition-all appearance-none cursor-pointer font-bold text-gray-500">
                  <option>Select a subcategory</option>
                  <option>Women Fashion</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Brand Name</label>
                <input 
                  type="text" 
                  placeholder="Enter brand name" 
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-400/10 focus:border-indigo-400 transition-all font-bold placeholder-gray-300"
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input 
                  type="checkbox" 
                  id="active" 
                  defaultChecked 
                  className="w-5 h-5 rounded border-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="active" className="text-sm font-bold text-gray-700 cursor-pointer">Brand is active</label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-0 flex gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:opacity-95 transition-all active:scale-95">
                Create Brand
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;