import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { VotingPeriodProvider } from "@/contexts/VotingPeriodContext";
import { useEffect } from "react";
import Index from "./pages/Index";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import IntroPage from "./pages/IntroPage";
import VotePage from "./pages/VotePage";
import PageNavigation from "@/components/PageNavigation";

// ScrollToTop component to handle scrolling on route changes
const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Smoothly scroll to top on PUSH navigation
    if (navigationType === "PUSH") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, navigationType]);

  return null;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="moviepulse-theme">
        <VotingPeriodProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <ScrollToTop />
              {/* Fixed header component */}
              <PageNavigation />
              {/* Main content with top padding to avoid header overlap */}
              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<IntroPage />} />
                  <Route path="/home" element={<Index />} />
                  <Route path="/stats" element={<StatsPage />} />
                  <Route path="/vote" element={<VotePage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </Router>
          </TooltipProvider>
        </VotingPeriodProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
