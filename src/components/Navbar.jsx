import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiLogOut, FiUser, FiBell, FiSearch, FiSettings, FiChevronDown, FiX } from "react-icons/fi";
import { BiPrinter } from "react-icons/bi";

export default function Navbar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const modalRef = useRef(null);
  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const notifications = [
    { id: 1, text: "New order received #ORD-2024-001", time: "2 min ago" },
    { id: 2, text: "Low stock alert: A4 Paper", time: "1 hour ago" },
    { id: 3, text: "System update scheduled", time: "2 hours ago" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) setShowLogoutModal(false);
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) setShowProfileMenu(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLogin");
    navigate("/login");
  };

  const clearNotifications = () => {
    setNotificationCount(0);
    setShowNotifications(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setIsSearchActive(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-black text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-xl border-b border-gray-800 sticky top-0 z-50">
        
        {/* Left Section - Logo (Hidden when mobile search is active) */}
        {!isSearchActive && (
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
              <BiPrinter className="text-xl md:text-2xl" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                PrintAdmin
              </h1>
              <p className="hidden md:block text-[10px] text-gray-400 uppercase tracking-widest">Panel</p>
            </div>
          </div>
        )}

        {/* Center Section - Search Bar */}
        <div className={`flex-1 transition-all duration-300 ${isSearchActive ? 'mx-0' : 'mx-2 md:mx-10'}`}>
          <form onSubmit={handleSearch} className="relative w-full flex items-center">
            {/* Desktop Search & Active Mobile Search */}
            <div className={`relative w-full transition-all duration-300 ${isSearchActive ? 'flex' : 'hidden md:flex'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search orders, clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setIsSearchActive(false)}
                className="block w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder-gray-500"
              />
              {isSearchActive && (
                <button 
                  type="button" 
                  onClick={() => { setIsSearchActive(false); setSearchQuery(""); }}
                  className="md:hidden ml-2 p-2 text-gray-400"
                >
                  <FiX className="text-2xl" />
                </button>
              )}
            </div>

            {/* Mobile Search Icon (Trigger) */}
            {!isSearchActive && (
              <button 
                type="button" 
                onClick={() => setIsSearchActive(true)}
                className="md:hidden p-2.5 bg-gray-800/50 rounded-full ml-auto border border-gray-700 active:scale-90 transition-transform"
              >
                <FiSearch className="text-lg text-gray-300" />
              </button>
            )}
          </form>
        </div>

        {/* Right Section - Actions (Hidden when mobile search is active) */}
        {!isSearchActive && (
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-full bg-gray-800/30 hover:bg-gray-700/50 transition-all relative border border-transparent hover:border-gray-700"
              >
                <FiBell className="text-xl text-gray-300" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-500 text-[10px] text-black font-bold flex items-center justify-center rounded-full border-2 border-black animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-[-50px] md:right-0 mt-3 w-72 md:w-80 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden animate-fadeIn z-[60]">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
                    <h3 className="font-bold text-sm">Alerts</h3>
                    <button onClick={clearNotifications} className="text-[10px] text-yellow-500 font-bold uppercase">Clear All</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-4 border-b border-gray-800/50 hover:bg-gray-800/80 transition-colors cursor-pointer">
                        <p className="text-sm text-gray-300">{notif.text}</p>
                        <p className="text-[10px] text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-full bg-gray-800/50 border border-gray-700 hover:border-yellow-500/50 transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-black shadow-lg text-black">
                  A
                </div>
                <FiChevronDown className={`hidden md:block text-gray-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-52 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden animate-fadeIn z-[60]">
                  <div className="p-4 border-b border-gray-800 bg-gray-800/20">
                    <p className="text-xs font-bold text-gray-200">Admin Account</p>
                    <p className="text-[10px] text-gray-500">admin@printstore.com</p>
                  </div>
                  <div className="py-1">
                    <button onClick={() => navigate("/profile")} className="w-full px-4 py-3 text-left text-sm hover:bg-gray-800 flex items-center space-x-3 text-gray-300 transition-colors">
                      <FiUser className="text-yellow-500" /> <span>Profile</span>
                    </button>
                    <button onClick={() => navigate("/setting")} className="w-full px-4 py-3 text-left text-sm hover:bg-gray-800 flex items-center space-x-3 text-gray-300 transition-colors">
                      <FiSettings className="text-yellow-500" /> <span>Settings</span>
                    </button>
                    <button onClick={() => setShowLogoutModal(true)} className="w-full px-4 py-3 text-left text-sm hover:bg-red-500/10 text-red-400 flex items-center space-x-3 border-t border-gray-800 transition-colors">
                      <FiLogOut /> <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div ref={modalRef} className="bg-gray-900 rounded-3xl p-8 max-w-sm w-full border border-gray-800 shadow-2xl animate-scaleIn">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
              <FiLogOut className="text-4xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Logout?</h2>
            <p className="text-sm text-gray-400 text-center mb-8">You will need to login again to manage your printing orders.</p>
            <div className="flex space-x-4">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 bg-gray-800 rounded-2xl text-sm font-bold hover:bg-gray-700 transition-all active:scale-95">Stay</button>
              <button onClick={handleLogout} className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl text-sm font-bold shadow-lg shadow-red-600/20 active:scale-95 transition-all">Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}