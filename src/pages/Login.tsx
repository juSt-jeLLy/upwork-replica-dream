import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface LocationState {
  from?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const redirectPath = state?.from || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      
      // Redirect user to the intended page or dashboard
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-upwork-black">Log in to Upwork</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email or Username
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email or Username"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="h-4 w-4 text-upwork-green focus:ring-upwork-green"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Keep me logged in
                </label>
              </div>

              <Link to="/forgot-password" className="text-sm text-upwork-green hover:text-upwork-dark-green">
                Forgot Password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-upwork-green hover:bg-upwork-dark-green text-white py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Log In"
              )}
            </Button>
            
            {/* Demo account info for easy testing */}
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
              <p className="font-medium mb-1">Demo Accounts:</p>
              <p><span className="font-medium">Freelancer:</span> john@example.com</p>
              <p><span className="font-medium">Client:</span> jane@example.com</p>
              <p className="text-xs text-gray-500 mt-1">Any password will work for these demo accounts</p>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an Upwork account? 
              <Link to="/signup" className="text-upwork-green hover:text-upwork-dark-green ml-1">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
