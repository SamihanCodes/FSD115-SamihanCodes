import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import Listings from "./pages/Listings";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/listings" element={<Listings />} />

<Route
  path="/listings/create"
  element={
    <ProtectedRoute>
      <CreateListing />
    </ProtectedRoute>
  }
/>

<Route
  path="/listings/my"
  element={
    <ProtectedRoute>
      <MyListings />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
