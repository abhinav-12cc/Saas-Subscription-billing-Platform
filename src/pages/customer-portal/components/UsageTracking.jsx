// src/pages/customer-portal/components/UsageTracking.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Icon from "../../../components/AppIcon";

const UsageTracking = ({ usage, subscription }) => {
  const [selectedMetric, setSelectedMetric] = useState("apiCalls");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock usage history data
  const usageHistory = {
    apiCalls: [
      { date: "2024-02-01", value: 980 },
      { date: "2024-02-02", value: 1420 },
      { date: "2024-02-03", value: 1675 },
      { date: "2024-02-04", value: 1200 },
      { date: "2024-02-05", value: 2100 },
      { date: "2024-02-06", value: 1340 },
      { date: "2024-02-07", value: 1880 },
      { date: "2024-02-08", value: 1750 },
      { date: "2024-02-09", value: 1600 },
      { date: "2024-02-10", value: 2000 },
      { date: "2024-02-11", value: 2200 },
      { date: "2024-02-12", value: 1450 },
      { date: "2024-02-13", value: 1700 },
      { date: "2024-02-14", value: 2100 },
    ],
    storage: [
      { date: "2024-02-01", value: 32.1 },
      { date: "2024-02-02", value: 33.8 },
      { date: "2024-02-03", value: 35.2 },
      { date: "2024-02-04", value: 36.7 },
      { date: "2024-02-05", value: 38.9 },
      { date: "2024-02-06", value: 40.3 },
      { date: "2024-02-07", value: 41.5 },
      { date: "2024-02-08", value: 43.2 },
      { date: "2024-02-09", value: 44.7 },
      { date: "2024-02-10", value: 46.0 },
      { date: "2024-02-11", value: 47.8 },
      { date: "2024-02-12", value: 48.9 },
      { date: "2024-02-13", value: 49.5 },
      { date: "2024-02-14", value: 50.2 },
    ],
    users: [
      { date: "2024-02-01", value: 3 },
      { date: "2024-02-02", value: 4 },
      { date: "2024-02-03", value: 4 },
      { date: "2024-02-04", value: 5 },
      { date: "2024-02-05", value: 5 },
      { date: "2024-02-06", value: 6 },
      { date: "2024-02-07", value: 6 },
      { date: "2024-02-08", value: 7 },
      { date: "2024-02-09", value: 7 },
      { date: "2024-02-10", value: 8 },
      { date: "2024-02-11", value: 8 },
      { date: "2024-02-12", value: 8 },
      { date: "2024-02-13", value: 9 },
      { date: "2024-02-14", value: 9 },
    ],
  };

  const metrics = [
    {
      id: "apiCalls",
      name: "API Calls",
      icon: "Zap",
      color: "#3b82f6",
      current: usage?.apiCalls?.current,
      limit: usage?.apiCalls?.limit,
      percentage: usage?.apiCalls?.percentage,
      unit: "calls",
    },
    {
      id: "storage",
      name: "Storage",
      icon: "HardDrive",
      color: "#f59e0b",
      current: usage?.storage?.current,
      limit: usage?.storage?.limit,
      percentage: usage?.storage?.percentage,
      unit: usage?.storage?.unit,
    },
    {
      id: "users",
      name: "Users",
      icon: "Users",
      color: "#10b981",
      current: usage?.users?.current,
      limit: usage?.users?.limit,
      percentage: usage?.users?.percentage,
      unit: "users",
    },
  ];

  const periods = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
  ];

  const getUsageStatus = (percentage) => {
    if (percentage >= 90)
      return { color: "text-error", bgColor: "bg-error", label: "Critical" };
    if (percentage >= 75)
      return { color: "text-warning", bgColor: "bg-warning", label: "High" };
    if (percentage >= 50)
      return {
        color: "text-primary",
        bgColor: "bg-primary",
        label: "Moderate",
      };
    return { color: "text-success", bgColor: "bg-success", label: "Low" };
  };

  const formatValue = (value, metric) => {
    if (metric.unit === "calls") {
      return value?.toLocaleString();
    }
    return `${value} ${metric.unit}`;
  };

  const selectedMetricData = metrics.find((m) => m.id === selectedMetric);
  const chartData = usageHistory[selectedMetric] || [];

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-text-primary">
          Usage Tracking
        </h2>
        <div className="flex items-center space-x-3">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {metrics.map((metric) => (
              <option key={metric.id} value={metric.id}>
                {metric.name}
              </option>
            ))}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {periods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Usage Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {metrics.map((metric) => {
          const status = getUsageStatus(metric.percentage);
          return (
            <div
              key={metric.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedMetric === metric.id
                  ? "border-primary bg-primary-50"
                  : "border-border-light hover:border-primary hover:bg-surface-hover"
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon
                    name={metric.icon}
                    size={20}
                    style={{ color: metric.color }}
                  />
                  <span className="font-medium text-text-primary">
                    {metric.name}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${status.color} bg-opacity-10`}
                >
                  {status.label}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-end space-x-2">
                  <span className="text-2xl font-bold text-text-primary">
                    {formatValue(metric.current, metric)}
                  </span>
                  <span className="text-sm text-text-secondary">
                    / {formatValue(metric.limit, metric)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {metric.percentage?.toFixed(1)}% used
                </p>
              </div>

              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${status.bgColor}`}
                  style={{ width: `${Math.min(metric.percentage || 0, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {selectedMetricData?.name} Usage Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                }
                formatter={(value) => [
                  formatValue(value, selectedMetricData),
                  selectedMetricData?.name,
                ]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={selectedMetricData?.color}
                strokeWidth={3}
                dot={{ fill: selectedMetricData?.color, strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: selectedMetricData?.color,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Usage Alerts */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon
            name="AlertTriangle"
            size={20}
            className="text-warning-600 flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="font-medium text-warning-800 mb-1">Usage Alerts</h4>
            <p className="text-sm text-warning-700 mb-3">
              You'll receive notifications when your usage reaches 75% and 90%
              of your plan limits.
            </p>
            <div className="space-y-2">
              {metrics
                .filter((metric) => metric.percentage >= 75)
                .map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center space-x-2 text-sm text-warning-700"
                  >
                    <Icon name={metric.icon} size={14} />
                    <span>
                      {metric.name}: {metric.percentage?.toFixed(1)}% used
                      {metric.percentage >= 90 &&
                        " - Consider upgrading your plan"}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageTracking;
