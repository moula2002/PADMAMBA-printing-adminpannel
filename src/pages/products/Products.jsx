import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Changed import
import {
  FiPackage,
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiFilter,
  FiDownload,
  FiTrendingUp,
  FiTrendingDown,
  FiShoppingCart,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
  FiGrid,
  FiList
} from "react-icons/fi";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, name: "Premium Business Cards", category: "Business Cards", price: 49.99, stock: 156, status: "In Stock", sales: 342, image: "📇" },
    { id: 2, name: "Large Format Posters", category: "Posters", price: 29.99, stock: 89, status: "Low Stock", sales: 287, image: "🖼️" },
    { id: 3, name: "Glossy Brochures", category: "Brochures", price: 19.99, stock: 234, status: "In Stock", sales: 189, image: "📰" },
    { id: 4, name: "Vinyl Banners", category: "Banners", price: 89.99, stock: 45, status: "Low Stock", sales: 156, image: "🚩" },
    { id: 5, name: "Flyers (500pcs)", category: "Flyers", price: 129.99, stock: 0, status: "Out of Stock", sales: 134, image: "📢" },
    { id: 6, name: "Letterheads", category: "Stationery", price: 24.99, stock: 178, status: "In Stock", sales: 98, image: "📝" },
    { id: 7, name: "Invitation Cards", category: "Cards", price: 14.99, stock: 67, status: "Low Stock", sales: 156, image: "💌" },
    { id: 8, name: "Sticker Sheets", category: "Stickers", price: 9.99, stock: 312, status: "In Stock", sales: 245, image: "🏷️" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0
  });

  const categories = ["All", "Business Cards", "Posters", "Brochures", "Banners", "Flyers", "Stationery", "Cards", "Stickers"];

  useEffect(() => {
    // Calculate stats
    const total = products.length;
    const inStock = products.filter(p => p.status === "In Stock").length;
    const lowStock = products.filter(p => p.status === "Low Stock").length;
    const outOfStock = products.filter(p => p.status === "Out of Stock").length;
    
    setStats({
      totalProducts: total,
      inStock,
      lowStock,
      outOfStock
    });

    // Filter products
    let filtered = products;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-800";
      case "Low Stock": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Stock": return <FiCheckCircle className="text-green-500" />;
      case "Low Stock": return <FiAlertCircle className="text-yellow-500" />;
      default: return <FiAlertCircle className="text-red-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiPackage className="mr-3 text-blue-600" />
            Products Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your printing products, inventory, and catalog</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <FiDownload />
            <span>Export</span>
          </button>
          <button
            onClick={handleRefreshData}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <FiRefreshCw className="animate-spin" />
            ) : (
              <FiRefreshCw />
            )}
            <span>Refresh</span>
          </button>
          <button 
            onClick={handleAddProduct}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2"
          >
            <FiPlus />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-medium">Total Products</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalProducts}</h3>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-green-300">
                  <FiTrendingUp className="mr-1" />
                  <span className="font-medium">+12%</span>
                </div>
                <span className="text-blue-200 ml-2">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiPackage className="text-2xl" />
            </div>
          </div>
        </div>

        {/* In Stock Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 font-medium">In Stock</p>
              <h3 className="text-3xl font-bold mt-2">{stats.inStock}</h3>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-green-300">
                  <FiCheckCircle className="mr-1" />
                  <span className="font-medium">Available</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiCheckCircle className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Low Stock Card */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-yellow-100 font-medium">Low Stock</p>
              <h3 className="text-3xl font-bold mt-2">{stats.lowStock}</h3>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-yellow-300">
                  <FiAlertCircle className="mr-1" />
                  <span className="font-medium">Needs Restock</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiAlertCircle className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Out of Stock Card */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-red-100 font-medium">Out of Stock</p>
              <h3 className="text-3xl font-bold mt-2">{stats.outOfStock}</h3>
              <div className="flex items-center mt-2">
                <div className="flex items-center text-red-300">
                  <FiAlertCircle className="mr-1" />
                  <span className="font-medium">Urgent</span>
                </div>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiShoppingCart className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <FiFilter className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              >
                <FiGrid className="text-lg" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${viewMode === "list" ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              >
                <FiList className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table/Grid */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Product Catalog ({filteredProducts.length} items)
            </h3>
            <div className="text-sm text-gray-500">
              Sorted by: <span className="font-medium text-gray-700">Most Popular</span>
            </div>
          </div>
        </div>

        {/* Products Grid/Table */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex flex-col h-full">
                  {/* Product Image/Icon */}
                  <div className="flex items-center justify-center h-32 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-4xl">{product.image}</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h4>
                      <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{product.category}</span>
                      <div className="flex items-center">
                        <FiShoppingCart className="mr-1" />
                        <span>{product.sales} sales</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium">Stock: {product.stock} units</span>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(product.status)}`}>
                        {getStatusIcon(product.status)}
                        <span className="ml-1">{product.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                      <FiEye />
                      <span>View</span>
                    </button>
                    <button className="flex-1 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center space-x-2">
                      <FiEdit2 />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 text-gray-600 font-medium">Product</th>
                  <th className="text-left p-6 text-gray-600 font-medium">Category</th>
                  <th className="text-left p-6 text-gray-600 font-medium">Price</th>
                  <th className="text-left p-6 text-gray-600 font-medium">Stock</th>
                  <th className="text-left p-6 text-gray-600 font-medium">Status</th>
                  <th className="text-left p-6 text-gray-600 font-medium">Sales</th>
                  <th className="text-left p-6 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <td className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center">
                          <span className="text-xl">{product.image}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-500">SKU: PROD-{product.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className="font-bold text-gray-800">${product.price}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${product.stock > 100 ? 'bg-green-500' : product.stock > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(product.stock, 200) / 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">{product.stock}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className={`px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center ${getStatusColor(product.status)}`}>
                        {getStatusIcon(product.status)}
                        <span className="ml-1">{product.status}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center">
                        <FiShoppingCart className="mr-2 text-gray-500" />
                        <span className="font-medium">{product.sales}</span>
                        {product.sales > 200 ? (
                          <FiTrendingUp className="ml-2 text-green-500" />
                        ) : (
                          <FiTrendingDown className="ml-2 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex space-x-2">
                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                          <FiEye />
                        </button>
                        <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">1-{filteredProducts.length}</span> of{" "}
          <span className="font-semibold">{products.length}</span> products
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            2
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            3
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Next
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-4">Inventory Overview</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-300 mb-2">Total Inventory Value</p>
              <p className="text-2xl font-bold">$24,856.30</p>
            </div>
            <div>
              <p className="text-gray-300 mb-2">Average Price</p>
              <p className="text-2xl font-bold">$34.99</p>
            </div>
            <div>
              <p className="text-gray-300 mb-2">Top Selling Category</p>
              <p className="text-xl font-bold">Business Cards</p>
            </div>
            <div>
              <p className="text-gray-300 mb-2">Low Stock Items</p>
              <p className="text-xl font-bold text-yellow-300">{stats.lowStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={handleAddProduct}
              className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-between"
            >
              <span>Add New Product</span>
              <FiPlus />
            </button>
            <button className="w-full px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-between">
              <span>Update Stock Levels</span>
              <FiRefreshCw />
            </button>
            <button className="w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors flex items-center justify-between">
              <span>Export Product List</span>
              <FiDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}