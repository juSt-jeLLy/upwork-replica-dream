import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState<"freelancer" | "client">("freelancer");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast.error("You must agree to the terms of service");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup({
        firstName,
        lastName,
        email,
        password,
        country,
        role,
      });
      
      toast.success("Account created successfully!");
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      console.error("Signup error:", error);
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
            <h1 className="text-2xl font-bold text-upwork-black">Sign up to find work you love</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <Input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <Input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password (8+ characters)
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I want to
              </label>
              <Select value={role} onValueChange={(value: "freelancer" | "client") => setRole(value)} disabled={isLoading}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelancer">Work as a freelancer</SelectItem>
                  <SelectItem value="client">Hire for a project</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start">
              <Checkbox
                id="agree-terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                className="h-4 w-4 mt-1 text-upwork-green focus:ring-upwork-green"
                disabled={isLoading}
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                Yes, I understand and agree to the Upwork Terms of Service, including the User Agreement and Privacy Policy
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-upwork-green hover:bg-upwork-dark-green text-white py-6"
              disabled={isLoading || !agreeTerms}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create My Account"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account? 
              <Link to="/login" className="text-upwork-green hover:text-upwork-dark-green ml-1">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
