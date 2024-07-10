import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { AuthProvider } from "./context/Auth";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import LinkCard from "./pages/LinkPage";
import LinkPage from "./pages/LinkPage";
import { Toast } from "./components/ui/toast";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/toast" element={<Toast />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
