import React, { useState } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiRefreshCw, 
  FiFilter, 
  FiEye, 
  FiEdit, 
  FiTrash2, 
  FiCalendar,
  FiX,
  FiUpload
} from 'react-icons/fi';

const Posters = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data derived from design
  const [posters] = useState([
    {
      id: 1,
      title: 'demo1',
      description: 'No description provided',
      date: 'Invalid Date',
      status: 'inactive',
      imageUrl: 'https://via.placeholder.com/300x200?text=Neuti' // Placeholder for the Neuti logo
    }
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Poster Manager</h1>
        <p className="text-gray-500 text-sm">Manage and organize your poster collection</p>
      </div>

      {/* Filter & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-1 items-center gap-4 min-w-[300px]">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search posters..." 
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-black bg-gray-50/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
            <FiFilter size={20} />
          </button>
          <select className="bg-transparent font-bold text-gray-700 outline-none cursor-pointer">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
            <FiRefreshCw size={20} />
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <FiPlus size={20} /> Add New Poster
          </button>
        </div>
      </div>

      {/* Poster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posters.map((poster) => (
          <div key={poster.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
              <img 
                src={poster.imageUrl} 
                alt={poster.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 right-4 bg-gray-100/90 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full text-gray-600 uppercase tracking-wider">
                {poster.status}
              </span>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-black text-gray-800 mb-1">{poster.title}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-1">{poster.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                  <FiCalendar /> {poster.date}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <FiEye size={16} />
                  </button>
                  <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-100">
                    <FiEdit size={16} />
                  </button>
                  <button className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors border border-red-100">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Poster Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-8 pb-4 flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-800">Add New Poster</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 pt-2 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Poster Title</label>
                <input 
                  type="text" 
                  placeholder="Enter poster title..." 
                  className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-black transition-all bg-gray-50/30"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Sub-Contents (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Enter a short description or key points..." 
                  className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-black transition-all bg-gray-50/30 resize-none"
                ></textarea>
                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tight">Add additional details about this poster</p>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Image File</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/30 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-black mb-3 transition-colors">
                    <FiUpload size={24} />
                  </div>
                  <span className="text-sm font-bold text-gray-500">Choose File</span>
                  <span className="text-xs text-gray-400 mt-1">No file chosen</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Or enter image URL:</label>
                <input 
                  type="text" 
                  placeholder="https://example.com/image.jpg" 
                  className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:border-black transition-all bg-gray-50/30"
                />
              </div>

              {/* Status Selector */}
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-3">Status</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="status" defaultChecked className="w-5 h-5 accent-black" />
                    <span className="text-sm font-bold text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="status" className="w-5 h-5 accent-black" />
                    <span className="text-sm font-bold text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 pt-4 border-t border-gray-50 flex gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-4 bg-gray-50 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button className="flex-1 py-4 bg-gray-600 text-white rounded-2xl font-bold shadow-xl shadow-gray-100 hover:bg-gray-700 transition-all active:scale-95">
                Create Poster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posters;