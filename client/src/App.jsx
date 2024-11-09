import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Doubts from "./pages/Doubts";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import { Auth0Provider } from "@auth0/auth0-react";
import Ask from "./pages/Ask";

function App() {
  const question = {
    text: "What is the caption of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    time: 40,
  };
  return (
    <Auth0Provider
      domain="dev-6o4ljvnu3xn3soyd.us.auth0.com"
      clientId="UOIE5mqZovnp2P75AARo5eFPXdjJEYmm"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/",
      }}
    >
      <Router>
        <div className="App min-h-screen border-2 border-black">
          <Routes>
            <Route path="/doubts" element={<Doubts />} />
            <Route path="/quiz" element={<Quiz question={question} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/ask" element={<Ask />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
