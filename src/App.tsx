import AuthLayout from "./_auth/AuthLayout";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
