import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SearchProvider } from "@/contexts/SearchContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ImageViewer from "./pages/ImageViewer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  [
    { path: "/", element: <Index /> },
    { path: "/products", element: <Products /> },
    { path: "/products/:id", element: <ProductDetail /> },
    // New canonical URL shape: /<categoryId>/<subcategoryId>/<productId>
    { path: "/:categoryId/:subcategoryId/:productId", element: <ProductDetail /> },
    // Image viewer route: /:productIdimages
    { path: "/:productIdimages", element: <ImageViewer /> },
    // Legacy URL shape (kept for backward compatibility): /cat-XXXsubcat-YYY/<productId>
    { path: "/:catidsubcatid/:pid", element: <ProductDetail /> },
  // Some environments/browser history may still land on /ui/*.
  // Treat it as legacy and send users back to the app.
  { path: "/ui", element: <Navigate to="/" replace /> },
  { path: "/ui/*", element: <Navigate to="/" replace /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
  // @ts-expect-error - supported by react-router at runtime; types may lag depending on version
  v7_startTransition: true,
    },
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
    <RouterProvider router={router} />
      </TooltipProvider>
    </SearchProvider>
  </QueryClientProvider>
);

export default App;
