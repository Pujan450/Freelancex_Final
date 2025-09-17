import React from "react";
import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import BecomeSeller from "./pages/seller/BecomeSeller";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Add the AuthProvider import
import { AuthProvider } from "./context/AuthContext";

import Project from "./pages/project/Project";
import Profile from "./pages/profile/Profile";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          {/* ✅ Wrap QueryClientProvider with AuthProvider */}
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <ScrollToTop>
                <Outlet />
              </ScrollToTop>
              <Footer />
            </QueryClientProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: "/mygigs", element: <ProtectedRoute><MyGigs /></ProtectedRoute> },
        { path: "/add", element: <ProtectedRoute><Add /></ProtectedRoute> },
        { path: "/messages", element: <ProtectedRoute><Messages /></ProtectedRoute> },
        { path: "/message/:id", element: <ProtectedRoute><Message /></ProtectedRoute> },
        { path: "/pay/:id", element: <ProtectedRoute><Pay /></ProtectedRoute> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/success", element: <Success /> },
        { path: "/become-seller", element: <ProtectedRoute><BecomeSeller /></ProtectedRoute> },
        { path: "/project/:id", element: <Project /> },
        { path: "/user/:username", element: <Profile /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;