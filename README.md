# Sublytic – Modern SaaS Subscription Billing Platform

## 🚀 What is this project about?

Sublytic is a full-featured, production-ready SaaS subscription billing platform designed for modern businesses. It provides a comprehensive suite of tools for managing recurring billing, subscriptions, invoicing, analytics, customer self-service, dunning management, and payment gateway integrations—all with a unique, dark-themed UI and enterprise-grade UX.

### Key Features

- **Billing Dashboard:** Real-time metrics (MRR, ARR, churn, active subscriptions, pending invoices) and revenue analytics.
- **Subscription Management:** Create, modify, pause, resume, and cancel customer subscriptions with flexible plans and trials.
- **Invoice Management:** Generate, send, and track invoices with status management, PDF export, and bulk actions.
- **Customer Portal:** Self-service portal for customers to view usage, manage payment methods, download invoices, and update notification settings.
- **Dunning Management:** Automated workflows for failed payments, retries, escalations, and recovery analytics.
- **Payment Gateway Integration:** Multi-provider support (Stripe, Razorpay, Paddle, and more) with priority ordering and health monitoring.
- **Analytics & Reporting:** Visualize trends, usage, and growth with interactive charts and dashboards.
- **User Authentication:** Secure login, registration, MFA, and password reset flows.
- **Responsive Design:** Fully mobile-friendly and accessible UI.
- **Customizable Dark Theme:** Unique, modern look with Tailwind CSS and custom color palette.

## 🛠️ Tech Stack, Libraries & Tools

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (with plugins: forms, typography, aspect-ratio, container-queries, fluid-type, animation, elevation)
- **Data Visualization:** D3.js, Recharts
- **Form Management:** React Hook Form
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **HTTP Requests:** Axios
- **Date Utilities:** date-fns
- **Testing:** Jest, React Testing Library
- **Environment Management:** dotenv
- **Component Tagging:** @dhiwise/component-tagger
- **Build/Dev Utilities:** PostCSS, Autoprefixer, Vite plugins (tsconfig-paths, react)

## 👥 Target Audience & Benefits

**Who is this for?**

- SaaS founders, product teams, and developers who need a robust, ready-to-use billing and subscription management solution.
- Startups and enterprises looking to accelerate go-to-market for their SaaS products without building billing infrastructure from scratch.
- Finance, operations, and customer success teams who want real-time insights and automation for revenue operations.

**Benefits:**

- **Faster Launch:** Skip months of billing system development—get a beautiful, production-ready platform out of the box.
- **Enterprise-Grade:** Handles complex billing, dunning, and analytics needs for growing SaaS businesses.
- **Customizable:** Built with modern, open-source tools for easy extension and branding.
- **User-Centric:** Intuitive, accessible UI for both admins and customers.

---

> Built with ❤️ using React, Vite, and Tailwind CSS. For more details, see the codebase and documentation.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.
