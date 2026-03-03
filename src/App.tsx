import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import PublishProperty from "./pages/PublishProperty";
import PropertyDetail from "./pages/PropertyDetail";
import Properties from "./pages/Properties";
import BlogDetail from "./pages/BlogDetail";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import StudentRentals from "./pages/StudentRentals";
import Financing from "./pages/Financing";
import ScrollToTop from "./components/ScrollToTop";
import React from "react";

const ChatBot = React.lazy(() => import("./components/ChatBot"));
const AdminLayout = React.lazy(() => import("./admin/components/AdminLayout"));
const AdminDashboard = React.lazy(() => import("./admin/pages/AdminDashboard"));
const AdminProperties = React.lazy(() => import("./admin/pages/AdminProperties"));
const AdminReserved = React.lazy(() => import("./admin/pages/AdminReserved"));
const AdminLeads = React.lazy(() => import("./admin/pages/AdminLeads"));
const AdminPropertySubmissions = React.lazy(() => import("./admin/pages/AdminPropertySubmissions"));
const AdminClients = React.lazy(() => import("./admin/pages/AdminClients"));
const AdminVisits = React.lazy(() => import("./admin/pages/AdminVisits"));
const AdminTeam = React.lazy(() => import("./admin/pages/AdminTeam"));
const AdminPropertyEditor = React.lazy(() => import("./admin/pages/AdminPropertyEditor"));
const AdminSystem = React.lazy(() => import("./admin/pages/AdminSystem"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/publica-tu-propiedad" element={<PublishProperty />} />
            <Route path="/publica-tu-inmueble" element={<PublishProperty />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedad/:slug" element={<PropertyDetail />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/servicios/:slug" element={<ServiceDetail />} />
            <Route path="/alquiler-estudiantes" element={<StudentRentals />} />
            <Route path="/financiacion" element={<Financing />} />

            {/* Admin CRM - Isolated module */}
            <Route path="/admin" element={
              <React.Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
                <AdminLayout />
              </React.Suspense>
            }>
              <Route index element={<React.Suspense fallback={null}><AdminDashboard /></React.Suspense>} />
              <Route path="properties" element={<React.Suspense fallback={null}><AdminProperties /></React.Suspense>} />
              <Route path="reserved" element={<React.Suspense fallback={null}><AdminReserved /></React.Suspense>} />
              <Route path="leads" element={<React.Suspense fallback={null}><AdminLeads /></React.Suspense>} />
              <Route path="property-submissions" element={<React.Suspense fallback={null}><AdminPropertySubmissions /></React.Suspense>} />
              <Route path="clients" element={<React.Suspense fallback={null}><AdminClients /></React.Suspense>} />
              <Route path="visits" element={<React.Suspense fallback={null}><AdminVisits /></React.Suspense>} />
              <Route path="team" element={<React.Suspense fallback={null}><AdminTeam /></React.Suspense>} />
              <Route path="property-editor" element={<React.Suspense fallback={null}><AdminPropertyEditor /></React.Suspense>} />
              <Route path="system" element={<React.Suspense fallback={null}><AdminSystem /></React.Suspense>} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <React.Suspense fallback={null}>
            <ChatBot />
          </React.Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
