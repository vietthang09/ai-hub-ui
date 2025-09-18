import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import Profile from "./pages/Profile";
import RouteGuard from "./routes/RouteGuard";
import UsersPage from "./pages/users";
import HomePage from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
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
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
