import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, User, Briefcase, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const talentCategories = [
  {
    title: "Development & IT",
    count: 1243,
    skills: ["Web Development", "Mobile Apps", "JavaScript", "WordPress"]
  },
  {
    title: "Design & Creative",
    count: 987,
    skills: ["Logo Design", "UI/UX", "Illustration", "Animation"]
  },
  {
    title: "Sales & Marketing",
    count: 756,
    skills: ["Digital Marketing", "SEO", "Social Media", "Email Marketing"]
  },
  {
    title: "Writing & Translation",
    count: 638,
    skills: ["Content Writing", "Copywriting", "Translation", "Editing"]
  }
];

const featuredTalent = [
  {
    name: "Michael Johnson",
    title: "Full Stack Developer",
    rate: "$65/hr",
    rating: 4.9,
    jobsCompleted: 127,
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    description: "Experienced full stack developer specializing in React and Node.js applications with 7+ years of experience working with startups and enterprise clients."
  },
  {
    name: "Sarah Williams",
    title: "UX/UI Designer",
    rate: "$55/hr",
    rating: 4.8,
    jobsCompleted: 94,
    skills: ["UI Design", "UX Research", "Figma", "Adobe XD"],
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    description: "Creative UI/UX designer with a passion for creating intuitive user experiences and visually stunning interfaces. Specialized in SaaS and mobile applications."
  },
  {
    name: "David Chen",
    title: "Digital Marketer",
    rate: "$45/hr",
    rating: 4.7,
    jobsCompleted: 78,
    skills: ["SEO", "Content Strategy", "Google Analytics", "Social Media"],
    image: "https://randomuser.me/api/portraits/men/64.jpg",
    description: "Results-driven digital marketer with expertise in SEO, content marketing, and growth strategies. Has helped numerous startups achieve significant user acquisition."
  },
  {
    name: "Emily Rodriguez",
    title: "Content Writer",
    rate: "$40/hr",
    rating: 4.9,
    jobsCompleted: 156,
    skills: ["Blog Writing", "Copywriting", "SEO Content", "Technical Writing"],
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    description: "Versatile content writer with experience in various industries including tech, healthcare, and finance. Known for delivering engaging and SEO-optimized content."
  }
];

const FindTalent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTalent, setFilteredTalent] = useState(featuredTalent);
  const navigate = useNavigate();
  const location = useLocation();

  // Parse search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    if (query) {
      setSearchQuery(query);
      filterTalentByQuery(query);
    }
  }, [location.search]);

  const filterTalentByQuery = (query: string) => {
    if (!query.trim()) {
      setFilteredTalent(featuredTalent);
      return;
    }
    
    const filtered = featuredTalent.filter(talent => 
      talent.name.toLowerCase().includes(query.toLowerCase()) ||
      talent.title.toLowerCase().includes(query.toLowerCase()) ||
      talent.description.toLowerCase().includes(query.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    
    setFilteredTalent(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-talent?query=${encodeURIComponent(searchQuery)}`);
      filterTalentByQuery(searchQuery);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-upwork-light-green/10 to-white pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-upwork-black leading-tight mb-6">
                Find the perfect talent for your projects
              </h1>
              <p className="text-xl text-upwork-gray mb-8 max-w-2xl mx-auto">
                Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Search for talent (e.g. React Developer, UI Designer)" 
                      className="h-12 text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="h-12 bg-upwork-green hover:bg-upwork-dark-green text-white font-medium">
                    <Search className="mr-2 h-5 w-5" />
                    Search Talent
                  </Button>
                </form>
              </div>
              
              <Button className="text-lg bg-upwork-green hover:bg-upwork-dark-green text-white font-medium py-6 px-8">
                Post a Job
              </Button>
            </div>
          </div>
        </section>

        {/* Talent Categories */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-6">Browse talent by category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {talentCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                    <p className="text-sm text-upwork-gray mb-4">{category.count} professionals</p>
                    <ul className="space-y-1 mb-6">
                      {category.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-sm text-upwork-gray">
                          {skill}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="text-upwork-green p-0 hover:text-upwork-dark-green hover:bg-transparent">
                      Browse {category.title} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Talent */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-lg mb-2">Featured talent</h2>
            {searchQuery && (
              <p className="text-lg text-upwork-gray mb-4">
                {filteredTalent.length === 0 
                  ? `No results found for "${searchQuery}"`
                  : `${filteredTalent.length} ${filteredTalent.length === 1 ? 'talent' : 'talents'} found for "${searchQuery}"`
                }
              </p>
            )}
            <p className="text-lg text-upwork-gray mb-8">
              Browse our top-rated professionals for your projects
            </p>
            {filteredTalent.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTalent.map((talent, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src={talent.image} 
                          alt={talent.name} 
                          className="h-16 w-16 rounded-full object-cover" 
                        />
                        <div>
                          <h3 className="font-bold text-xl mb-1">{talent.name}</h3>
                          <p className="text-upwork-gray mb-2">{talent.title}</p>
                          <div className="flex items-center text-sm mb-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="font-medium mr-3">{talent.rating}</span>
                            <span className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1 text-upwork-gray" />
                              {talent.jobsCompleted} jobs
                            </span>
                            <Badge className="ml-3">{talent.rate}</Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-upwork-gray my-4">
                        {talent.description}
                      </p>
                      <div className="flex flex-wrap gap-2 my-3">
                        {talent.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="text-upwork-green border-upwork-green hover:bg-upwork-green/5 w-full mt-4">
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h2 className="text-xl font-semibold mb-2">No talent found</h2>
                <p className="text-gray-600 mb-4">
                  We couldn't find any talent matching your search criteria.
                </p>
                <Button onClick={() => {
                  setSearchQuery("");
                  setFilteredTalent(featuredTalent);
                  navigate("/find-talent");
                }}>Clear Search</Button>
              </div>
            )}
            {filteredTalent.length > 0 && (
              <div className="text-center mt-10">
                <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white font-medium">
                  Browse All Talent
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FindTalent;
