import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
import Doubts from "./pages/Doubts";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Canvas from "./presenter/Canvas/Canvas";
import Presenter from "./presenter/Presenter/Presenter";
import { Auth0Provider } from "@auth0/auth0-react";
import Ask from "./pages/Ask";
import { useEffect, useState } from "react";
import QuizWrapper from "./pages/Quiz";
import Home from "./pages/Home";
import GraphFlow from "./presenter/GraphFlow/GraphFlow";
import ProtectedRoute from "./utility/ProtectedRoutes";

function App() {
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("http://localhost:8000/api/questions");
      const questions = await res.json();
      setQuestion(Array.isArray(questions) ? questions : []);
    };
    fetchQuestions();
  }, []);

  return (
    <Auth0Provider
      domain="dev-6o4ljvnu3xn3soyd.us.auth0.com"
      clientId="UOIE5mqZovnp2P75AARo5eFPXdjJEYmm"
      authorizationParams={{
        redirect_uri: "http://localhost:5173/",
      }}
    >
      <Router>
        <div className="App min-h-screen overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <QuizWrapper questions={questions} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doubts"
              element={
                <ProtectedRoute>
                  <Doubts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ask"
              element={
                <ProtectedRoute>
                  <Ask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/canvas"
              element={
                <ProtectedRoute>
                  <Canvas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/present"
              element={
                <ProtectedRoute>
                  <Presenter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/graphflow"
              element={
                <ProtectedRoute>
                  <GraphFlow />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
