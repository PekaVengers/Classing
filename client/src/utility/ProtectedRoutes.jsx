import { SplashScreen } from "@/components/splash-screen";
import { useAuth0 } from "@auth0/auth0-react";
import PropTypes from "prop-types";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <SplashScreen />;

  if (!isAuthenticated) {
    loginWithRedirect();
    return null; // Prevents component from rendering while redirecting
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
