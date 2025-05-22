import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./components/Dashboard";
import HelpFAQ from "./components/HelpFAQ";
import AboutUs from "./components/AboutUs";
import VerifyEmail from "./components/VerifyEmail"; // <-- Import the component
import RequestVerification from "./components/RequestVerification";
import SectionsForm from "./components/SectionsForm";

function App() {
  // Load token/user from localStorage on app start
  useEffect(() => {
    useAuthStore.getState().loadFromStorage();
  }, []);

  const token = useAuthStore((state) => state.token);

  // Protect dashboard route
  const PrivateRoute = ({ children }: { children: React.ReactNode }) =>
    token ? children : <Navigate to="/login" replace />;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/help-faq" element={<HelpFAQ />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />{" "}
        {/* <-- Add this line */}
        <Route path="/verify-email" element={<RequestVerification />} />
        <Route
          path="/sections"
          element={
            <PrivateRoute>
              <SectionsForm />
            </PrivateRoute>
          }
        />
        {/* Default route: redirect to dashboard if logged in, else to login */}
        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
