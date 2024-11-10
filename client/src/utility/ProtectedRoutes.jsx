import { Spinner } from "@/components/ui/spinner";
import { useAuth0 } from "@auth0/auth0-react";
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center">
          {/* Loading spinner using the shadcn Spinner component */}
          <Spinner className="w-10 h-10 text-primary animate-spin" />
        </div>
      </div>
    );

  if (!isAuthenticated) {
    loginWithRedirect();
    return null; // Prevents component from rendering while redirecting
  }

  return children;
}
