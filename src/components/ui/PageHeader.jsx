// src/components/ui/PageHeader.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PageHeader = ({ title, description, actions, customIcon }) => {
  const location = useLocation();

  // Route map to ensure consistent titles across the app
  const routeMap = {
    '/billing-dashboard': {
      title: 'Billing Dashboard',
      description: 'Monitor revenue, subscriptions, and billing performance',
      icon: 'BarChart3'
    },
    '/subscription-management': {
      title: 'Subscription Management',
      description: 'Comprehensive lifecycle control for customer subscriptions and plan modifications',
      icon: 'Users'
    },
    '/invoice-management': {
      title: 'Invoice Management',
      description: 'Manage, track, and generate invoices for your customers',
      icon: 'FileText'
    },
    '/payment-gateway-configuration': {
      title: 'Payment Gateway Configuration',
      description: 'Configure and manage payment processors and gateway settings',
      icon: 'Settings'
    },
    '/usage-analytics-reporting': {
      title: 'Usage Analytics & Reporting',
      description: 'Comprehensive usage metrics and revenue analytics',
      icon: 'TrendingUp'
    },
    '/customer-portal': {
      title: 'Customer Portal',
      description: 'Self-service customer portal for subscription management',
      icon: 'ExternalLink'
    },
    '/dunning-management': {
      title: 'Dunning Management',
      description: 'Automated payment retry and dunning workflow management',
      icon: 'AlertCircle'
    }
  };

  // Get current route info or use provided props
  const currentRoute = routeMap[location.pathname];
  const displayTitle = title || currentRoute?.title || 'Page';
  const displayDescription = description || currentRoute?.description || '';
  const displayIcon = customIcon || currentRoute?.icon;

  return (
    <div className="mb-6 sm:mb-8 page-header">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {displayIcon && (
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={displayIcon} size={20} className="text-primary" />
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {displayTitle}
            </h1>
          </div>
          {displayDescription && (
            <p className="text-text-secondary text-base sm:text-lg">
              {displayDescription}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex flex-col sm:flex-row gap-3 lg:mt-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;