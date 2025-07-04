// src/pages/subscription-management/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import Header from "../../components/ui/Header";
import Sidebar from "../../components/ui/Sidebar";
import PageHeader from "../../components/ui/PageHeader";
import Modal, { ModalBody, ModalFooter } from "../../components/ui/Modal";
import SubscriptionTable from "./components/SubscriptionTable";
import SubscriptionFilters from "./components/SubscriptionFilters";
import SubscriptionDetailView from "./components/SubscriptionDetailView";
import CreateSubscriptionForm from "./components/CreateSubscriptionForm";
import SubscriptionStats from "./components/SubscriptionStats";
import QuickActionsPanel from "./components/QuickActionsPanel";
import PlanModificationModal from "./components/PlanModificationModal";

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const [selectedSubscriptions, setSelectedSubscriptions] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPlanModificationModalOpen, setIsPlanModificationModalOpen] =
    useState(false);
  const [modificationData, setModificationData] = useState(null);
  const [filters, setFilters] = useState({
    status: [],
    planType: [],
    billingFrequency: [],
    dateRange: { start: null, end: null },
    searchQuery: "",
  });
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Example: Replace mock subscriptions
  const mockSubscriptions = [
    {
      id: "sub-2024-101",
      customer: { name: "Avery Morgan", email: "avery.morgan@zenlytics.com" },
      plan: {
        name: "ScaleX Enterprise",
        type: "enterprise",
        billingFrequency: "monthly",
        currency: "USD",
        price: 499.99,
      },
      status: "active",
      mrr: 499.99,
      nextBillingDate: "2024-08-01",
      trial: { isTrialActive: false, trialEndDate: null },
    },
    {
      id: "sub-2024-102",
      customer: { name: "Riley Chen", email: "riley.chen@dataflux.com" },
      plan: {
        name: "Starter Flex",
        type: "starter",
        billingFrequency: "monthly",
        currency: "USD",
        price: 59.99,
      },
      status: "trial",
      mrr: 59.99,
      nextBillingDate: "2024-07-15",
      trial: { isTrialActive: true, trialEndDate: "2024-08-15" },
    },
  ];

  // Load mock data with simulated API delay
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubscriptions(mockSubscriptions);
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Handle subscription selection
  const handleSelectSubscription = (subscriptionId) => {
    setSelectedSubscriptions((prev) => {
      if (prev.includes(subscriptionId)) {
        return prev.filter((id) => id !== subscriptionId);
      } else {
        return [...prev, subscriptionId];
      }
    });
  };

  // Handle select all subscriptions
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedSubscriptions(mockSubscriptions.map((sub) => sub.id));
    } else {
      setSelectedSubscriptions([]);
    }
  };

  // Open subscription detail modal
  const handleViewSubscription = (subscriptionId) => {
    const subscription = mockSubscriptions.find(
      (sub) => sub.id === subscriptionId
    );
    setCurrentSubscription(subscription);
    setIsDetailModalOpen(true);
  };

  // Handle subscription actions
  const handleSubscriptionAction = (action, subscriptionId, data = null) => {
    const subscription = mockSubscriptions.find(
      (sub) => sub.id === subscriptionId
    );

    switch (action) {
      case "pause":
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId ? { ...sub, status: "paused" } : sub
          )
        );
        break;

      case "resume":
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId ? { ...sub, status: "active" } : sub
          )
        );
        break;

      case "cancel":
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.id === subscriptionId
              ? {
                  ...sub,
                  status: "cancelled",
                  cancelledDate: new Date().toISOString().split("T")[0],
                  nextBillingDate: null,
                  renewalDate: null,
                  mrr: 0,
                }
              : sub
          )
        );
        break;

      case "upgrade":
      case "downgrade":
        setCurrentSubscription(subscription);
        setModificationData({ type: action, subscription });
        setIsPlanModificationModalOpen(true);
        break;

      default:
        console.log(`Action ${action} not implemented`);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    console.log(
      `Performing ${action} on subscriptions:`,
      selectedSubscriptions
    );

    switch (action) {
      case "pause":
        setSubscriptions((prev) =>
          prev.map((sub) =>
            selectedSubscriptions.includes(sub.id) && sub.status === "active"
              ? { ...sub, status: "paused" }
              : sub
          )
        );
        break;

      case "resume":
        setSubscriptions((prev) =>
          prev.map((sub) =>
            selectedSubscriptions.includes(sub.id) && sub.status === "paused"
              ? { ...sub, status: "active" }
              : sub
          )
        );
        break;

      case "export":
        // Simulate export functionality
        console.log("Exporting subscriptions:", selectedSubscriptions);
        break;

      default:
        console.log(`Bulk action ${action} not implemented`);
    }

    // Clear selection after action
    setSelectedSubscriptions([]);
  };

  // Handle create subscription
  const handleCreateSubscription = (subscriptionData) => {
    const newId = `SUB-2024-${String(mockSubscriptions.length + 1).padStart(
      4,
      "0"
    )}`;

    const newSubscription = {
      id: newId,
      ...subscriptionData,
      status: subscriptionData.trial?.isTrialActive ? "trial" : "active",
      createdDate: new Date().toISOString().split("T")[0],
      usage: {
        current: 0,
        limit: subscriptionData.plan?.limits?.usage || 1000,
        percentage: 0,
      },
    };

    setSubscriptions((prev) => [newSubscription, ...prev]);
    setIsCreateModalOpen(false);
  };

  // Handle plan modification
  const handlePlanModification = (modificationData) => {
    const { subscriptionId, newPlan, prorationAmount, effectiveDate } =
      modificationData;

    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === subscriptionId
          ? {
              ...sub,
              plan: newPlan,
              mrr:
                newPlan.billingFrequency === "monthly"
                  ? newPlan.price
                  : newPlan.billingFrequency === "quarterly"
                  ? newPlan.price / 3
                  : newPlan.price / 12,
            }
          : sub
      )
    );

    setIsPlanModificationModalOpen(false);
    setModificationData(null);
  };

  // Filter subscriptions based on current filters
  const filteredSubscriptions = mockSubscriptions.filter((subscription) => {
    // Filter by status
    if (
      filters.status.length > 0 &&
      !filters.status.includes(subscription.status)
    ) {
      return false;
    }

    // Filter by plan type
    if (
      filters.planType.length > 0 &&
      !filters.planType.includes(subscription.plan.type)
    ) {
      return false;
    }

    // Filter by billing frequency
    if (
      filters.billingFrequency.length > 0 &&
      !filters.billingFrequency.includes(subscription.plan.billingFrequency)
    ) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const customerName = subscription.customer.name.toLowerCase();
      const customerEmail = subscription.customer.email.toLowerCase();
      const planName = subscription.plan.name.toLowerCase();

      if (
        !customerName.includes(query) &&
        !customerEmail.includes(query) &&
        !planName.includes(query)
      ) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      const subscriptionDate = new Date(subscription.createdDate);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);

      if (subscriptionDate < startDate || subscriptionDate > endDate) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />

      {/* Main Content */}
      <main className="pt-16 lg:content-offset">
        <div className="p-6">
          <PageHeader />

          {/* Stats Cards */}
          <SubscriptionStats subscriptions={mockSubscriptions} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filters */}
              <SubscriptionFilters
                filters={filters}
                setFilters={setFilters}
                totalSubscriptions={mockSubscriptions.length}
                filteredCount={filteredSubscriptions.length}
              />

              {/* Bulk Actions */}
              {selectedSubscriptions.length > 0 && (
                <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex items-center mb-3 sm:mb-0">
                    <Icon
                      name="CheckSquare"
                      size={20}
                      className="text-primary mr-2"
                    />
                    <span className="text-text-primary font-medium">
                      {selectedSubscriptions.length} subscriptions selected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleBulkAction("pause")}
                      className="bg-warning text-primary px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-warning-700 transition-colors duration-200"
                    >
                      <Icon name="Pause" size={16} className="mr-1.5" />
                      Pause
                    </button>

                    <button
                      onClick={() => handleBulkAction("resume")}
                      className="bg-success text-primary px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-success-700 transition-colors duration-200"
                    >
                      <Icon name="Play" size={16} className="mr-1.5" />
                      Resume
                    </button>

                    <button
                      onClick={() => handleBulkAction("export")}
                      className="bg-surface border border-border-light text-text-primary px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="Download" size={16} className="mr-1.5" />
                      Export
                    </button>

                    <button
                      onClick={() => setSelectedSubscriptions([])}
                      className="bg-surface border border-border-light text-text-primary px-3 py-1.5 rounded-lg text-sm flex items-center hover:bg-surface-hover transition-colors duration-200"
                    >
                      <Icon name="X" size={16} className="mr-1.5" />
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Subscription Table */}
              <SubscriptionTable
                subscriptions={filteredSubscriptions}
                selectedSubscriptions={selectedSubscriptions}
                onSelectSubscription={handleSelectSubscription}
                onSelectAll={handleSelectAll}
                onViewSubscription={handleViewSubscription}
                onSubscriptionAction={handleSubscriptionAction}
                isLoading={isLoading}
              />
            </div>

            {/* Quick Actions Panel */}
            <div className="xl:col-span-1">
              <QuickActionsPanel
                onCreateSubscription={() => setIsCreateModalOpen(true)}
                subscriptions={mockSubscriptions}
                selectedSubscriptions={selectedSubscriptions}
                onBulkAction={handleBulkAction}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Subscription Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Subscription ${currentSubscription?.id}`}
        size="xl"
      >
        {currentSubscription && (
          <SubscriptionDetailView
            subscription={currentSubscription}
            onAction={(action, data) => {
              handleSubscriptionAction(action, currentSubscription.id, data);
              if (action !== "upgrade" && action !== "downgrade") {
                setIsDetailModalOpen(false);
              }
            }}
            onClose={() => setIsDetailModalOpen(false)}
          />
        )}
      </Modal>

      {/* Create Subscription Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Subscription"
        size="lg"
      >
        <CreateSubscriptionForm
          onSubmit={handleCreateSubscription}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Plan Modification Modal */}
      <Modal
        isOpen={isPlanModificationModalOpen}
        onClose={() => {
          setIsPlanModificationModalOpen(false);
          setModificationData(null);
        }}
        title={`${
          modificationData?.type === "upgrade" ? "Upgrade" : "Downgrade"
        } Subscription Plan`}
        size="lg"
      >
        {modificationData && (
          <PlanModificationModal
            subscription={modificationData.subscription}
            modificationType={modificationData.type}
            onSubmit={handlePlanModification}
            onCancel={() => {
              setIsPlanModificationModalOpen(false);
              setModificationData(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default SubscriptionManagement;
