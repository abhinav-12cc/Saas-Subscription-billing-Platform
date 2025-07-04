import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'subscription',
      title: 'New subscription created',
      description: 'Acme Corp upgraded to Enterprise plan',
      user: 'John Smith',
      amount: '$299/month',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'success',
      icon: 'UserPlus'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: 'Invoice #INV-2024-001 paid successfully',
      user: 'TechStart Inc',
      amount: '$1,250.00',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      status: 'success',
      icon: 'CreditCard'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment failed',
      description: 'Subscription renewal payment declined',
      user: 'Digital Solutions LLC',
      amount: '$149/month',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'error',
      icon: 'AlertCircle'
    },
    {
      id: 4,
      type: 'invoice',
      title: 'Invoice generated',
      description: 'Monthly usage invoice created and sent',
      user: 'CloudTech Systems',
      amount: '$2,450.00',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'info',
      icon: 'FileText'
    },
    {
      id: 5,
      type: 'subscription',
      title: 'Subscription cancelled',
      description: 'Customer requested immediate cancellation',
      user: 'StartupXYZ',
      amount: '$99/month',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'warning',
      icon: 'UserMinus'
    },
    {
      id: 6,
      type: 'usage',
      title: 'Usage threshold exceeded',
      description: 'API calls exceeded 80% of monthly limit',
      user: 'DevCorp Ltd',
      amount: '8,500 calls',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      status: 'warning',
      icon: 'BarChart3'
    },
    {
      id: 7,
      type: 'payment',
      title: 'Refund processed',
      description: 'Partial refund issued for overpayment',
      user: 'InnovateTech',
      amount: '$75.00',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      status: 'info',
      icon: 'RefreshCw'
    },
    {
      id: 8,
      type: 'subscription',
      title: 'Plan upgraded',
      description: 'Customer upgraded from Pro to Enterprise',
      user: 'GrowthCo',
      amount: '$199 → $299',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      status: 'success',
      icon: 'TrendingUp'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity', count: activities.length },
    { value: 'subscription', label: 'Subscriptions', count: activities.filter(a => a.type === 'subscription').length },
    { value: 'payment', label: 'Payments', count: activities.filter(a => a.type === 'payment').length },
    { value: 'invoice', label: 'Invoices', count: activities.filter(a => a.type === 'invoice').length },
    { value: 'usage', label: 'Usage', count: activities.filter(a => a.type === 'usage').length }
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-success-100 text-success-700 border-success-200';
      case 'error':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'warning':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'info':
        return 'bg-primary-100 text-primary-700 border-primary-200';
      default:
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  const getIconColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success-600';
      case 'error':
        return 'text-error-600';
      case 'warning':
        return 'text-warning-600';
      case 'info':
        return 'text-primary-600';
      default:
        return 'text-secondary-600';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border-light p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        
        {/* Activity Filters */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedFilter(option.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedFilter === option.value
                  ? 'bg-primary text-white' :'bg-surface-hover text-text-secondary hover:text-text-primary hover:bg-secondary-100'
              }`}
            >
              {option.label}
              <span className="ml-1 text-xs opacity-75">({option.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 border border-border-light rounded-lg hover:bg-surface-hover transition-colors duration-200"
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activity.status === 'success' ? 'bg-success-100' :
              activity.status === 'error' ? 'bg-error-100' :
              activity.status === 'warning'? 'bg-warning-100' : 'bg-primary-100'
            }`}>
              <Icon 
                name={activity.icon} 
                size={20} 
                className={getIconColor(activity.status)} 
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-text-primary text-sm">{activity.title}</h4>
                  <p className="text-text-secondary text-sm">{activity.description}</p>
                </div>
                <span className="text-text-tertiary text-xs whitespace-nowrap ml-4">
                  {formatTimestamp(activity.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-text-secondary text-sm">{activity.user}</span>
                  <span className="font-medium text-text-primary text-sm">{activity.amount}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 pt-4 border-t border-border-light">
        <button className="w-full text-primary hover:text-primary-700 text-sm font-medium py-2 border border-border-light rounded-lg hover:bg-surface-hover transition-colors duration-200 flex items-center justify-center space-x-2">
          <Icon name="RotateCcw" size={16} />
          <span>Load More Activity</span>
        </button>
      </div>

      {/* Activity Summary */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-light">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">24</div>
          <div className="text-xs text-text-secondary">Today</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">156</div>
          <div className="text-xs text-text-secondary">This Week</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">642</div>
          <div className="text-xs text-text-secondary">This Month</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">2.1K</div>
          <div className="text-xs text-text-secondary">All Time</div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;