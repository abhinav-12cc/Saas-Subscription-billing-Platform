import React from 'react';
import Icon from '../../../components/AppIcon';

const InvoiceTable = ({ 
  invoices, 
  selectedInvoices, 
  onSelectInvoice, 
  onSelectAll, 
  onViewInvoice,
  onStatusChange,
  isLoading
}) => {
  const allSelected = invoices.length > 0 && selectedInvoices.length === invoices.length;
  
  // Format currency based on currency code
  const formatCurrency = (amount, currency) => {
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      AUD: 'A$',
      CAD: 'C$',
      JPY: '¥',
      NOK: 'kr',
      AED: 'د.إ'
    };
    
    const symbol = currencySymbols[currency] || currency;
    
    // Format based on currency
    if (currency === 'JPY') {
      return `${symbol}${Math.round(amount).toLocaleString()}`;
    }
    
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: {
        bgColor: 'bg-secondary-100',
        textColor: 'text-secondary-800',
        icon: 'FileEdit'
      },
      sent: {
        bgColor: 'bg-primary-50',
        textColor: 'text-primary-700',
        icon: 'Send'
      },
      paid: {
        bgColor: 'bg-success-50',
        textColor: 'text-success-700',
        icon: 'CheckCircle'
      },
      overdue: {
        bgColor: 'bg-error-50',
        textColor: 'text-error-700',
        icon: 'AlertTriangle'
      }
    };
    
    const config = statusConfig[status] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
        <Icon name={config.icon} size={14} className="mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Get payment method display
  const getPaymentMethodDisplay = (paymentMethod) => {
    if (!paymentMethod) return '-';
    
    const methodIcons = {
      credit_card: 'CreditCard',
      bank_transfer: 'Building',
      sepa_debit: 'CreditCard'
    };
    
    const icon = methodIcons[paymentMethod.type] || 'CreditCard';
    
    let displayText = '';
    if (paymentMethod.type === 'credit_card') {
      displayText = `${paymentMethod.brand} •••• ${paymentMethod.last4}`;
    } else if (paymentMethod.type === 'bank_transfer') {
      displayText = `Bank Transfer`;
    } else if (paymentMethod.type === 'sepa_debit') {
      displayText = `SEPA Debit`;
    }
    
    return (
      <div className="flex items-center">
        <Icon name={icon} size={16} className="mr-2 text-secondary-500" />
        <span>{displayText}</span>
      </div>
    );
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="bg-surface rounded-lg border border-border-light shadow-card overflow-hidden">
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="animate-spin mb-4">
            <Icon name="Loader" size={32} className="text-primary" />
          </div>
          <p className="text-text-secondary">Loading invoices...</p>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (invoices.length === 0) {
    return (
      <div className="bg-surface rounded-lg border border-border-light shadow-card overflow-hidden">
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No invoices found</h3>
          <p className="text-text-secondary text-center max-w-md mb-6">
            No invoices match your current filters. Try adjusting your search criteria or create a new invoice.
          </p>
          <button
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center hover:bg-primary-700 transition-colors duration-200"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            Create Invoice
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-surface rounded-lg border border-border-light shadow-card overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary-50 border-b border-border-light">
              <th className="px-6 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="rounded border-border-medium text-primary focus:ring-primary"
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {invoices.map((invoice) => (
              <tr 
                key={invoice.id} 
                className="hover:bg-secondary-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => onSelectInvoice(invoice.id)}
                    className="rounded border-border-medium text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewInvoice(invoice.id)}
                    className="text-primary font-medium hover:text-primary-700 transition-colors duration-200"
                  >
                    {invoice.id}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary font-medium">
                      {invoice.customer.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-text-primary">{invoice.customer.name}</div>
                      <div className="text-xs text-text-secondary">{invoice.customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary font-data">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(invoice.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">
                    <div>Issued: {formatDate(invoice.issueDate)}</div>
                    <div>Due: {formatDate(invoice.dueDate)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">
                    {getPaymentMethodDisplay(invoice.paymentMethod)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewInvoice(invoice.id)}
                      className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="View Invoice"
                    >
                      <Icon name="Eye" size={18} />
                    </button>
                    
                    {invoice.status === 'draft' && (
                      <button
                        onClick={() => onStatusChange(invoice.id, 'sent')}
                        className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                        title="Send Invoice"
                      >
                        <Icon name="Send" size={18} />
                      </button>
                    )}
                    
                    {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                      <button
                        onClick={() => onStatusChange(invoice.id, 'paid')}
                        className="p-1.5 text-secondary-600 hover:text-success hover:bg-success-50 rounded-lg transition-colors duration-200"
                        title="Mark as Paid"
                      >
                        <Icon name="CheckCircle" size={18} />
                      </button>
                    )}
                    
                    <button
                      className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Download PDF"
                    >
                      <Icon name="Download" size={18} />
                    </button>
                    
                    <div className="relative group">
                      <button
                        className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                        title="More Options"
                      >
                        <Icon name="MoreVertical" size={18} />
                      </button>
                      
                      <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-modal border border-border-light z-10 hidden group-hover:block">
                        <div className="py-1">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                          >
                            <Icon name="Mail" size={16} className="mr-2" />
                            Send Reminder
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                          >
                            <Icon name="Copy" size={16} className="mr-2" />
                            Duplicate
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-colors duration-200"
                          >
                            <Icon name="Edit" size={16} className="mr-2" />
                            Edit
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-error hover:bg-error-50 transition-colors duration-200"
                          >
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View */}
      <div className="md:hidden">
        <div className="divide-y divide-border-light">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => onSelectInvoice(invoice.id)}
                    className="rounded border-border-medium text-primary focus:ring-primary mr-3"
                  />
                  <button
                    onClick={() => onViewInvoice(invoice.id)}
                    className="text-primary font-medium hover:text-primary-700 transition-colors duration-200"
                  >
                    {invoice.id}
                  </button>
                </div>
                {getStatusBadge(invoice.status)}
              </div>
              
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center text-primary font-medium">
                    {invoice.customer.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-text-primary">{invoice.customer.name}</div>
                    <div className="text-xs text-text-secondary">{invoice.customer.email}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <div className="text-xs text-text-tertiary">Amount</div>
                  <div className="text-sm font-medium text-text-primary font-data">
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-text-tertiary">Due Date</div>
                  <div className="text-sm text-text-secondary">
                    {formatDate(invoice.dueDate)}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-text-tertiary">Issue Date</div>
                  <div className="text-sm text-text-secondary">
                    {formatDate(invoice.issueDate)}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-text-tertiary">Payment Method</div>
                  <div className="text-sm text-text-secondary">
                    {invoice.paymentMethod ? (
                      invoice.paymentMethod.type === 'credit_card' ? 
                        `${invoice.paymentMethod.brand} •••• ${invoice.paymentMethod.last4}` : 
                        invoice.paymentMethod.type.replace('_', ' ')
                    ) : '-'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-border-light">
                <button
                  onClick={() => onViewInvoice(invoice.id)}
                  className="text-sm text-primary font-medium hover:text-primary-700 transition-colors duration-200 flex items-center"
                >
                  <Icon name="Eye" size={16} className="mr-1" />
                  View
                </button>
                
                <div className="flex items-center space-x-2">
                  {invoice.status === 'draft' && (
                    <button
                      onClick={() => onStatusChange(invoice.id, 'sent')}
                      className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="Send Invoice"
                    >
                      <Icon name="Send" size={18} />
                    </button>
                  )}
                  
                  {(invoice.status === 'sent' || invoice.status === 'overdue') && (
                    <button
                      onClick={() => onStatusChange(invoice.id, 'paid')}
                      className="p-1.5 text-secondary-600 hover:text-success hover:bg-success-50 rounded-lg transition-colors duration-200"
                      title="Mark as Paid"
                    >
                      <Icon name="CheckCircle" size={18} />
                    </button>
                  )}
                  
                  <button
                    className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    title="Download PDF"
                  >
                    <Icon name="Download" size={18} />
                  </button>
                  
                  <div className="relative">
                    <button
                      className="p-1.5 text-secondary-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title="More Options"
                    >
                      <Icon name="MoreVertical" size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination */}
      <div className="bg-secondary-50 px-6 py-4 border-t border-border-light flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          Showing <span className="font-medium">{invoices.length}</span> of <span className="font-medium">{invoices.length}</span> invoices
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-secondary-600 hover:text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          
          <button
            className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium"
          >
            1
          </button>
          
          <button
            className="p-2 text-secondary-600 hover:text-primary hover:bg-surface-hover rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;