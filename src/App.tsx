import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BottomNav from "./components/NavigationBotton";
import { BookingPage } from "./pages/booking";
import CameraDetail from "./pages/Camera/DetailCamera";
import CameraListPage from "./pages/Camera/ListCamera";
import { CreateBooking } from "./pages/booking/CreateBooking";
import { BalancePage } from "./pages/balance/balance";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
          <Routes>
            <Route path="/" element={<Home />} />
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
  );
};

export default App;
