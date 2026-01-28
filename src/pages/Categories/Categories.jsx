import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiRefreshCw, 
  FiCamera, 
  FiX,
  FiChevronRight,
  FiCheck,
  FiUpload,
  FiFilter
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced Sample Data
  const [categories, setCategories] = useState([
    { 
      id: '1DPaX1rSWC4ksaoom1a3', 
      name: 'Seeds', 
      commission: '0%', 
      status: 'Active', 
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=100&h=100&fit=crop',
      description: 'Planting seeds and gardening supplies',
      createdAt: '2024-01-15',
      products: 42,
      subcategories: ['Flower Seeds', 'Vegetable Seeds', 'Herb Seeds']
    },
    { 
      id: 'KzQjotWVAdvpdqAhcjfC', 
      name: 'Accessories', 
      commission: '5%', 
      status: 'Active', 
      image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=100&h=100&fit=crop',
      description: 'Electronic accessories and gadgets',
      createdAt: '2024-01-10',
      products: 128,
      subcategories: ['Phone Cases', 'Chargers', 'Headphones']
    },
    { 
      id: 'NdgRgL6pyOg2fpjKi8GT', 
      name: 'Fashion', 
      commission: '12%', 
      status: 'Active', 
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop',
      description: 'Clothing and fashion items',
      createdAt: '2024-01-05',
      products: 356,
      subcategories: ['Men', 'Women', 'Kids']
    },
    { 
      id: 'ciT6CngKlNQT39UdlUsJ', 
      name: 'Toys', 
      commission: '8%', 
      status: 'Inactive', 
      image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?w=100&h=100&fit=crop',
      description: 'Toys and games for all ages',
      createdAt: '2024-01-01',
      products: 89,
      subcategories: ['Educational', 'Outdoor', 'Puzzles']
    },
    { 
      id: 'abc123def456', 
      name: 'Home & Kitchen', 
      commission: '10%', 
      status: 'Active', 
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100&h=100&fit=crop',
      description: 'Home appliances and kitchenware',
      createdAt: '2024-01-20',
      products: 215,
      subcategories: ['Cookware', 'Furniture', 'Decor']
    },
    { 
      id: 'xyz789uvw456', 
      name: 'Books', 
      commission: '3%', 
      status: 'Active', 
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=100&fit=crop',
      description: 'Books and educational materials',
      createdAt: '2024-01-18',
      products: 542,
      subcategories: ['Fiction', 'Non-Fiction', 'Educational']
    },
  ]);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return matchesSearch && category.status === 'Active';
    if (activeFilter === 'inactive') return matchesSearch && category.status === 'Inactive';
    return matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleDeleteCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const handleSelectCategory = (id) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(catId => catId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === filteredCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(filteredCategories.map(cat => cat.id));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-6">
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Category Management
          </h1>
          <p className="text-gray-500 mt-1">Organize your products with categories and set commission rates</p>
        </div>
        
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            <FiPlus className="text-lg" />
            Add Category
          </motion.button>
          
          <motion.button 
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
          >
            <FiRefreshCw className={`transition-transform duration-1000 ${isRefreshing ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { title: 'Total Categories', value: categories.length, color: 'blue', icon: '📊' },
          { title: 'Active', value: categories.filter(c => c.status === 'Active').length, color: 'green', icon: '✅' },
          { title: 'Total Products', value: categories.reduce((sum, cat) => sum + cat.products, 0), color: 'purple', icon: '📦' },
          { title: 'Avg Commission', value: '6.5%', color: 'orange', icon: '💰' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
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
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(index + 1) * 25}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-${stat.color}-500 rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'active', 'inactive'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto flex-1 max-w-md">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl mb-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiCheck className="text-xl" />
              <span className="font-semibold">
                {selectedCategories.length} category{selectedCategories.length !== 1 ? 'ies' : ''} selected
              </span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                Activate All
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                Deactivate All
              </button>
              <button 
                onClick={() => {
                  setCategories(prev => prev.filter(cat => !selectedCategories.includes(cat.id)));
                  setSelectedCategories([]);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2"
              >
                <FiTrash2 /> Delete Selected
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Categories Grid */}
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelectCategory(category.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedCategories.includes(category.id)
                        ? 'bg-blue-500 border-blue-500'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    {selectedCategories.includes(category.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white"
                      >
                        <FiCheck size={12} />
                      </motion.div>
                    )}
                  </motion.button>
                </div>
                
                <div className="h-48 bg-gradient-to-r from-blue-100 to-indigo-100 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    category.status === 'Active' 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {category.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg font-bold">
                    {category.commission}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Products</p>
                    <p className="font-bold text-gray-800">{category.products}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Subcategories</p>
                    <p className="font-bold text-gray-800">{category.subcategories.length}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Subcategories</p>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 2).map((sub, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{category.subcategories.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button className="text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1">
                    View Details <FiChevronRight />
                  </button>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <FiEdit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiSearch className="text-3xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Create New Category Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Create New Category</h2>
                    <p className="text-blue-100 mt-1">Add a new product category to your store</p>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-8">
                  {/* Media Section */}
                  <motion.section
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="font-bold text-gray-700 mb-4 text-lg">Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <ImageUploadCard label="Main Image" description="Recommended: 800x600px" />
                      <ImageUploadCard label="Banner" description="Recommended: 1200x400px" />
                      <ImageUploadCard label="Icon" description="Recommended: 100x100px" />
                    </div>
                  </motion.section>

                  {/* Details Section */}
                  <motion.section
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    <h3 className="font-bold text-gray-700 mb-4 text-lg">Category Details</h3>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Category Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Electronics, Fashion, Home Decor"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe this category..."
                        rows="3"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl">
                      <div>
                        <p className="font-bold text-gray-700">Active Status</p>
                        <p className="text-sm text-gray-500">Toggle visibility on the frontend</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                        <span className="ml-3 text-sm font-bold text-green-600">Active</span>
                      </label>
                    </div>
                  </motion.section>

                  {/* Commission Section */}
                  <motion.section
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="font-bold text-gray-700 mb-4 text-lg">Commission Setup</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Commission Type
                        </label>
                        <select className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                          <option>Percentage (%)</option>
                          <option>Flat Rate</option>
                          <option>Tiered Commission</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">
                          Commission Value <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
                          />
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* Attributes Section */}
                  <motion.section
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="font-bold text-gray-700 mb-4 text-lg">Required Attributes</h3>
                    <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                      <p className="text-gray-500 text-center mb-4">No attributes added yet</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type attribute (e.g., Color, Size, RAM)"
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Add
                        </motion.button>
                      </div>
                    </div>
                  </motion.section>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-8 bg-gray-50">
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
                  >
                    Create Category
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Image Upload Component
const ImageUploadCard = ({ label, description }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="flex flex-col items-center gap-3"
  >
    <p className="text-sm font-semibold text-gray-600">{label}</p>
    <label className="w-full aspect-video border-3 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group">
      <div className="p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
        <FiUpload className="text-blue-500 text-xl" />
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-500 group-hover:text-blue-500">
          Click to upload
        </p>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
      <input type="file" className="hidden" />
    </label>
  </motion.div>
);

export default Categories;