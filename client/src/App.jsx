import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, useEffect, useState, lazy } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedRoute from "./utility/ProtectedRoutes";
import { SplashScreen } from "./components/splash-screen";
import Model from "./presenter/Avatar/Model";
const Doubts = lazy(() => import("./pages/Doubts"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Canvas = lazy(() => import("./presenter/Canvas/Canvas"));
const Presenter = lazy(() => import("./presenter/Presenter/Presenter"));
const Ask = lazy(() => import("./pages/Ask"));
const QuizWrapper = lazy(() => import("./pages/Quiz"));
const Home = lazy(() => import("./pages/Home"));
const GraphFlow = lazy(() => import("./presenter/GraphFlow/GraphFlow"));

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
      <Suspense fallback={<SplashScreen />}>
        <Router>
          <div className="App min-h-screen overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/quiz"
                element={
                  //<ProtectedRoute>
                  <QuizWrapper questions={questions} />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/doubts"
                element={
                  //<ProtectedRoute>
                  <Doubts />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  //<ProtectedRoute>
                  <Profile />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  //   //<ProtectedRoute>
                  <AdminDashboard />
                  //  //</ProtectedRoute>
                }
              />
              <Route
                path="/ask"
                element={
                  //   //<ProtectedRoute>
                  <Ask />
                  //  //</ProtectedRoute>
                }
              />
              <Route
                path="/canvas"
                element={
                  //<ProtectedRoute>
                  <Canvas />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/present"
                element={
                  //<ProtectedRoute>
                  <Presenter />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/graphflow"
                element={
                  //<ProtectedRoute>
                  <GraphFlow />
                  //</ProtectedRoute>
                }
              />
              <Route
                path="/avatar"
                element={
                  <div className="h-screen w-screen">
                    <Model />
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </Auth0Provider>
  );
}

export default App;
