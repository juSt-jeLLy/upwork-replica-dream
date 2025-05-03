import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'freelancer' | 'client';
  redirectPath?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole,
  redirectPath = '/login'
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading, checkUserPermission, getUserRole } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-upwork-green"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login with redirect path
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // Check role-based permissions if required
  if (requiredRole && !checkUserPermission(requiredRole)) {
    const currentRole = getUserRole();
    
    // Show proper toast message
    toast.error(`You don't have permission to access this page. This page is for ${requiredRole}s only.`);
    
    // Redirect to appropriate dashboard based on user role
    if (currentRole === 'freelancer') {
      return <Navigate to="/jobs" replace />;
    } else if (currentRole === 'client') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has permission, render the children
  return <>{children}</>;
};

export default ProtectedRoute; 