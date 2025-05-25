import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-white">
          <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/camera" element={<CameraListPage />} />
              <Route path="/camera/:id" element={<CameraDetail />} />
              <Route path="/booking/*" element={<BookingPage />} />
              <Route path="/booking/:id" element={<CreateBooking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/balance" element={<BalancePage />} />
            </Routes>
            <BottomNav />
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;