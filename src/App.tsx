import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/user-context";
import RouteGuard from "./routes/RouteGuard";
import UsersPage from "./pages/users";
import HomePage from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Profile from "./pages/profile";
import GoogleReview from "./pages/google-review.tsx";
import { ReviewProvider } from "./context/review-context.tsx";
import BookingPulse from "./pages/booking-pulse/index.tsx";
import MeetingAssistant from "./pages/meeting-assistant/index.tsx";
import { MeetingProvider } from "./context/meeting-context.tsx";
import { ChatBox } from "./pages/chat-bot/index.tsx";
import { Toaster } from "react-hot-toast";
  
function App() {
  return (
    <UserProvider>
      <ReviewProvider>
        <MeetingProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
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
              <Route path="/booking-pulse" element={<BookingPulse />} />
              <Route path="/meeting-assistant" element={<MeetingAssistant />} />
              <Route path="/chat-bot" element={<ChatBox />} />
              <Route path="/google-review" element={<GoogleReview />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        </MeetingProvider>
      </ReviewProvider>
    </UserProvider>
  );
}

export default App;
