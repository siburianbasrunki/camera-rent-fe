import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BottomNav from "./components/NavigationBotton";
import { BookingPage } from "./pages/booking";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking/*" element={<BookingPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
};

export default App;
