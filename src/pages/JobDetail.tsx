import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CalendarRange, Clock, MapPin, Star, ArrowLeft, Briefcase, User, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { useJobsStore } from "@/stores/JobsStore";
import { useAuth } from "@/contexts/AuthContext";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJob } = useJobsStore();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch job from store
    const foundJob = getJob(id || "");
    setJob(foundJob);
    setLoading(false);
  }, [id, getJob]);
  
  const handleApplyClick = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate("/login", { state: { redirectTo: `/jobs/${id}/apply` } });
    } else {
      // Navigate to the proposal page
      navigate(`/jobs/${id}/apply`);
    }
  };
  
  // Check if the logged-in user is the client who posted the job
  const isJobOwner = user?.id === job?.clientId;
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container-custom">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container-custom">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
              <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
              <Link to="/jobs">
                <Button>Back to Jobs</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <div className="mb-6">
            <Link to="/jobs" className="inline-flex items-center text-upwork-green hover:text-upwork-dark-green">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Jobs
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                    <Badge variant="outline" className="text-upwork-gray">
                      {job.category}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-sm text-upwork-gray mb-4">
                    <span>{job.rate}</span>
                    <span className="px-1">•</span>
                    <span>{job.experienceLevel}</span>
                    <span className="px-1">•</span>
                    <span>{job.duration}</span>
                    <span className="px-1">•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Posted {job.posted}</span>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="description">
                    <TabsList className="bg-gray-100">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="milestones">Milestones</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="pt-4">
                      <div className="whitespace-pre-line text-gray-700 mb-6">
                        {job.description}
                      </div>
                      
                      <h3 className="font-medium text-lg mb-3">Skills and Expertise</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary" className="rounded-full bg-gray-100 hover:bg-gray-200 text-upwork-gray">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="milestones" className="pt-4">
                      <div className="mb-4">
                        <h3 className="font-medium text-lg mb-3">Project Milestones</h3>
                        <p className="text-gray-600 mb-4">
                          This project has been broken down into the following agreed-upon milestones:
                        </p>
                        
                        <div className="space-y-4">
                          {job.milestones.map((milestone: any, index: number) => (
                            <Card key={milestone.id} className={`overflow-hidden ${milestone.approved ? 'border-green-300' : ''}`}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-base mb-1">
                                      {index + 1}. {milestone.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant={milestone.approved ? "success" : "outline"}>
                                        {milestone.status}
                                      </Badge>
                                      {milestone.approved && (
                                        <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 text-green-700">
                                          Agreed
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-gray-600 mb-3 text-sm">{milestone.description}</p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                      <div>
                                        <span className="font-medium">Amount:</span> ${milestone.amount.toFixed(2)}
                                      </div>
                                      <div>
                                        <span className="font-medium">Due By:</span> {format(new Date(milestone.deadline), "MMM dd, yyyy")}
                                      </div>
                                      <div>
                                        <span className="font-medium">Refund Policy:</span> {milestone.refundPolicy}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Apply for Job Section */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Apply for this Job</h2>
                  <p className="text-gray-600 mb-6">
                    Submit a proposal with your terms and milestones. You can request changes to the project milestones if needed.
                  </p>
                  <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white" onClick={handleApplyClick}>
                    Submit a Proposal
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Client Information */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">About the Client</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-upwork-gray mr-2" />
                      <div>
                        <h3 className="font-medium">{job.clientName}</h3>
                        <p className="text-sm text-upwork-gray">{job.clientLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-upwork-gray">
                      <div className="flex items-center mr-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span>{job.clientRating.toFixed(1)}</span>
                      </div>
                      <div>
                        <span>${job.clientSpent}+ spent</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center text-sm">
                      <CalendarRange className="h-4 w-4 text-upwork-gray mr-2" />
                      <span>Member since {job.clientJoined}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Briefcase className="h-4 w-4 text-upwork-gray mr-2" />
                      <span>{job.proposals} active proposals</span>
                    </div>
                    
                    {job.verified && (
                      <div className="flex items-center mt-4">
                        <Badge variant="outline" className="bg-upwork-light-green/20 text-upwork-green border-upwork-green/20">
                          Verified Client
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetail; 