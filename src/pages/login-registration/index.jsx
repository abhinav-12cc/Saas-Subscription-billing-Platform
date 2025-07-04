import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import MFAModal from "./components/MFAModal";
import PasswordResetForm from "./components/PasswordResetForm";

const LoginRegistration = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [showMFA, setShowMFA] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mfaMethod, setMfaMethod] = useState("totp");

  // Mock credentials for testing
  const mockCredentials = {
    admin: { email: "admin@sublyticdemo.com", password: "Admin@456" },
    finance: { email: "finance@sublyticdemo.com", password: "Finance@456" },
    customer: { email: "customer@company.com", password: "Customer@123" },
  };

  const handleLogin = async (formData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check mock credentials
    const isValidCredential = Object.values(mockCredentials).some(
      (cred) =>
        cred.email === formData.email && cred.password === formData.password
    );

    if (!isValidCredential) {
      setIsLoading(false);
      throw new Error(
        "Invalid email or password. Please use: admin@sublyticdemo.com / Admin@456"
      );
    }

    // Simulate MFA requirement for admin
    if (formData.email === mockCredentials.admin.email) {
      setIsLoading(false);
      setShowMFA(true);
      return;
    }

    setIsLoading(false);
    navigate("/billing-dashboard");
  };

  const handleRegistration = async (formData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    navigate("/billing-dashboard");
  };

  const handleMFAVerification = async (code) => {
    setIsLoading(true);

    // Simulate MFA verification
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code !== "123456") {
      setIsLoading(false);
      throw new Error("Invalid verification code. Use: 123456");
    }

    setIsLoading(false);
    setShowMFA(false);
    navigate("/billing-dashboard");
  };

  const handlePasswordReset = async (email) => {
    setIsLoading(true);

    // Simulate password reset
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setShowPasswordReset(false);
    setActiveTab("login");
  };

  const handleForgotPassword = () => {
    setShowPasswordReset(true);
  };

  const handleBackToLogin = () => {
    setShowPasswordReset(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-card">
              <Icon name="DollarSign" size={28} className="text-white" />
            </div>
            <span className="text-3xl font-bold text-text-primary">
              Sublytic
            </span>
          </div>
          <p className="text-text-secondary">
            Enterprise SaaS Billing Platform
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-surface rounded-2xl shadow-modal border border-border-light overflow-hidden">
          {!showPasswordReset ? (
            <>
              {/* Tab Navigation */}
              <div className="border-b border-border-light">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("login")}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                      activeTab === "login"
                        ? "text-primary border-b-2 border-primary bg-primary-50"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab("register")}
                    className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
                      activeTab === "register"
                        ? "text-primary border-b-2 border-primary bg-primary-50"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {activeTab === "login" ? (
                  <LoginForm
                    onSubmit={handleLogin}
                    onForgotPassword={handleForgotPassword}
                    isLoading={isLoading}
                  />
                ) : (
                  <RegistrationForm
                    onSubmit={handleRegistration}
                    isLoading={isLoading}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="p-8">
              <PasswordResetForm
                onSubmit={handlePasswordReset}
                onBack={handleBackToLogin}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-text-tertiary">
          <p>© {new Date().getFullYear()} Sublytic Inc. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </button>
            <button className="hover:text-primary transition-colors duration-200">
              Support
            </button>
          </div>
        </div>
      </div>

      {/* MFA Modal */}
      <MFAModal
        isOpen={showMFA}
        onClose={() => setShowMFA(false)}
        onVerify={handleMFAVerification}
        method={mfaMethod}
        onMethodChange={setMfaMethod}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LoginRegistration;
