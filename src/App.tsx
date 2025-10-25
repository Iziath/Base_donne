
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/authcontext";
import { ProtectedRoute } from "@/components/auth/protectedroute";
import Login from "./pages/login";
import Index from "./pages/Index";
import Today from "./pages/Today";
import Projects from "./pages/Projects";
import Activities from "./pages/Activities";
import Beneficiaries from "./pages/Beneficiaries";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Reports from "./pages/Reports";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Route publique */}
            <Route path="/login" element={<Login />} />
            
            {/* Routes protégées */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/today" element={
              <ProtectedRoute>
                <Today />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/activities" element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            } />
            <Route path="/beneficiaries" element={
              <ProtectedRoute>
                <Beneficiaries />
              </ProtectedRoute>
            } />
            <Route path="/team" element={
              <ProtectedRoute requiredRole={['admin', 'gestionnaire']}>
                <Team />
              </ProtectedRoute>
            } />
            <Route path="/partners" element={
              <ProtectedRoute>
                <Partners />
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;