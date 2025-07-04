// src/pages/billing-dashboard/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import PageHeader from "../../components/ui/PageHeader";
import Icon from "../../components/AppIcon";
import RecentActivity from "./components/RecentActivity";
import QuickActions from "./components/QuickActions";
import MetricsCard from "./components/MetricsCard";
import RevenueChart from "./components/RevenueChart";

const BillingDashboard = () => {
  const navigate = useNavigate();
  const [selectedDateRange, setSelectedDateRange] = useState("30d");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedSegment, setSelectedSegment] = useState("all");

  // Mock data for dashboard metrics
  const dashboardMetrics = {
    mrr: {
      current: 142500,
      previous: 135000,
      growth: 5.6,
      currency: "USD",
    },
    arr: {
      current: 1710000,
      previous: 1620000,
      growth: 5.6,
      currency: "USD",
    },
    activeSubscriptions: {
      current: 1382,
      previous: 1300,
      growth: 6.3,
    },
    churnRate: {
      current: 1.9,
      previous: 2.4,
      growth: -20.8,
    },
    pendingInvoices: {
      current: 17,
      amount: 38900,
      currency: "USD",
    },
  };

  // Mock revenue trend data
  const revenueData = [
    { month: "Jan", mrr: 112000, arr: 1344000, subscriptions: 1100 },
    { month: "Feb", mrr: 120000, arr: 1440000, subscriptions: 1200 },
    { month: "Mar", mrr: 128000, arr: 1536000, subscriptions: 1280 },
    { month: "Apr", mrr: 135000, arr: 1620000, subscriptions: 1300 },
    { month: "May", mrr: 135000, arr: 1620000, subscriptions: 1300 },
    { month: "Jun", mrr: 142500, arr: 1710000, subscriptions: 1382 },
  ];

  // Mock subscription growth data
  const subscriptionGrowthData = [
    { month: "Jan", new: 45, churned: 12, net: 33 },
    { month: "Feb", new: 52, churned: 15, net: 37 },
    { month: "Mar", new: 48, churned: 10, net: 38 },
    { month: "Apr", new: 55, churned: 18, net: 37 },
    { month: "May", new: 42, churned: 14, net: 28 },
    { month: "Jun", new: 58, churned: 16, net: 42 },
  ];

  // Mock usage analytics data
  const usageData = [
    { name: "Integrations", value: 4100, color: "#7c3aed" },
    { name: "API Calls", value: 3200, color: "#06b6d4" },
    { name: "Storage", value: 2100, color: "#eab308" },
    { name: "Bandwidth", value: 1750, color: "#22c55e" },
  ];

  const dateRangeOptions = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" },
  ];

  const currencyOptions = [
    { value: "USD", label: "USD ($)", symbol: "$" },
    { value: "EUR", label: "EUR (€)", symbol: "€" },
    { value: "GBP", label: "GBP (£)", symbol: "£" },
    { value: "INR", label: "INR (₹)", symbol: "₹" },
  ];

  const segmentOptions = [
    { value: "all", label: "All Segments" },
    { value: "enterprise", label: "Enterprise" },
    { value: "pro", label: "Professional" },
    { value: "starter", label: "Starter" },
  ];

  const formatCurrency = (amount, currency = selectedCurrency) => {
    const currencySymbol =
      currencyOptions.find((c) => c.value === currency)?.symbol || "$";
    return `${currencySymbol}${amount.toLocaleString()}`;
  };

  const formatPercentage = (value, showSign = true) => {
    const sign = showSign && value > 0 ? "+" : "";
    return `${sign}${value.toFixed(1)}%`;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return "text-success-600";
    if (growth < 0) return "text-error-600";
    return "text-secondary-500";
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) return "TrendingUp";
    if (growth < 0) return "TrendingDown";
    return "Minus";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      <main className="content-offset pt-16">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <h1 className="text-2xl font-bold text-white mb-6">
            Billing Dashboard
          </h1>

          {/* Filter Controls */}
          <div className="bg-surface rounded-lg shadow-card border border-border-light p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center space-x-3">
                <Icon
                  name="Calendar"
                  size={20}
                  className="text-secondary-500 flex-shrink-0"
                />
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-0"
                >
                  {dateRangeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <Icon
                  name="DollarSign"
                  size={20}
                  className="text-secondary-500 flex-shrink-0"
                />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-0"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <Icon
                  name="Filter"
                  size={20}
                  className="text-secondary-500 flex-shrink-0"
                />
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-0"
                >
                  {segmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <MetricsCard
              title="Monthly Recurring Revenue"
              value={formatCurrency(dashboardMetrics.mrr.current)}
              change={dashboardMetrics.mrr.growth}
              icon="DollarSign"
              trend="up"
            />
            <MetricsCard
              title="Annual Recurring Revenue"
              value={formatCurrency(dashboardMetrics.arr.current)}
              change={dashboardMetrics.arr.growth}
              icon="TrendingUp"
              trend="up"
            />
            <MetricsCard
              title="Active Subscriptions"
              value={dashboardMetrics.activeSubscriptions.current.toLocaleString()}
              change={dashboardMetrics.activeSubscriptions.growth}
              icon="Users"
              trend="up"
            />
            <MetricsCard
              title="Churn Rate"
              value={`${dashboardMetrics.churnRate.current}%`}
              change={dashboardMetrics.churnRate.growth}
              icon="UserMinus"
              trend="down"
              isInverted={true}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
            {/* Revenue Charts */}
            <div className="xl:col-span-8 space-y-6">
              <RevenueChart
                title="Revenue Trends"
                data={revenueData}
                selectedCurrency={selectedCurrency}
                formatCurrency={formatCurrency}
              />

              {/* Subscription Growth Chart */}
              <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h3 className="text-lg font-semibold text-text-primary">
                    Subscription Growth
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                      <span className="text-text-secondary">New</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                      <span className="text-text-secondary">Churned</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-text-secondary">Net Growth</span>
                    </div>
                  </div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subscriptionGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="new"
                        fill="#10b981"
                        name="New Subscriptions"
                      />
                      <Bar dataKey="churned" fill="#ef4444" name="Churned" />
                      <Bar dataKey="net" fill="#3b82f6" name="Net Growth" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="xl:col-span-4">
              <QuickActions />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Usage Analytics */}
            <div className="xl:col-span-4">
              <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  Usage Distribution
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={usageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {usageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--color-surface)",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-6">
                  {usageData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-text-secondary truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="xl:col-span-8">
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingDashboard;
