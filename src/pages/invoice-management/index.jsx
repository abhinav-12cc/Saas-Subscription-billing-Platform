// src/pages/invoice-management/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import PageHeader from "../../components/ui/PageHeader";
import Modal, { ModalBody, ModalFooter } from "../../components/ui/Modal";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceFilters from "./components/InvoiceFilters";
import InvoiceDetailView from "./components/InvoiceDetailView";
import InvoiceGenerationForm from "./components/InvoiceGenerationForm";
import InvoiceStats from "./components/InvoiceStats";
import InvoiceScheduler from "./components/InvoiceScheduler";

const InvoiceManagement = () => {
  const navigate = useNavigate();
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    status: [],
    customer: "",
    amountRange: { min: 0, max: 10000 },
  });
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for invoices
  const mockInvoices = [
    {
      id: "inv-2024-501",
      number: "INV-2024-501",
      amount: 129.99,
      currency: "USD",
      status: "paid",
      date: "2024-06-12",
      dueDate: "2024-06-26",
      issueDate: "2024-06-12",
      customer: { name: "Morgan Lee", email: "morgan.lee@zenlytics.com" },
      paymentMethod: { type: "credit_card", brand: "Visa", last4: "1234" },
      pdfUrl: "/invoices/inv-2024-501.pdf",
    },
    {
      id: "inv-2024-502",
      number: "INV-2024-502",
      amount: 199.5,
      currency: "USD",
      status: "pending",
      date: "2024-05-12",
      dueDate: "2024-05-26",
      issueDate: "2024-05-12",
      customer: { name: "Riley Chen", email: "riley.chen@dataflux.com" },
      paymentMethod: { type: "bank_transfer" },
      pdfUrl: "/invoices/inv-2024-502.pdf",
    },
    {
      id: "inv-2024-503",
      number: "INV-2024-503",
      amount: 89.0,
      currency: "USD",
      status: "overdue",
      date: "2024-04-12",
      dueDate: "2024-04-26",
      issueDate: "2024-04-12",
      customer: { name: "Jamie Patel", email: "jamie.patel@acme.com" },
      paymentMethod: {
        type: "credit_card",
        brand: "Mastercard",
        last4: "5678",
      },
      pdfUrl: "/invoices/inv-2024-503.pdf",
    },
  ];

  // Load mock data with simulated API delay
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setInvoices(mockInvoices);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Handle invoice selection
  const handleSelectInvoice = (invoiceId) => {
    setSelectedInvoices((prev) => {
      if (prev.includes(invoiceId)) {
        return prev.filter((id) => id !== invoiceId);
      } else {
        return [...prev, invoiceId];
      }
    });
  };

  // Handle select all invoices
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedInvoices(invoices.map((invoice) => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  // Open invoice detail modal
  const handleViewInvoice = (invoiceId) => {
    const invoice = invoices.find((inv) => inv.id === invoiceId);
    setCurrentInvoice(invoice);
    setIsDetailModalOpen(true);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on invoices:`, selectedInvoices);

    // Simulate action and update UI
    if (action === "send") {
      // Update status of selected invoices to 'sent'
      setInvoices((prev) =>
        prev.map((invoice) =>
          selectedInvoices.includes(invoice.id) && invoice.status === "draft"
            ? { ...invoice, status: "sent" }
            : invoice
        )
      );
    } else if (action === "mark-paid") {
      // Update status of selected invoices to 'paid'
      const today = new Date().toISOString().split("T")[0];
      setInvoices((prev) =>
        prev.map((invoice) =>
          selectedInvoices.includes(invoice.id) &&
          (invoice.status === "sent" || invoice.status === "overdue")
            ? { ...invoice, status: "paid", paidDate: today }
            : invoice
        )
      );
    }

    // Clear selection after action
    setSelectedInvoices([]);
  };

  // Handle invoice status change
  const handleStatusChange = (invoiceId, newStatus) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === invoiceId
          ? {
              ...invoice,
              status: newStatus,
              paidDate:
                newStatus === "paid"
                  ? new Date().toISOString().split("T")[0]
                  : invoice.paidDate,
            }
          : invoice
      )
    );
  };

  // Handle invoice generation
  const handleGenerateInvoice = (invoiceData) => {
    // Generate a new invoice ID
    const newId = `INV-2024-${String(invoices.length + 1).padStart(4, "0")}`;

    // Create new invoice object
    const newInvoice = {
      id: newId,
      ...invoiceData,
      status: "draft",
      issueDate: new Date().toISOString().split("T")[0],
      paidDate: null,
    };

    // Add to invoices list
    setInvoices((prev) => [newInvoice, ...prev]);

    // Close modal
    setIsGenerateModalOpen(false);
  };

  // Filter invoices based on current filters
  const filteredInvoices = invoices.filter((invoice) => {
    // Filter by status
    if (filters.status.length > 0 && !filters.status.includes(invoice.status)) {
      return false;
    }

    // Filter by customer name
    if (
      filters.customer &&
      !invoice.customer.name
        .toLowerCase()
        .includes(filters.customer.toLowerCase())
    ) {
      return false;
    }

    // Filter by amount range
    if (
      invoice.amount < filters.amountRange.min ||
      invoice.amount > filters.amountRange.max
    ) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const invoiceDate = new Date(invoice.issueDate);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      if (invoiceDate < startDate || invoiceDate > endDate) {
        return false;
      }
    }

    return true;
  });

  const pageActions = (
    <>
      <button
        onClick={() => setIsGenerateModalOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors duration-200"
      >
        <Icon name="FileText" size={18} className="mr-2" />
        Generate Invoice
      </button>

      <button
        onClick={() => setIsSchedulerModalOpen(true)}
        className="bg-surface border border-border-light text-text-primary px-4 py-2 rounded-lg flex items-center justify-center hover:bg-surface-hover transition-colors duration-200"
      >
        <Icon name="Calendar" size={18} className="mr-2" />
        Schedule Invoices
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16 lg:content-offset">
        <div className="p-6">
          <PageHeader actions={pageActions} />

          {/* Stats Cards */}
          <InvoiceStats invoices={invoices} />

          {/* Filters */}
          <InvoiceFilters
            filters={filters}
            setFilters={setFilters}
            totalInvoices={invoices.length}
            filteredCount={filteredInvoices.length}
          />

          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-3 sm:mb-0">
                <Icon
                  name="CheckSquare"
                  size={20}
                  className="text-primary mr-2"
                />
                <span className="text-text-primary font-medium">
                  {selectedInvoices.length} invoices selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleBulkAction("send")}
                  className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-primary-700 transition-colors duration-200"
                  disabled={selectedInvoices.length === 0}
                >
                  <Icon name="Send" size={16} className="mr-1.5" />
                  Send
                </button>

                <button
                  onClick={() => handleBulkAction("mark-paid")}
                  className="bg-success text-white px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-success-700 transition-colors duration-200"
                  disabled={selectedInvoices.length === 0}
                >
                  <Icon name="CheckCircle" size={16} className="mr-1.5" />
                  Mark Paid
                </button>

                <button
                  onClick={() => handleBulkAction("export")}
                  className="bg-surface border border-border-light text-text-primary px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-surface-hover transition-colors duration-200"
                  disabled={selectedInvoices.length === 0}
                >
                  <Icon name="Download" size={16} className="mr-1.5" />
                  Export
                </button>

                <button
                  onClick={() => setSelectedInvoices([])}
                  className="bg-surface border border-border-light text-text-primary px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-surface-hover transition-colors duration-200"
                >
                  <Icon name="X" size={16} className="mr-1.5" />
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Invoice Table */}
          <InvoiceTable
            invoices={filteredInvoices}
            selectedInvoices={selectedInvoices}
            onSelectInvoice={handleSelectInvoice}
            onSelectAll={handleSelectAll}
            onViewInvoice={handleViewInvoice}
            onStatusChange={handleStatusChange}
            isLoading={isLoading}
          />
        </div>
      </main>

      {/* Invoice Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Invoice ${currentInvoice?.id}`}
        size="lg"
      >
        {currentInvoice && (
          <InvoiceDetailView
            invoice={currentInvoice}
            onStatusChange={(newStatus) => {
              handleStatusChange(currentInvoice.id, newStatus);
              setCurrentInvoice({ ...currentInvoice, status: newStatus });
            }}
            onClose={() => setIsDetailModalOpen(false)}
          />
        )}
      </Modal>

      {/* Generate Invoice Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate New Invoice"
        size="lg"
      >
        <InvoiceGenerationForm
          onSubmit={handleGenerateInvoice}
          onCancel={() => setIsGenerateModalOpen(false)}
        />
      </Modal>

      {/* Invoice Scheduler Modal */}
      <Modal
        isOpen={isSchedulerModalOpen}
        onClose={() => setIsSchedulerModalOpen(false)}
        title="Schedule Recurring Invoices"
        size="lg"
      >
        <InvoiceScheduler
          onSave={(scheduleData) => {
            console.log("Schedule data:", scheduleData);
            setIsSchedulerModalOpen(false);
          }}
          onCancel={() => setIsSchedulerModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default InvoiceManagement;
