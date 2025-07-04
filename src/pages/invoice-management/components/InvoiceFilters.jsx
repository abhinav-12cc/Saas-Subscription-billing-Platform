import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InvoiceFilters = ({ filters, setFilters, totalInvoices, filteredCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  
  // Status options
  const statusOptions = [
    { value: 'draft', label: 'Draft', icon: 'FileEdit', color: 'text-secondary-600' },
    { value: 'sent', label: 'Sent', icon: 'Send', color: 'text-primary-600' },
    { value: 'paid', label: 'Paid', icon: 'CheckCircle', color: 'text-success-600' },
    { value: 'overdue', label: 'Overdue', icon: 'AlertTriangle', color: 'text-error-600' }
  ];
  
  // Handle status toggle
  const handleStatusToggle = (status) => {
    setTempFilters(prev => {
      const newStatuses = prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status];
      
      return { ...prev, status: newStatuses };
    });
  };
  
  // Handle customer search
  const handleCustomerSearch = (e) => {
    setTempFilters(prev => ({ ...prev, customer: e.target.value }));
  };
  
  // Handle amount range change
  const handleAmountChange = (type, value) => {
    setTempFilters(prev => ({
      ...prev,
      amountRange: {
        ...prev.amountRange,
        [type]: value
      }
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    setFilters(tempFilters);
  };
  
  // Reset filters
  const resetFilters = () => {
    const resetValues = {
      dateRange: { start: null, end: null },
      status: [],
      customer: '',
      amountRange: { min: 0, max: 10000 }
    };
    
    setTempFilters(resetValues);
    setFilters(resetValues);
  };
  
  // Check if filters are active
  const hasActiveFilters = () => {
    return (
      filters.status.length > 0 ||
      filters.customer !== '' ||
      filters.amountRange.min > 0 ||
      filters.amountRange.max < 10000 ||
      (filters.dateRange.start && filters.dateRange.end)
    );
  };
  
  return (
    <div className="bg-surface rounded-lg border border-border-light shadow-card mb-6 overflow-hidden">
      {/* Filter Summary Bar */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center mb-3 sm:mb-0">
          <Icon name="Filter" size={18} className="text-secondary-500 mr-2" />
          <span className="text-text-primary font-medium">Filters</span>
          
          {hasActiveFilters() && (
            <span className="ml-2 bg-primary-50 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {filteredCount} of {totalInvoices}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {hasActiveFilters() && (
            <button
              onClick={resetFilters}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center"
            >
              <Icon name="X" size={14} className="mr-1" />
              Clear All
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary font-medium hover:text-primary-700 transition-colors duration-200 flex items-center"
          >
            {isExpanded ? (
              <>
                <Icon name="ChevronUp" size={16} className="mr-1" />
                Hide Filters
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-1" />
                Show Filters
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 border-t border-border-light">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Date Range</label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Calendar" size={16} className="text-secondary-400" />
                  </div>
                  <input
                    type="date"
                    value={tempFilters.dateRange.start || ''}
                    onChange={(e) => setTempFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="block w-full pl-10 pr-3 py-2 border border-border-light rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="Start Date"
                  />
                </div>
                <span className="text-text-secondary">to</span>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Calendar" size={16} className="text-secondary-400" />
                  </div>
                  <input
                    type="date"
                    value={tempFilters.dateRange.end || ''}
                    onChange={(e) => setTempFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="block w-full pl-10 pr-3 py-2 border border-border-light rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusToggle(status.value)}
                    className={`
                      flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200
                      ${tempFilters.status.includes(status.value) 
                        ? 'bg-primary-50 text-primary-700 border border-primary-100' :'bg-surface-hover text-text-secondary border border-border-light hover:border-primary-100'}
                    `}
                  >
                    <Icon name={status.icon} size={14} className={`mr-1 ${tempFilters.status.includes(status.value) ? 'text-primary-600' : status.color}`} />
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Customer Search */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Customer</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="Search" size={16} className="text-secondary-400" />
                </div>
                <input
                  type="text"
                  value={tempFilters.customer}
                  onChange={handleCustomerSearch}
                  className="block w-full pl-10 pr-3 py-2 border border-border-light rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  placeholder="Search customer name"
                />
              </div>
            </div>
            
            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Amount Range</label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-secondary-400">$</span>
                  </div>
                  <input
                    type="number"
                    value={tempFilters.amountRange.min}
                    onChange={(e) => handleAmountChange('min', Number(e.target.value))}
                    className="block w-full pl-8 pr-3 py-2 border border-border-light rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="Min"
                    min="0"
                  />
                </div>
                <span className="text-text-secondary">to</span>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-secondary-400">$</span>
                  </div>
                  <input
                    type="number"
                    value={tempFilters.amountRange.max}
                    onChange={(e) => handleAmountChange('max', Number(e.target.value))}
                    className="block w-full pl-8 pr-3 py-2 border border-border-light rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Filter Actions */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-border-light rounded-lg text-text-secondary hover:bg-surface-hover transition-colors duration-200"
            >
              Reset
            </button>
            
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceFilters;