import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react"; // ← đổi từ @heroui/system
import { UserProvider } from "./context/UserContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserTable from "./pages/UserTable";
import RouteGuard from "./routes/RouteGuard";

function App() {
  return (
    <HeroUIProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Guest routes */}
            <Route
              path="/login"
              element={
                <RouteGuard type="guest">
                  <Login />
                </RouteGuard>
              }
            />
            <Route
              path="/register"
              element={
                <RouteGuard type="guest">
                  <Register />
                </RouteGuard>
              }
            />

            {/* Protected routes */}
            <Route element={<RouteGuard type="protected" />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/usertable" element={<UserTable />} />{" "}
              {/* ← thêm "/" */}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </HeroUIProvider>
  );
}

export default App;
