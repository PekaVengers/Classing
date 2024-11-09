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
            <Route path="/doubts" element={<Doubts />} />
            <Route
              path="/quiz"
              element={<QuizWrapper questions={questions} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/ask" element={<Ask />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/present" element={<Presenter />} />
            <Route path="/graphflow" element={<GraphFlow />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
