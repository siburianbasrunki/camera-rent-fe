import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BottomNav from "./components/NavigationBotton";
import { BookingPage } from "./pages/booking";
import CameraDetail from "./pages/Camera/DetailCamera";
import CameraListPage from "./pages/Camera/ListCamera";
import { CreateBooking } from "./pages/booking/CreateBooking";
import { BalancePage } from "./pages/balance/balance";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { OtpPage } from "./pages/otp";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideBottomNav =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/otp";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
        <Routes>
          {/* Public Routes - tidak perlu login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes - semua route lainnya */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camera"
            element={
              <ProtectedRoute>
                <CameraListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/camera/:id"
            element={
              <ProtectedRoute>
                <CameraDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/*"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:id"
            element={
              <ProtectedRoute>
                <CreateBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <ProtectedRoute>
                <BalancePage />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!hideBottomNav && <BottomNav />}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
