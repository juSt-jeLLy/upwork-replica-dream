
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard, { JobProps } from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { Filter, ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Mock job data
const mockJobs: JobProps[] = [
  {
    id: "1",
    title: "Full Stack React & Node.js Developer Needed",
    description: "We are looking for an experienced full stack developer with expertise in React, Node.js, and MongoDB to help build a new web application for our growing startup.",
    rate: "$30-50/hr",
    experienceLevel: "Intermediate",
    duration: "3-6 months",
    posted: "2 hours ago",
    location: "Worldwide",
    category: "Web Development",
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "Express.js"],
    clientRating: 4.8,
    clientSpent: "10K",
    proposals: 12,
    verified: true
  },
  {
    id: "2",
    title: "UI/UX Designer for SaaS Dashboard Redesign",
    description: "Looking for a talented UI/UX designer to help us redesign our SaaS dashboard. The ideal candidate should have experience designing complex data visualization interfaces and a strong portfolio.",
    rate: "$35-60/hr",
    experienceLevel: "Expert",
    duration: "1-3 months",
    posted: "6 hours ago",
    location: "United States",
    category: "UI/UX Design",
    skills: ["UI Design", "UX Design", "Figma", "Adobe XD", "Dashboard Design"],
    clientRating: 4.9,
    clientSpent: "50K",
    proposals: 18,
    verified: true
  },
  {
    id: "3",
    title: "WordPress Developer for E-commerce Site",
    description: "Need an experienced WordPress developer to help us set up and customize an e-commerce website using WooCommerce. The ideal candidate should have experience with custom themes and plugins.",
    rate: "$25-40/hr",
    experienceLevel: "Intermediate",
    duration: "1-3 months",
    posted: "1 day ago",
    location: "Worldwide",
    category: "Web Development",
    skills: ["WordPress", "WooCommerce", "PHP", "CSS", "JavaScript"],
    clientRating: 4.5,
    clientSpent: "5K",
    proposals: 24,
    verified: false
  },
  {
    id: "4",
    title: "Mobile App Developer for iOS and Android",
    description: "We're seeking a mobile app developer experienced in both iOS and Android development. You'll be responsible for creating a cross-platform app using React Native or Flutter.",
    rate: "$40-65/hr",
    experienceLevel: "Expert",
    duration: "3-6 months",
    posted: "3 days ago",
    location: "Worldwide",
    category: "Mobile Development",
    skills: ["React Native", "Flutter", "iOS", "Android", "API Integration"],
    clientRating: 4.7,
    clientSpent: "25K",
    proposals: 16,
    verified: true
  },
  {
    id: "5",
    title: "Content Writer for Technology Blog",
    description: "Looking for a skilled content writer to create engaging articles for our technology blog. Topics include AI, machine learning, blockchain, and general tech trends.",
    rate: "$20-35/hr",
    experienceLevel: "Intermediate",
    duration: "Ongoing",
    posted: "4 days ago",
    location: "Worldwide",
    category: "Content Writing",
    skills: ["Content Writing", "SEO", "Technology", "Blogging", "Research"],
    clientRating: 4.6,
    clientSpent: "15K",
    proposals: 30,
    verified: true
  },
  {
    id: "6",
    title: "Data Scientist for Machine Learning Project",
    description: "We need a data scientist with experience in machine learning to help us build predictive models for our customer data. Experience with Python and relevant libraries (TensorFlow, PyTorch, etc.) is required.",
    rate: "$50-80/hr",
    experienceLevel: "Expert",
    duration: "3-6 months",
    posted: "5 days ago",
    location: "United States",
    category: "Data Science & Analytics",
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "SQL"],
    clientRating: 5.0,
    clientSpent: "100K",
    proposals: 14,
    verified: true
  }
];

const Jobs = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Browse Jobs</h1>
          
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
              
              {/* Job Cards */}
              <div>
                {mockJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              
              {/* Pagination */}
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
