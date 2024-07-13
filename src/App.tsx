import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import Header from "./components/Header";
import { Toast } from "./components/ui/toast";
import { Suspense, lazy } from "react";
import SkeletonCard from "./components/SkeletonCard";
import { ToastContainer } from "react-toastify";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const LinkPage = lazy(() => import("./pages/LinkPage"));
import "react-toastify/dist/ReactToastify.css";
import RedirectLink from "./pages/RedirectLink";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Suspense fallback={<SkeletonCard />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/link" element={<LinkPage />} />
            <Route path="/toast" element={<Toast />} />
            <Route path="/:id" element={<RedirectLink />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
