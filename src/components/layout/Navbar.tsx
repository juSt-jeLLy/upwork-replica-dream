import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronDown, 
  Menu, 
  Search, 
  X, 
  Briefcase, 
  PlusSquare,
  LogOut, 
  User as UserIcon 
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg viewBox="0 0 102 28" className="h-8 w-24 text-upwork-green fill-current">
                <path d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5.05-4.54,5.05m0-13.68a7.46,7.46,0,0,0-7.73,6.4,7.46,7.46,0,0,0-7.73-6.4C9.12,5.38,6,9.05,6,14.32a13.26,13.26,0,0,0,1.92,6.9l3.12-1.57a11.84,11.84,0,0,1-1.55-5.33c0-3,1.56-5.05,4.54-5.05s4.54,2,4.54,5.05a11.75,11.75,0,0,1-1.29,5.33h3.48A11.75,11.75,0,0,1,20.47,14c0-3,1.56-5.05,4.54-5.05s4.54,2.06,4.54,5.05a11.84,11.84,0,0,1-1.55,5.33l3.12,1.57a13.26,13.26,0,0,0,1.92-6.9c0-5.27-3.12-8.94-6.94-8.94"></path>
                <path d="M67.59,22.49c-3.36,0-6.07-2.8-6.07-7s2.71-7,6.07-7,6.07,2.8,6.07,7-2.72,7-6.07,7m0-17.92A10.28,10.28,0,0,0,57.33,15a10.56,10.56,0,0,0,10.26,10.52A10.46,10.46,0,0,0,75,21.23V25h4.48V15.05C79.52,9.34,74.42,4.57,67.59,4.57"></path>
                <polygon points="48.22 4.92 41.94 16.14 35.66 4.92 30.42 4.92 40.23 21.41 40.23 25.01 44.7 25.01 44.7 20.92 53.46 4.92 48.22 4.92"></polygon>
                <path d="M96.92,5.07,89.45,19.17l-7.47-14.1H77.47L88.1,24.92l-.6,1.21c-1,2-2.3,2.86-4,2.86a5.23,5.23,0,0,1-3.38-1.25L78.3,31.52a8.73,8.73,0,0,0,5.1,1.42c3.27,0,5.78-1.42,7.6-5.13l10.6-22.74Z"></path>
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-upwork-black hover:text-upwork-green transition-colors">
                Find Talent
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link to="/post-job" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Post a Job</Link>
                  <Link to="/find-talent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Talent Marketplace</Link>
                  <Link to="/find-talent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Project Catalog</Link>
                  <Link to="/find-talent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Talent Scout</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-upwork-black hover:text-upwork-green transition-colors">
                Find Work
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link to="/jobs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Find Jobs</Link>
                  <Link to="/find-work" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Saved Jobs</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Proposals</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-upwork-black hover:text-upwork-green transition-colors">
                Why Upwork
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Success Stories</Link>
                  <Link to="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Reviews</Link>
                  <Link to="/find-talent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">How to Hire</Link>
                  <Link to="/find-work" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">How to Find Work</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center text-upwork-black hover:text-upwork-green transition-colors">
                Enterprise
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-1">
                  <Link to="/enterprise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Enterprise Overview</Link>
                  <Link to="/enterprise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hire an Agency</Link>
                  <Link to="/enterprise" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Compliance Solutions</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search jobs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Right side - Login/Signup or User Menu */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center text-upwork-black hover:text-upwork-green font-medium">
                    <Briefcase className="mr-1 h-4 w-4" />
                    Dashboard
                  </Link>
                  
                  {user?.role === 'client' && (
                    <Link to="/post-job">
                      <Button variant="outline" className="flex items-center">
                        <PlusSquare className="mr-1 h-4 w-4" />
                        Post Job
                      </Button>
                    </Link>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-upwork-green text-white">
                          {user ? user.firstName.charAt(0) + user.lastName.charAt(0) : <UserIcon className="h-4 w-4" />}
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>My Jobs</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-upwork-black hover:text-upwork-green font-medium">
                    Log In
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-upwork-black" />
              ) : (
                <Menu className="h-6 w-6 text-upwork-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="text"
                placeholder="Search jobs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <div className="space-y-1">
              <Link to="/find-talent" className="block py-2 text-upwork-black">
                Find Talent
              </Link>
              <Link to="/find-work" className="block py-2 text-upwork-black">
                Find Work
              </Link>
              <Link to="/about" className="block py-2 text-upwork-black">
                Why Upwork
              </Link>
              <Link to="/enterprise" className="block py-2 text-upwork-black">
                Enterprise
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block py-2 text-upwork-black flex items-center">
                    <Briefcase className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  {user?.role === 'client' && (
                    <Link to="/post-job" className="block py-2 text-upwork-black flex items-center">
                      <PlusSquare className="mr-2 h-4 w-4" />
                      Post Job
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center py-2 text-upwork-black"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </button>
                </>
              ) : (
                <div className="pt-4 space-y-2">
                  <Link to="/login" className="block py-2 text-upwork-black">
                    Log In
                  </Link>
                  <Link to="/signup" className="block">
                    <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
