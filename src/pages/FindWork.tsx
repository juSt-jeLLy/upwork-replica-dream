
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Briefcase, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

const featuredJobs = [
  {
    title: "Frontend Developer for E-commerce Redesign",
    budget: "$3,000 - $5,000",
    type: "Fixed-Price",
    level: "Intermediate",
    duration: "1 to 3 months",
    posted: "2 days ago",
    description: "We need a talented frontend developer to redesign our e-commerce website. The ideal candidate should have experience with React, responsive design, and e-commerce platforms.",
    skills: ["React", "JavaScript", "Responsive Design", "E-commerce"],
    proposals: 14,
    client: {
      country: "United States",
      rating: 4.9,
      spent: "$25K+"
    }
  },
  {
    title: "WordPress Blog Migration and Setup",
    budget: "$1,000 - $2,000",
    type: "Fixed-Price",
    level: "Entry Level",
    duration: "Less than 1 month",
    posted: "5 hours ago",
    description: "We need help migrating our existing blog to WordPress and setting up a new theme with custom features. Experience with WordPress customization required.",
    skills: ["WordPress", "PHP", "Theme Customization", "Migration"],
    proposals: 23,
    client: {
      country: "Canada",
      rating: 4.7,
      spent: "$10K+"
    }
  },
  {
    title: "Mobile App UI/UX Designer Needed",
    budget: "$50 - $65/hr",
    type: "Hourly",
    level: "Expert",
    duration: "3 to 6 months",
    posted: "1 day ago",
    description: "We are looking for an experienced UI/UX designer to create intuitive and visually appealing designs for our mobile application. The ideal candidate should have a strong portfolio of mobile app designs.",
    skills: ["UI Design", "UX Design", "Mobile App Design", "Figma"],
    proposals: 19,
    client: {
      country: "Australia",
      rating: 5.0,
      spent: "$50K+"
    }
  },
  {
    title: "Content Writer for Technology Blog",
    budget: "$30 - $40/hr",
    type: "Hourly",
    level: "Intermediate",
    duration: "Ongoing",
    posted: "3 days ago",
    description: "We need a skilled content writer to produce high-quality articles for our technology blog. Topics include AI, blockchain, software development, and general tech trends.",
    skills: ["Content Writing", "SEO", "Technology", "Research"],
    proposals: 31,
    client: {
      country: "United Kingdom",
      rating: 4.8,
      spent: "$15K+"
    }
  }
];

const popularCategories = [
  {
    name: "Web Development",
    count: 5243,
    icon: "💻"
  },
  {
    name: "Mobile Development",
    count: 3187,
    icon: "📱"
  },
  {
    name: "UI/UX Design",
    count: 2876,
    icon: "🎨"
  },
  {
    name: "Content Writing",
    count: 3542,
    icon: "✍️"
  },
  {
    name: "Digital Marketing",
    count: 2165,
    icon: "📈"
  },
  {
    name: "Data Science",
    count: 1897,
    icon: "📊"
  }
];

const FindWork = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-upwork-light-green/10 to-white pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-upwork-black leading-tight mb-6">
                Find the perfect job for your skills
              </h1>
              <p className="text-xl text-upwork-gray mb-8">
                Browse thousands of jobs and find opportunities that match your expertise.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Search for jobs (e.g. Web Developer, Designer)" 
                      className="h-12 text-lg"
                    />
                  </div>
                  <Button className="h-12 bg-upwork-green hover:bg-upwork-dark-green text-white font-medium">
                    <Search className="mr-2 h-5 w-5" />
                    Search Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="heading-lg mb-6">Featured Jobs</h2>
            <div className="space-y-6">
              {featuredJobs.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-upwork-green hover:text-upwork-dark-green cursor-pointer">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="outline">{job.level}</Badge>
                        <Badge variant="outline">{job.duration}</Badge>
                        <Badge variant="outline">Posted {job.posted}</Badge>
                      </div>
                      <p className="text-upwork-gray mb-4">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-between items-center mt-6">
                        <div>
                          <p className="font-semibold">{job.budget}</p>
                          <p className="text-sm text-upwork-gray">{job.proposals} proposals</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{job.client.country}</p>
                          <div className="flex items-center justify-end text-sm">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{job.client.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{job.client.spent} spent</span>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 bg-upwork-green hover:bg-upwork-dark-green text-white font-medium">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild className="bg-upwork-green hover:bg-upwork-dark-green text-white font-medium">
                <a href="/jobs">Browse All Jobs</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="heading-lg mb-6">Popular Job Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {popularCategories.map((category, index) => (
                <Card 
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6 flex items-center">
                    <div className="text-4xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="font-bold">{category.name}</h3>
                      <p className="text-sm text-upwork-gray">{category.count} jobs available</p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-upwork-gray" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-upwork-dark-green text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start earning?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Create your profile, showcase your skills, and start bidding on projects that match your expertise.
            </p>
            <Button className="bg-white text-upwork-dark-green hover:bg-gray-100 font-medium py-6 px-8 text-lg">
              Create Your Profile
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FindWork;
