import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UserTable from "./pages/UserTable";
import RouteGuard from "./routes/RouteGuard";
import { Dialog } from "./components/ui/dialog";
 
function App() {
  return (
    <Dialog>
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
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
       </UserProvider>
    </Dialog>
  );
}

export default App;
