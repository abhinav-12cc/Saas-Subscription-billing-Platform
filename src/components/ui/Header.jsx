import React, { useState } from "react";
import Icon from "../AppIcon";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: 1,
      type: "warning",
      title: "Payment Failed",
      message: "Customer subscription payment failed for Acme Corp",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "success",
      title: "Invoice Paid",
      message: "Invoice #INV-2024-001 has been paid",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "info",
      title: "Subscription Renewal",
      message: "TechStart Pro plan renews in 3 days",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleNotificationClick = (notificationId) => {
    console.log("Notification clicked:", notificationId);
  };

  const handleUserMenuClick = (action) => {
    console.log("User menu action:", action);
    setIsUserMenuOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return "AlertTriangle";
      case "success":
        return "CheckCircle";
      case "error":
        return "XCircle";
      default:
        return "Info";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "warning":
        return "text-warning-600";
      case "success":
        return "text-success-600";
      case "error":
        return "text-error-600";
      default:
        return "text-primary-600";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border-light shadow-card z-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Company Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center">
              <Icon name="Hexagon" size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-text-primary">
                Sublytic
              </span>
              <p className="text-xs text-text-tertiary">Platform</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-secondary-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers, invoices..."
              className="block w-full pl-10 pr-3 py-2 border border-border-light rounded-lg bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder-secondary-400"
            />
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-secondary-600 hover:text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200"
            >
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-modal border border-border-light z-300">
                <div className="p-4 border-b border-border-light">
                  <h3 className="text-sm font-medium text-text-primary">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 border-b border-border-light hover:bg-surface-hover cursor-pointer transition-colors duration-200 ${
                        notification.unread ? "bg-primary-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon
                          name={getNotificationIcon(notification.type)}
                          size={16}
                          className={getNotificationColor(notification.type)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary">
                            {notification.title}
                          </p>
                          <p className="text-sm text-text-secondary mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-tertiary mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border-light">
                  <button className="text-sm text-primary hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 text-secondary-600 hover:text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <Icon name="ChevronDown" size={16} />
            </button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border-light z-300">
                <div className="p-3 border-b border-border-light">
                  <p className="text-sm font-medium text-text-primary">
                    John Doe
                  </p>
                  <p className="text-xs text-text-secondary">
                    john@company.com
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => handleUserMenuClick("profile")}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Profile Settings
                  </button>
                  <button
                    onClick={() => handleUserMenuClick("billing")}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name="CreditCard" size={16} className="mr-2" />
                    Billing Settings
                  </button>
                  <button
                    onClick={() => handleUserMenuClick("help")}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name="HelpCircle" size={16} className="mr-2" />
                    Help & Support
                  </button>
                </div>
                <div className="border-t border-border-light py-1">
                  <button
                    onClick={() => handleUserMenuClick("logout")}
                    className="flex items-center w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-error transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isNotificationOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => {
            setIsNotificationOpen(false);
            setIsUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
