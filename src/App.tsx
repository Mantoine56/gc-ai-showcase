import { Suspense, lazy, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AuthProvider } from "@/auth/AuthProvider";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const SubmitProject = lazy(() => import("./pages/SubmitProject"));
const EditProject = lazy(() => import("./pages/EditProject"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const AdminStats = lazy(() => import("./pages/AdminStats"));
const ReviewQueue = lazy(() => import("./pages/ReviewQueue"));

const queryClient = new QueryClient();

const LazyPage = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading...</div>}>
    {children}
  </Suspense>
);

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route
              path="/project/:id/edit"
              element={
                <LazyPage>
                  <EditProject />
                </LazyPage>
              }
            />
            <Route
              path="/submit"
              element={
                <LazyPage>
                  <SubmitProject />
                </LazyPage>
              }
            />
            <Route
              path="/resources"
              element={
                <LazyPage>
                  <Resources />
                </LazyPage>
              }
            />
            <Route
              path="/about"
              element={
                <LazyPage>
                  <About />
                </LazyPage>
              }
            />
            <Route
              path="/accessibility"
              element={
                <LazyPage>
                  <Accessibility />
                </LazyPage>
              }
            />
            <Route
              path="/admin/stats"
              element={
                <LazyPage>
                  <AdminStats />
                </LazyPage>
              }
            />
            <Route
              path="/admin/review"
              element={
                <LazyPage>
                  <ReviewQueue />
                </LazyPage>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
