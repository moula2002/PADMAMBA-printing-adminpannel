import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiUser, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiLayers,
  FiFolder,
  FiGrid,
  FiTag,
  FiImage,
  FiMenu,
  FiPlus,
  FiX
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

export default function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { path: "/", label: "Dashboard", icon: <MdDashboard className="text-xl" /> },
    { path: "/products", label: "Products", icon: <FiPackage className="text-xl" /> },
     { path: "/add-product", label: "Add Product", icon: <FiPlus className="text-xl" /> },
    { path: "/category", label: "Category", icon: <FiLayers className="text-xl" /> },
    { path: "/sub-category", label: "Sub-Category", icon: <FiFolder className="text-xl" /> },
    { path: "/sub-undercategory", label: "Sub-undercategory", icon: <FiGrid className="text-xl" /> },
    { path: "/brands", label: "Brands", icon: <FiTag className="text-xl" /> },
    { path: "/orders", label: "Orders", icon: <FiShoppingCart className="text-xl" /> },
    { path: "/customers", label: "Customers", icon: <FiUsers className="text-xl" /> },
    { path: "/users", label: "Users", icon: <FiUser className="text-xl" /> },
    { path: "/posters", label: "Posters", icon: <FiImage className="text-xl" /> },
    { path: "/setting", label: "Settings", icon: <FiSettings className="text-xl" /> },
  ];

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Mobile Menu Toggle Button (Visible only on small screens) */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-[60] bg-yellow-500 p-3 rounded-xl text-white shadow-lg active:scale-95 transition-transform"
      >
        {isMobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>

      {/* Mobile Overlay/Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-[50]
        md:sticky md:top-0
        h-screen
        overflow-y-auto
        bg-gradient-to-b from-gray-900 to-black
        text-white
        p-5
        transition-all duration-300 ease-in-out
        shadow-2xl
        border-r border-gray-800
        ${isExpanded ? 'w-64' : 'w-20'}
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Toggle Button (Desktop Only) */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            hidden md:block
            absolute -right-0 top-15
            bg-gradient-to-r from-yellow-500 to-orange-500
            p-2 rounded-full
            shadow-lg
            hover:scale-110
            hover:shadow-yellow-500/25
            transition-all duration-300
            z-10
          "
        >
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </button>

        {/* Logo/Header */}
        <div className="flex items-center space-x-3 mb-8 mt-12 md:mt-0">
          <div className="
            bg-gradient-to-r from-yellow-500 to-orange-500
            p-2 rounded-lg
            shadow-lg
            animate-pulse
          ">
            <FiPackage className="text-2xl" />
          </div>
          {(isExpanded || isMobileOpen) && (
            <h1 className="
              text-2xl font-bold
              bg-gradient-to-r from-yellow-400 to-orange-400
              bg-clip-text text-transparent
            ">
              PrintAdmin
            </h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)} // Close menu on link click (mobile)
                className={`
                  flex items-center space-x-3
                  p-3 rounded-xl
                  transition-all duration-300 ease-in-out
                  relative
                  overflow-hidden
                  group
                  ${isActive 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-l-4 border-yellow-500' 
                    : 'hover:bg-gray-800/50'
                  }
                `}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Animated Background Effect */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-r from-yellow-500/10 to-transparent
                  transition-transform duration-500 ease-out
                  ${hoveredItem === item.path ? 'translate-x-0' : '-translate-x-full'}
                `} />
                
                {/* Icon */}
                <div className={`
                  relative z-10
                  transition-all duration-300
                  ${isActive 
                    ? 'text-yellow-500 transform scale-110' 
                    : 'text-gray-300 group-hover:text-yellow-400'
                  }
                  ${(!isExpanded && !isMobileOpen) && 'mx-auto'}
                `}>
                  {item.icon}
                </div>
                
                {/* Label */}
                {(isExpanded || isMobileOpen) && (
                  <span className="
                    relative z-10
                    font-medium
                    transition-all duration-300
                    group-hover:translate-x-2
                  ">
                    {item.label}
                  </span>
                )}
                
                {/* Active Indicator Dot */}
                {isActive && (isExpanded || isMobileOpen) && (
                  <div className="
                    absolute right-3
                    w-2 h-2
                    bg-yellow-500
                    rounded-full
                    animate-ping
                  " />
                )}
                
                {/* Tooltip (Only for collapsed Desktop state) */}
                {!isExpanded && !isMobileOpen && (
                  <div className="
                    hidden md:block
                    absolute left-full ml-3
                    px-3 py-2
                    bg-gray-900
                    rounded-lg
                    shadow-xl
                    text-sm
                    whitespace-nowrap
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    z-50
                    pointer-events-none
                  ">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}