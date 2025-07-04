// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Page imports
import LoginRegistration from "./pages/login-registration";
import BillingDashboard from "./pages/billing-dashboard";
import InvoiceManagement from "./pages/invoice-management";
import SubscriptionManagement from "./pages/subscription-management";
import UsageAnalyticsReporting from "./pages/usage-analytics-reporting";
import PaymentGatewayConfiguration from "./pages/payment-gateway-configuration";
import CustomerPortal from "./pages/customer-portal";
import DunningManagement from "./pages/dunning-management";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-registration" element={<LoginRegistration />} />
          <Route path="/billing-dashboard" element={<BillingDashboard />} />
          <Route path="/invoice-management" element={<InvoiceManagement />} />
          <Route path="/subscription-management" element={<SubscriptionManagement />} />
          <Route path="/usage-analytics-reporting" element={<UsageAnalyticsReporting />} />
          <Route path="/payment-gateway-configuration" element={<PaymentGatewayConfiguration />} />
          <Route path="/customer-portal" element={<CustomerPortal />} />
          <Route path="/dunning-management" element={<DunningManagement />} />
          <Route path="/" element={<LoginRegistration />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;