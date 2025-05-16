import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard, { JobProps } from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { Filter, ArrowDownUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJobsStore } from "@/stores/JobsStore";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Jobs = () => {
  const location = useLocation();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const { jobs } = useJobsStore();

  // Parse search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Filter jobs based on search query
  const filteredJobs = searchQuery
    ? jobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : jobs;

  // Sort jobs based on the selected option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        // Here we're assuming more recent posts have "Just now" or "X hours ago"
        // In a real app, you'd compare actual dates
        return a.posted.includes('now') ? -1 : b.posted.includes('now') ? 1 : 0;
      case 'client-rating':
        return (b.clientRating || 0) - (a.clientRating || 0);
      case 'client-spent':
        // Convert "K" to actual numbers for comparison
        const aSpent = a.clientSpent ? parseFloat(a.clientSpent.replace('K', '')) * 1000 : 0;
        const bSpent = b.clientSpent ? parseFloat(b.clientSpent.replace('K', '')) * 1000 : 0;
        return bSpent - aSpent;
      default:
        // Default is relevance, which we'll keep as is
        return 0;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The URL will be updated by the Navbar component
    // This is for the search box on this page
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Jobs</h1>
          
          {/* Search box */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="relative max-w-md">
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
          
          {/* Sort and Filter options - Mobile */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="py-4 h-full overflow-y-auto">
                  <JobFilters />
                </div>
              </SheetContent>
            </Sheet>
            
            <Select defaultValue={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="client-rating">Client Rating</SelectItem>
                <SelectItem value="client-spent">Client Spent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters - Desktop */}
            <div className="hidden md:block">
              <div className="sticky top-24">
                <JobFilters />
              </div>
            </div>
            
            {/* Job Listings */}
            <div className="lg:col-span-3">
              {/* Sort options - Desktop */}
              <div className="hidden md:flex justify-end mb-4">
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-upwork-gray">Sort by:</span>
                  <Select defaultValue={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[160px] bg-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="client-rating">Client Rating</SelectItem>
                      <SelectItem value="client-spent">Client Spent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Search Results Summary */}
              {searchQuery && (
                <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-upwork-gray">
                    {sortedJobs.length === 0 
                      ? `No results found for "${searchQuery}"`
                      : `${sortedJobs.length} ${sortedJobs.length === 1 ? 'job' : 'jobs'} found for "${searchQuery}"`
                    }
                  </p>
                </div>
              )}
              
              {/* Job Cards */}
              <div>
                {sortedJobs.length > 0 ? (
                  sortedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
                    <p className="text-gray-600 mb-4">
                      {searchQuery 
                        ? `There are no jobs matching "${searchQuery}" at the moment.`
                        : 'There are no jobs matching your criteria at the moment.'
                      }
                    </p>
                    <Button onClick={() => window.location.reload()}>Refresh</Button>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {sortedJobs.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a
                      href="#"
                      className="inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm text-upwork-gray hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="inline-flex items-center border border-upwork-green bg-upwork-green/10 px-4 py-2 text-sm font-medium text-upwork-green"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-upwork-gray hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-upwork-gray hover:bg-gray-50"
                    >
                      3
                    </a>
                    <span className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-upwork-gray">
                      ...
                    </span>
                    <a
                      href="#"
                      className="inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm text-upwork-gray hover:bg-gray-50"
                    >
                      10
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm text-upwork-gray hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
