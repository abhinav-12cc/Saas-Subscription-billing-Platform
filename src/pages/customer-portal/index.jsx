// src/pages/customer-portal/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import AccountOverview from "./components/AccountOverview";
import SubscriptionCard from "./components/SubscriptionCard";
import BillingHistory from "./components/BillingHistory";
import PaymentMethods from "./components/PaymentMethods";
import UsageTracking from "./components/UsageTracking";
import NotificationSettings from "./components/NotificationSettings";
import SupportWidget from "./components/SupportWidget";
import BottomNavigation from "./components/BottomNavigation";
import MobileHeader from "./components/MobileHeader";

const CustomerPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState("en-US");
  const [currency, setCurrency] = useState("USD");
  const [showSupportChat, setShowSupportChat] = useState(false);

  // Mock customer data
  useEffect(() => {
    setTimeout(() => {
      setCustomerData({
        customer: {
          name: "Morgan Lee",
          email: "morgan.lee@zenlytics.com",
          joinedDate: "2022-08-21",
        },
        subscription: {
          plan: {
            name: "Growth Pro",
            price: 79.99,
            interval: "month",
            features: [
              "Up to 25,000 API calls/month",
              "250GB Storage",
              "Priority Support",
              "Custom Integrations",
            ],
          },
          status: "active",
          nextBillingDate: "2024-07-10",
          currentPeriodStart: "2024-06-10",
          currentPeriodEnd: "2024-07-10",
        },
        usage: {
          apiCalls: { current: 3200, limit: 25000, percentage: 12.8 },
          storage: { current: 120.5, limit: 250, percentage: 48.2, unit: "GB" },
          users: { current: 7, limit: 20, percentage: 35 },
        },
        paymentMethods: [
          {
            type: "Credit Card",
            last4: "4321",
            brand: "Mastercard",
            expiry: "09/28",
          },
        ],
        billingHistory: [
          {
            id: "inv-2024-301",
            date: "2024-06-10",
            amount: 79.99,
            status: "Paid",
          },
          {
            id: "inv-2024-302",
            date: "2024-05-10",
            amount: 79.99,
            status: "Paid",
          },
        ],
      });
      setLoading(false);
    }, 800);
  }, []);

  const formatCurrency = (amount, currencyCode = currency) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleUpgradePlan = () => {
    console.log("Upgrade plan clicked");
    // Implement plan upgrade logic
  };

  const handleDowngradePlan = () => {
    console.log("Downgrade plan clicked");
    // Implement plan downgrade logic
  };

  const handleCancelSubscription = () => {
    console.log("Cancel subscription clicked");
    // Implement subscription cancellation logic
  };

  const handleAddPaymentMethod = () => {
    console.log("Add payment method clicked");
    // Implement add payment method logic
  };

  const handleRemovePaymentMethod = (paymentMethodId) => {
    console.log("Remove payment method:", paymentMethodId);
    // Implement remove payment method logic
  };

  const handleDownloadInvoice = (invoiceId) => {
    console.log("Download invoice:", invoiceId);
    // Implement invoice download logic
  };

  const handleDisputeInvoice = (invoiceId) => {
    console.log("Dispute invoice:", invoiceId);
    // Implement invoice dispute logic
  };

  const handleUpdateNotifications = (notificationSettings) => {
    console.log("Update notifications:", notificationSettings);
    // Implement notification settings update logic
  };

  const handleSupportChat = () => {
    setShowSupportChat(true);
  };

  const handleCloseSupportChat = () => {
    setShowSupportChat(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-text-secondary">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!customerData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon
            name="AlertCircle"
            size={48}
            className="text-error mx-auto mb-4"
          />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            Unable to Load Account
          </h1>
          <p className="text-text-secondary mb-4">
            We're having trouble loading your account information.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <AccountOverview
              customer={customerData.customer}
              subscription={customerData.subscription}
              usage={customerData.usage}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
            <SubscriptionCard
              subscription={customerData.subscription}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              onUpgrade={handleUpgradePlan}
              onDowngrade={handleDowngradePlan}
              onCancel={handleCancelSubscription}
            />
            <UsageTracking
              usage={customerData.usage}
              subscription={customerData.subscription}
            />
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <BillingHistory
              invoices={customerData.invoices}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
              onDownload={handleDownloadInvoice}
              onDispute={handleDisputeInvoice}
            />
            <PaymentMethods
              paymentMethods={customerData.paymentMethods}
              onAdd={handleAddPaymentMethod}
              onRemove={handleRemovePaymentMethod}
            />
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <NotificationSettings
              notifications={customerData.notifications}
              onUpdate={handleUpdateNotifications}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileHeader
        customer={customerData.customer}
        onSupportClick={handleSupportChat}
      />

      {/* Main Content */}
      <main className="pb-20 lg:pb-8">
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:block bg-surface border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: "Home" },
                { id: "billing", label: "Billing", icon: "CreditCard" },
                { id: "settings", label: "Settings", icon: "Settings" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-light"
                  }`}
                >
                  <Icon name={tab.icon} size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {renderTabContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Support Widget */}
      <SupportWidget
        isOpen={showSupportChat}
        onOpen={handleSupportChat}
        onClose={handleCloseSupportChat}
        customer={customerData.customer}
      />
    </div>
  );
};

export default CustomerPortal;
