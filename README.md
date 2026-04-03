# Zorvyn Finance Dashboard

A clean, interactive, and beautifully designed finance dashboard interface built for the Zorvyn frontend developer assignment.

---

## 🚀 Setup Instructions

This project is built using a modern frontend stack (**React**, **Vite**, **Tailwind CSS v3**). Follow these instructions to launch the application locally:

### Prerequisites
*   Node.js installed on your machine.

### Installation & Running

1. **Clone or Download** the repository to your local machine.
2. Open your terminal and navigate to the project directory:
   ```bash
   cd Finance_Dashboard_UI
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. Open your web browser and navigate to `http://localhost:5173` (or the local URL printed in your terminal).

---

## 🧠 Overview of Approach

The core objective was to build an intuitive graphical interface for users to track their financial activity without relying on a backend. I approached this problem by focusing on these key technical and design pillars:

1.  **Architecture:** I initialized the project with **Vite** for incredibly fast Hot Module Replacement (HMR) and optimized build outputs. The component architecture utilizes React 18 to isolate the UI into independent features (`Sidebar`, `Dashboard Overview`, `Transactions`, `TransactionModal`). 
2.  **State Management Strategy:** I implemented the `React Context API` powered by `useReducer/useState`. This acts as a centralized "source of truth", mitigating prop-drilling. The state dynamically syncs to the browser's `localStorage` to emulate database persistence across hard refreshes.
3.  **Solving Layout Resiliency (The Flex Canvas Bug):** Many HTML canvas-based charting libraries trigger an infinite expansion bug inside dynamic flexbox grids. I mitigated this resiliently by utilizing **Recharts** (SVG rendering over raw `<canvas>`) packaged efficiently within `<ResponsiveContainer>` wrappers. This is reinforced via explicit `min-h-0` structural constraints in Tailwind.
4.  **Premium Aesthetics:** Rather than rely purely on out-of-the-box UI libraries, I customized a deep, "glassmorphism" inspired dark theme using **Tailwind CSS**. It incorporates curated, modern web design techniques such as subtle hover actions, pill-badges, and Google's Inter font hierarchy to establish a high-tier impression.

---

## ✨ Explanation of Features

### 1. Dashboard Overview
The homepage is a high-level summary of a user's wallet.
*   **KPI Summary Cards**: Automatically recalculates and outputs *Total Balance*, *Total Income*, and *Total Expenses* based on local transaction data.
*   **Balance Trend Chart**: A smooth spline line-chart visualizing chronological spending/income balances.
*   **Categorical Spending Chart**: A dynamic donut chart that slices only expense-typed datasets cleanly by category.

### 2. Transactions Center
A detailed exploration tab rendering all recorded transactions.
*   **Data Grid**: Maps out Dates, Descriptions, Categories, Tags, and Amounts in a highly legible layout.
*   **Real-time Filter & Search**: A live search bar actively scans `Descriptions` or `Categories` for immediate matching. Dropdowns allow users to filter strictly for Income or Expense lines.

### 3. Basic Role-Based Access Control (RBAC) UI
An interface simulation of organizational permissions. Located smoothly in the navigation sidebar, the user can toggle their role:
*   **Viewer (Default)**: Read-only access to graphics and transactions.
*   **Admin**: Unlocks additional management tools. When active, an "Add Transaction" button appears in the Transactions center, firing off a heavily customized Modal form. Individual "Delete" icons also render down the transaction rows. 

### 4. Dynamic Insights Engine
A right-hand panel on the Dashboard analyzes the data locally.
*   **Highest Spending Category**: Programmatically groups sums to alert the user of what category costs the most.
*   **Monthly Comparison**: Calculates the current month's expenses versus the previous month, dynamically outputting "Up %" or "Down %" growth metric tags.
