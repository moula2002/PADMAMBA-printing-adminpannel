import { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
  FiCalendar,
  FiRefreshCw,
  FiChevronUp,
  FiChevronDown
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 1248,
    totalProducts: 856,
    totalCustomers: 3421,
    totalRevenue: 89240,
    salesGrowth: 12.5,
    customerGrowth: 8.3,
    orderGrowth: 5.7,
    productGrowth: 3.2
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: "John Smith", amount: "$245.99", status: "Completed", time: "10 min ago" },
    { id: 2, customer: "Emma Johnson", amount: "$189.50", status: "Processing", time: "25 min ago" },
    { id: 3, customer: "Michael Brown", amount: "$320.75", status: "Completed", time: "1 hour ago" },
    { id: 4, customer: "Sarah Davis", amount: "$99.99", status: "Pending", time: "2 hours ago" },
    { id: 5, customer: "Robert Wilson", amount: "$450.25", status: "Completed", time: "3 hours ago" },
  ]);

  const [topProducts, setTopProducts] = useState([
    { id: 1, name: "Business Cards", sales: 342, revenue: "$2,845", growth: "+12%" },
    { id: 2, name: "Posters", sales: 287, revenue: "$3,120", growth: "+18%" },
    { id: 3, name: "Brochures", sales: 189, revenue: "$1,567", growth: "+8%" },
    { id: 4, name: "Banners", sales: 156, revenue: "$2,340", growth: "+23%" },
    { id: 5, name: "Flyers", sales: 134, revenue: "$890", growth: "+5%" },
  ]);

  const refreshData = () => {
    // Simulate data refresh
    const newData = {
      totalOrders: dashboardData.totalOrders + Math.floor(Math.random() * 50),
      totalProducts: dashboardData.totalProducts + Math.floor(Math.random() * 10),
      totalCustomers: dashboardData.totalCustomers + Math.floor(Math.random() * 30),
      totalRevenue: dashboardData.totalRevenue + Math.floor(Math.random() * 1000),
      salesGrowth: dashboardData.salesGrowth + (Math.random() * 2 - 1),
      customerGrowth: dashboardData.customerGrowth + (Math.random() * 1 - 0.5),
      orderGrowth: dashboardData.orderGrowth + (Math.random() * 1 - 0.5),
      productGrowth: dashboardData.productGrowth + (Math.random() * 1 - 0.5)
    };
    setDashboardData(newData);
  };

  useEffect(() => {
    // Auto-refresh data every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl shadow-lg">
              <MdDashboard className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
            <FiCalendar className="text-gray-500" />
            <span className="text-gray-700 font-medium">Today: {new Date().toLocaleDateString()}</span>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <FiRefreshCw className="text-lg" />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Orders Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-medium">Total Orders</p>
              <h3 className="text-3xl font-bold mt-2">{dashboardData.totalOrders.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <div className={`flex items-center ${dashboardData.orderGrowth > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {dashboardData.orderGrowth > 0 ? <FiChevronUp /> : <FiChevronDown />}
                  <span className="font-medium">{Math.abs(dashboardData.orderGrowth).toFixed(1)}%</span>
                </div>
                <span className="text-blue-200 ml-2">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiShoppingCart className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center text-blue-100">
              <FiActivity className="mr-2" />
              <span className="text-sm">24 new orders today</span>
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-100 font-medium">Total Products</p>
              <h3 className="text-3xl font-bold mt-2">{dashboardData.totalProducts.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <div className={`flex items-center ${dashboardData.productGrowth > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {dashboardData.productGrowth > 0 ? <FiChevronUp /> : <FiChevronDown />}
                  <span className="font-medium">{Math.abs(dashboardData.productGrowth).toFixed(1)}%</span>
                </div>
                <span className="text-emerald-200 ml-2">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiPackage className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center text-emerald-100">
              <FiTrendingUp className="mr-2" />
              <span className="text-sm">8 products added today</span>
            </div>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 font-medium">Total Customers</p>
              <h3 className="text-3xl font-bold mt-2">{dashboardData.totalCustomers.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <div className={`flex items-center ${dashboardData.customerGrowth > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {dashboardData.customerGrowth > 0 ? <FiChevronUp /> : <FiChevronDown />}
                  <span className="font-medium">{Math.abs(dashboardData.customerGrowth).toFixed(1)}%</span>
                </div>
                <span className="text-purple-200 ml-2">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiUsers className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center text-purple-100">
              <FiTrendingUp className="mr-2" />
              <span className="text-sm">32 new customers today</span>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-100 font-medium">Total Revenue</p>
              <h3 className="text-3xl font-bold mt-2">${dashboardData.totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center mt-2">
                <div className={`flex items-center ${dashboardData.salesGrowth > 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {dashboardData.salesGrowth > 0 ? <FiChevronUp /> : <FiChevronDown />}
                  <span className="font-medium">{Math.abs(dashboardData.salesGrowth).toFixed(1)}%</span>
                </div>
                <span className="text-amber-200 ml-2">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <FiDollarSign className="text-2xl" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center text-amber-100">
              <FiTrendingUp className="mr-2" />
              <span className="text-sm">$1,245 revenue today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart (Placeholder) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Sales Overview</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                This Month
              </button>
              <button className="px-4 py-2 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Last Month
              </button>
            </div>
          </div>
          <div className="h-80 relative">
            {/* Simulated Chart */}
            <div className="absolute inset-0 flex items-end space-x-4 p-4">
              {[65, 80, 40, 90, 55, 85, 60].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all duration-300 hover:opacity-90"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="mt-2 text-sm text-gray-600">Day {index + 1}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gray-200"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200"></div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Sales</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                <span>Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span>Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div>
                  <p className="font-medium text-gray-800">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.amount}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left pb-3 text-gray-600 font-medium">Product</th>
                  <th className="text-left pb-3 text-gray-600 font-medium">Sales</th>
                  <th className="text-left pb-3 text-gray-600 font-medium">Revenue</th>
                  <th className="text-left pb-3 text-gray-600 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mr-3">
                          <FiPackage className="text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="font-medium text-gray-700">{product.sales}</span>
                    </td>
                    <td className="py-4">
                      <span className="font-semibold text-gray-800">{product.revenue}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {product.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg. Order Value</span>
                <span className="font-bold">$128.45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Conversion Rate</span>
                <span className="font-bold">4.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Customer Satisfaction</span>
                <span className="font-bold">94.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Returning Customers</span>
                <span className="font-bold">68%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Server Uptime</span>
                  <span>99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Storage Used</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Bandwidth</span>
                  <span>56%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '56%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}