import React, { useState, useEffect, useRef } from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiRefreshCw, 
  FiCamera, 
  FiX,
  FiChevronDown,
  FiUpload,
  FiCheck,
  FiFilter,
  FiImage
} from 'react-icons/fi';

const SubCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const modalRef = useRef(null);

  // Enhanced Sample Data
  const [subcategories, setSubcategories] = useState([
    { 
      id: 1, 
      name: 'Night Wears', 
      category: 'Fashion', 
      categoryId: 1,
      status: 'Active', 
      commission: '—', 
      image: null,
      description: 'Comfortable nightwear for all ages',
      products: 42,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    { 
      id: 2, 
      name: 'Men Fashion', 
      category: 'Fashion', 
      categoryId: 1,
      status: 'Active', 
      commission: '10%', 
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=300&fit=crop',
      description: 'Trendy fashion for men',
      products: 156,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    { 
      id: 3, 
      name: 'Kids Fashion', 
      category: 'Fashion', 
      categoryId: 1,
      status: 'Active', 
      commission: '10%', 
      image: 'https://images.unsplash.com/photo-1531147646552-1eec68116469?w=400&h=300&fit=crop',
      description: 'Cute and comfortable kids wear',
      products: 89,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-15'
    },
    { 
      id: 4, 
      name: 'Living Room Furniture', 
      category: 'Furniture', 
      categoryId: 2,
      status: 'Active', 
      commission: '8 ₹', 
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop',
      description: 'Modern living room furniture',
      products: 67,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-10'
    },
    { 
      id: 5, 
      name: 'Office Furniture', 
      category: 'Furniture', 
      categoryId: 2,
      status: 'Inactive', 
      commission: '12%', 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      description: 'Ergonomic office furniture',
      products: 34,
      createdAt: '2023-12-15',
      updatedAt: '2024-01-05'
    },
    { 
      id: 6, 
      name: 'Casual Wear', 
      category: 'Fashion', 
      categoryId: 1,
      status: 'Active', 
      commission: '5%', 
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop',
      description: 'Casual everyday wear',
      products: 231,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-22'
    },
  ]);

  // Categories for dropdown
  const [categories] = useState([
    { id: 1, name: 'Fashion', subcategories: 4 },
    { id: 2, name: 'Furniture', subcategories: 2 },
    { id: 3, name: 'Electronics', subcategories: 0 },
    { id: 4, name: 'Home & Kitchen', subcategories: 0 },
  ]);

  const filteredSubCategories = subcategories.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sub.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return matchesSearch && sub.status === 'Active';
    if (activeFilter === 'inactive') return matchesSearch && sub.status === 'Inactive';
    return matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    setSubcategories(prev => prev.filter(sub => sub.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleSelectSubCategory = (id) => {
    setSelectedSubCategories(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubCategories.length === filteredSubCategories.length) {
      setSelectedSubCategories([]);
    } else {
      setSelectedSubCategories(filteredSubCategories.map(sub => sub.id));
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fadeIn">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Subcategory Management
          </h1>
          <p className="text-gray-500 mt-1">Organize your products into subcategories for better navigation</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FiPlus className="text-lg" />
            Add Subcategory
          </button>
          
          <button 
            onClick={handleRefresh}
            className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FiRefreshCw className={`transition-all duration-1000 ${isRefreshing ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Subcategories', value: subcategories.length, color: 'blue', icon: '📊' },
          { title: 'Active', value: subcategories.filter(s => s.status === 'Active').length, color: 'green', icon: '✅' },
          { title: 'Total Products', value: subcategories.reduce((sum, sub) => sum + sub.products, 0), color: 'purple', icon: '📦' },
          { title: 'Categories', value: categories.length, color: 'orange', icon: '📁' }
        ].map((stat, index) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
              </div>
              <div className={`text-2xl p-3 rounded-full bg-${stat.color}-50`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-${stat.color}-500 rounded-full progress-bar`}
                style={{ 
                  width: `${(index + 1) * 25}%`,
                  animation: `progressFill 1s ease-out ${index * 0.1 + 0.5}s forwards`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100 animate-slideUp">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'inactive'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-200 hover:scale-105 active:scale-95 ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subcategories by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedSubCategories.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl mb-6 shadow-lg animate-slideDown">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiCheck className="text-xl" />
              <span className="font-semibold">
                {selectedSubCategories.length} subcategor{selectedSubCategories.length !== 1 ? 'ies' : 'y'} selected
              </span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200">
                Activate All
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200">
                Deactivate All
              </button>
              <button 
                onClick={() => {
                  setSubcategories(prev => prev.filter(sub => !selectedSubCategories.includes(sub.id)));
                  setSelectedSubCategories([]);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <FiTrash2 /> Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategories Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="px-6 py-4 font-semibold text-sm text-center w-16">
                  <button
                    onClick={handleSelectAll}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      selectedSubCategories.length === filteredSubCategories.length && filteredSubCategories.length > 0
                        ? 'bg-white border-white'
                        : 'border-white/50'
                    }`}
                  >
                    {selectedSubCategories.length === filteredSubCategories.length && filteredSubCategories.length > 0 && (
                      <FiCheck className="text-blue-500" size={12} />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 font-semibold text-sm">Image</th>
                <th className="px-6 py-4 font-semibold text-sm">Name</th>
                <th className="px-6 py-4 font-semibold text-sm">Category</th>
                <th className="px-6 py-4 font-semibold text-sm">Products</th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-sm">Commission</th>
                <th className="px-6 py-4 font-semibold text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSubCategories.map((sub, index) => (
                <tr 
                  key={sub.id} 
                  className={`hover:bg-blue-50/30 transition-all duration-200 animate-slideInLeft`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleSelectSubCategory(sub.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        selectedSubCategories.includes(sub.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {selectedSubCategories.includes(sub.id) && (
                        <FiCheck className="text-white" size={12} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center border-2 border-gray-100 overflow-hidden">
                        {sub.image ? (
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <FiImage className="text-blue-400 text-lg" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all duration-300"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-800">{sub.name}</p>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-1">{sub.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-100">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      {sub.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">{sub.products}</span>
                      </div>
                      <span className="text-gray-600 text-sm">products</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-2 transition-all duration-300 ${
                        sub.status === 'Active' 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          sub.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        {sub.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                      sub.commission === '—' 
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'
                    }`}>
                      {sub.commission}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setShowModal(true)}
                        className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:scale-110 active:scale-95 group relative"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          Edit
                        </div>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(sub.id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all duration-200 hover:scale-110 active:scale-95 group relative"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          Delete
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredSubCategories.length === 0 && (
          <div className="text-center py-12 animate-fadeIn">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No subcategories found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-modalIn">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiTrash2 className="text-red-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Subcategory</h3>
                <p className="text-gray-500">
                  Are you sure you want to delete this subcategory? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Create New Subcategory Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              ref={modalRef}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-modalIn"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Create New Subcategory</h2>
                    <p className="text-blue-100 mt-1">Add a new subcategory to organize your products</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:rotate-90"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Category Selection */}
                  <div className="animate-slideInLeft">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Select Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white appearance-none cursor-pointer">
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.subcategories} subcategories)
                          </option>
                        ))}
                      </select>
                      <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subcategory Name */}
                  <div className="animate-slideInLeft" style={{ animationDelay: '100ms' }}>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Subcategory Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter subcategory name"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Description */}
                  <div className="animate-slideInLeft" style={{ animationDelay: '150ms' }}>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe this subcategory..."
                      rows="3"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Status Toggle */}
                  <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 animate-slideInLeft" style={{ animationDelay: '200ms' }}>
                    <div>
                      <p className="font-bold text-gray-700">Active Status</p>
                      <p className="text-sm text-gray-500 mt-1">Toggle visibility on the frontend</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-green-600">Active</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>

                  {/* Commission Settings */}
                  <div className="grid grid-cols-2 gap-4 animate-slideInLeft" style={{ animationDelay: '250ms' }}>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Commission Type
                      </label>
                      <select className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white">
                        <option value="none">None</option>
                        <option value="percent">Percentage (%)</option>
                        <option value="flat">Flat Rate</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Commission Value
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="animate-slideInLeft" style={{ animationDelay: '300ms' }}>
                    <label className="block text-sm font-semibold text-gray-600 mb-3">
                      Subcategory Image
                    </label>
                    <label className="block w-full aspect-video border-3 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group">
                      <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                        <FiCamera className="text-blue-500 text-2xl" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-600 group-hover:text-blue-500 transition-colors duration-300">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Recommended: 800x600px JPG, PNG</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 hover:scale-105 active:scale-95">
                    Create Subcategory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes modalIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes progressFill {
          from { width: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-modalIn {
          animation: modalIn 0.3s ease-out forwards;
        }
        
        .progress-bar {
          width: 0;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SubCategories;