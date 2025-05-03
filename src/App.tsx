import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import ProposalPage from "./pages/ProposalPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import PostJob from "./pages/PostJob";
import FindTalent from "./pages/FindTalent";
import FindWork from "./pages/FindWork";
import Enterprise from "./pages/Enterprise";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/find-talent" element={<FindTalent />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/about" element={<About />} />
            
            {/* Freelancer-specific Protected Routes */}
            <Route path="/jobs/:id/apply" element={
              <ProtectedRoute requiredRole="freelancer">
                <ProposalPage />
              </ProtectedRoute>
            } />
            
            {/* Client-specific Protected Routes */}
            <Route path="/post-job" element={
              <ProtectedRoute requiredRole="client">
                <PostJob />
              </ProtectedRoute>
            } />
            
            {/* General Protected Routes (accessible by both roles) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Role-based Redirects */}
            <Route path="/client" element={
              <ProtectedRoute requiredRole="client">
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />
            
            <Route path="/freelancer" element={
              <ProtectedRoute requiredRole="freelancer">
                <Navigate to="/jobs" replace />
              </ProtectedRoute>
            } />
            
            {/* 404 Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
