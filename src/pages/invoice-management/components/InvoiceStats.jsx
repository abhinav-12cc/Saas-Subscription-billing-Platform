import React from 'react';
import Icon from '../../../components/AppIcon';

const InvoiceStats = ({ invoices }) => {
  // Calculate statistics
  const calculateStats = () => {
    const stats = {
      total: invoices.length,
      draft: 0,
      sent: 0,
      paid: 0,
      overdue: 0,
      totalAmount: 0,
      paidAmount: 0,
      overdueAmount: 0
    };
    
    invoices.forEach(invoice => {
      // Count by status
      stats[invoice.status]++;
      
      // Calculate amounts
      const amount = invoice.amount;
      stats.totalAmount += amount;
      
      if (invoice.status === 'paid') {
        stats.paidAmount += amount;
      } else if (invoice.status === 'overdue') {
        stats.overdueAmount += amount;
      }
    });
    
    return stats;
  };
  
  const stats = calculateStats();
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Calculate collection rate
  const collectionRate = stats.totalAmount > 0 
    ? Math.round((stats.paidAmount / stats.totalAmount) * 100) 
    : 0;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Invoices */}
      <div className="bg-surface rounded-lg border border-border-light shadow-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-sm">Total Invoices</p>
            <h3 className="text-2xl font-semibold text-text-primary mt-1">{stats.total}</h3>
            <div className="flex items-center mt-2">
              <div className="flex space-x-1">
                <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-success"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-warning"></span>
                <span className="inline-block w-2 h-2 rounded-full bg-error"></span>
              </div>
              <span className="text-xs text-text-tertiary ml-2">All statuses</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-secondary-400 mr-1"></span>
            <span className="text-text-secondary">Draft: {stats.draft}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-primary mr-1"></span>
            <span className="text-text-secondary">Sent: {stats.sent}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-success mr-1"></span>
            <span className="text-text-secondary">Paid: {stats.paid}</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-error mr-1"></span>
            <span className="text-text-secondary">Overdue: {stats.overdue}</span>
          </div>
        </div>
      </div>
      
      {/* Total Amount */}
      <div className="bg-surface rounded-lg border border-border-light shadow-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-sm">Total Amount</p>
            <h3 className="text-2xl font-semibold text-text-primary mt-1 font-data">
              {formatCurrency(stats.totalAmount)}
            </h3>
            <p className="text-xs text-text-tertiary mt-2">
              Across all invoices
            </p>
          </div>
          <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
            <Icon name="DollarSign" size={20} className="text-primary" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border-light">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Collection Rate</span>
            <span className="font-medium text-text-primary">{collectionRate}%</span>
          </div>
          <div className="w-full bg-secondary-100 rounded-full h-2 mt-2">
            <div 
              className="bg-success h-2 rounded-full" 
              style={{ width: `${collectionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Paid Amount */}
      <div className="bg-surface rounded-lg border border-border-light shadow-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-sm">Paid Amount</p>
            <h3 className="text-2xl font-semibold text-success-600 mt-1 font-data">
              {formatCurrency(stats.paidAmount)}
            </h3>
            <div className="flex items-center mt-2">
              <Icon name="TrendingUp" size={14} className="text-success mr-1" />
              <span className="text-xs text-success">
                {stats.paid} paid invoices
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-success-50 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border-light">
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Paid vs Total</span>
            <span className="font-medium text-text-primary">
              {formatCurrency(stats.paidAmount)} / {formatCurrency(stats.totalAmount)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Overdue Amount */}
      <div className="bg-surface rounded-lg border border-border-light shadow-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-text-secondary text-sm">Overdue Amount</p>
            <h3 className="text-2xl font-semibold text-error-600 mt-1 font-data">
              {formatCurrency(stats.overdueAmount)}
            </h3>
            <div className="flex items-center mt-2">
              <Icon name="AlertTriangle" size={14} className="text-error mr-1" />
              <span className="text-xs text-error">
                {stats.overdue} overdue invoices
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-error-50 rounded-full flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-error" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border-light">
          <button className="text-sm text-primary font-medium hover:text-primary-700 transition-colors duration-200 flex items-center">
            <Icon name="Mail" size={14} className="mr-1" />
            Send Reminders
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStats;