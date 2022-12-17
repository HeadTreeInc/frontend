import React from 'react';
// import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Login from './components/onboarding/login.js';
import Registration from './components/onboarding/registration.js';
import Dashboard from './components/dashboard/index.js';
import UserProfile from './components/userProfile/index.js';
import ChangePassword from './components/userProfile/changePassword.js';
import ApplyForLimit from './components/finance/invoiceDiscounting/exporter/applyLimit.js';
import Quotes from './components/finance/invoiceDiscounting/exporter/quotes.js';
import BuyerComponent from './components/buyer/index.js';
import Contract from './components/finance/invoiceDiscounting/exporter/contract.js';
import ApplyForFinance from './components/finance/invoiceDiscounting/exporter/applyForFinance.js';
import ApprovedFinance from './components/finance/invoiceDiscounting/exporter/approvedFinance.js';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/changepassword" element={<ChangePassword />} />

          <Route exact path="/limit" element={<ApplyForLimit />} />
          <Route exact path="/quotes" element={<Quotes />} />
          <Route exact path="/buyer" element={<BuyerComponent />} />
          <Route exact path="/contract" element={<Contract />} />
          <Route exact path="/applyFin" element={<ApplyForFinance />} />
          <Route exact path="/approvedFin" element={<ApprovedFinance />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
