
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-upwork-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Clients</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  How to Hire
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Talent Marketplace
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Project Catalog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Talent Scout
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Payroll Services
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Direct Contracts
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Hire Worldwide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">For Talent</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  How to Find Work
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Direct Contracts
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Find Freelance Jobs Worldwide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Find Freelance Jobs in the USA
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Upwork Reviews
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Affiliate Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Upwork Foundation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition-colors">
                  Trust, Safety & Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 pb-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <Link to="/" className="mr-6">
                <svg viewBox="0 0 102 28" className="h-7 w-20 text-white fill-current">
                  <path d="M28.18,19.06A6.54,6.54,0,0,1,23,16c.67-5.34,2.62-7,5.2-7s4.54,2,4.54,5-2,5.05-4.54,5.05m0-13.68a7.46,7.46,0,0,0-7.73,6.4,7.46,7.46,0,0,0-7.73-6.4C9.12,5.38,6,9.05,6,14.32a13.26,13.26,0,0,0,1.92,6.9l3.12-1.57a11.84,11.84,0,0,1-1.55-5.33c0-3,1.56-5.05,4.54-5.05s4.54,2,4.54,5.05a11.75,11.75,0,0,1-1.29,5.33h3.48A11.75,11.75,0,0,1,20.47,14c0-3,1.56-5.05,4.54-5.05s4.54,2.06,4.54,5.05a11.84,11.84,0,0,1-1.55,5.33l3.12,1.57a13.26,13.26,0,0,0,1.92-6.9c0-5.27-3.12-8.94-6.94-8.94"></path>
                  <path d="M67.59,22.49c-3.36,0-6.07-2.8-6.07-7s2.71-7,6.07-7,6.07,2.8,6.07,7-2.72,7-6.07,7m0-17.92A10.28,10.28,0,0,0,57.33,15a10.56,10.56,0,0,0,10.26,10.52A10.46,10.46,0,0,0,75,21.23V25h4.48V15.05C79.52,9.34,74.42,4.57,67.59,4.57"></path>
                  <polygon points="48.22 4.92 41.94 16.14 35.66 4.92 30.42 4.92 40.23 21.41 40.23 25.01 44.7 25.01 44.7 20.92 53.46 4.92 48.22 4.92"></polygon>
                  <path d="M96.92,5.07,89.45,19.17l-7.47-14.1H77.47L88.1,24.92l-.6,1.21c-1,2-2.3,2.86-4,2.86a5.23,5.23,0,0,1-3.38-1.25L78.3,31.52a8.73,8.73,0,0,0,5.1,1.42c3.27,0,5.78-1.42,7.6-5.13l10.6-22.74Z"></path>
                </svg>
              </Link>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                CA Notice at Collection
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Settings
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <div className="text-center md:text-left text-xs text-gray-500 mt-6">
            © 2023 Upwork® Global Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
