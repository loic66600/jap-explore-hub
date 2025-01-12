import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CitiesPage from "./pages/Cities";
import Booking from "./pages/Booking";
import Accommodation from "./pages/Accommodation";
import CityDetail from "./pages/CityDetail";
import PlannerPage from "./pages/PlannerPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/cities/:cityId" element={<CityDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/planner" element={<PlannerPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;