import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  CalendarRange, Clock, DollarSign, 
  FileCheck, Briefcase, ArrowRight, 
  AlertTriangle, CheckCircle, HelpCircle 
} from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useJobsStore, JobWithMilestones, Proposal } from "@/stores/JobsStore";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Dashboard = () => {
  const { user } = useAuth();
  const { jobs, proposals, getClientJobs, getJob, getUserProposals, updateProposal, updateJob } = useJobsStore();
  
  const [userJobs, setUserJobs] = useState<JobWithMilestones[]>([]);
  const [userProposals, setUserProposals] = useState<Proposal[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobWithMilestones | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  const [changeResponseOpen, setChangeResponseOpen] = useState(false);
  const [responseText, setResponseText] = useState("");

  useEffect(() => {
    try {
      if (user) {
        if (user.role === 'client') {
          // Get jobs posted by this client
          setUserJobs(getClientJobs(user.id));
        }
        
        // Get proposals submitted by this user (applies to freelancers)
        const freelancerProposals = getUserProposals(user.id);
        setUserProposals(freelancerProposals);
        
        // For freelancers, get the jobs they're working on (accepted proposals)
        if (user.role === 'freelancer') {
          const acceptedProposals = freelancerProposals.filter(p => p.status === 'Accepted');
          const jobsWorkedOn = acceptedProposals.map(p => getJob(p.jobId)).filter(Boolean) as JobWithMilestones[];
          setUserJobs(jobsWorkedOn);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data. Please try refreshing the page.");
    }
  }, [user, jobs, proposals, getClientJobs, getUserProposals, getJob]);

  const calculateJobProgress = (job: JobWithMilestones) => {
    if (!job.milestones || job.milestones.length === 0) return 0;
    
    const completedMilestones = job.milestones.filter(m => 
      m.status === 'Completed'
    ).length;
    
    return Math.round((completedMilestones / job.milestones.length) * 100);
  };
  
  const getJobStatus = (job: JobWithMilestones) => {
    if (!job.milestones || job.milestones.length === 0) return 'Not Started';
    
    const hasChangesRequested = job.milestones.some(m => m.needsChanges);
    const allCompleted = job.milestones.every(m => m.status === 'Completed');
    const someInProgress = job.milestones.some(m => m.status === 'In Progress');
    
    if (hasChangesRequested) return 'Change Requested';
    if (allCompleted) return 'Completed';
    if (someInProgress) return 'In Progress';
    return 'Not Started';
  };

  const handleSubmitResponse = () => {
    try {
      if (!selectedJob || !selectedMilestone) {
        toast.error("No milestone selected");
        return;
      }
      
      if (!responseText.trim()) {
        toast.error("Please enter a response");
        return;
      }
      
      if (responseText.trim().length < 10) {
        toast.error("Your response is too short");
        return;
      }
      
      if (responseText.trim().length > 1000) {
        toast.error("Your response is too long (maximum 1000 characters)");
        return;
      }
      
      // Check if user has permission to modify this milestone
      if (user?.role === 'freelancer' && selectedJob.clientId === user.id) {
        toast.error("You don't have permission to modify this milestone");
        return;
      }
      
      if (user?.role === 'client' && selectedJob.clientId !== user.id) {
        toast.error("You don't have permission to modify this milestone");
        return;
      }
      
      // Update the milestone with the response
      const updatedMilestones = selectedJob.milestones.map(m => 
        m.id === selectedMilestone.id 
          ? { ...m, needsChanges: false, changeRequest: null, feedback: responseText, status: 'In Progress' as const } 
          : m
      );
      
      // Update the job
      updateJob(selectedJob.id, { milestones: updatedMilestones });
      
      toast.success("Response submitted successfully");
      setChangeResponseOpen(false);
      setResponseText("");
    } catch (error) {
      console.error("Error submitting response:", error);
      toast.error("Failed to submit response. Please try again.");
    }
  };
  
  const handleAcceptProposal = (proposal: Proposal) => {
    try {
      if (!user) {
        toast.error("You must be logged in to accept proposals");
        return;
      }
      
      if (user.role !== 'client') {
        toast.error("Only clients can accept proposals");
        return;
      }
      
      const job = getJob(proposal.jobId);
      
      if (!job) {
        toast.error("Job not found");
        return;
      }
      
      if (job.clientId !== user.id) {
        toast.error("You can only accept proposals for your own jobs");
        return;
      }
      
      // Check if another proposal for this job has already been accepted
      const acceptedProposal = useJobsStore.getState().proposals.find(
        p => p.jobId === proposal.jobId && p.status === 'Accepted'
      );
      
      if (acceptedProposal) {
        toast.error("You've already accepted a proposal for this job");
        return;
      }
      
      // Update the job with the milestone plans from the proposal
      updateJob(proposal.jobId, { 
        milestones: proposal.milestones.map(m => ({
          ...m,
          approved: true,
          status: 'Not Started'
        }))
      });
      
      // Update the proposal status
      updateProposal(proposal.id, { status: 'Accepted' });
      toast.success("Proposal accepted successfully");
    } catch (error) {
      console.error("Error accepting proposal:", error);
      toast.error("Failed to accept proposal. Please try again.");
    }
  };
  
  const handleRejectProposal = (proposal: Proposal) => {
    try {
      if (!user) {
        toast.error("You must be logged in to reject proposals");
        return;
      }
      
      if (user.role !== 'client') {
        toast.error("Only clients can reject proposals");
        return;
      }
      
      const job = getJob(proposal.jobId);
      
      if (!job) {
        toast.error("Job not found");
        return;
      }
      
      if (job.clientId !== user.id) {
        toast.error("You can only reject proposals for your own jobs");
        return;
      }
      
      // Update the proposal status
      updateProposal(proposal.id, { status: 'Rejected' });
      toast.success("Proposal rejected");
    } catch (error) {
      console.error("Error rejecting proposal:", error);
      toast.error("Failed to reject proposal. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 mb-6">Manage your projects and milestones</p>
          
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 gap-6">
                {userJobs.length > 0 ? (
                  userJobs
                    .filter(job => getJobStatus(job) !== 'Completed')
                    .map((job) => (
                    <Card key={job.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                              <Badge 
                                variant={
                                  getJobStatus(job) === "In Progress" ? "default" : 
                                  getJobStatus(job) === "Change Requested" ? "destructive" : 
                                  "outline"
                                }
                              >
                                {getJobStatus(job)}
                              </Badge>
                            </div>
                            <p className="text-upwork-gray mb-2">
                              {user?.role === 'freelancer' ? `Client: ${job.clientName}` : 'Your Job Post'}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1 text-upwork-gray" />
                                <span>{job.rate}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-upwork-gray" />
                                <span>Posted: {job.posted}</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Project Progress</span>
                                <span>{calculateJobProgress(job)}%</span>
                              </div>
                              <Progress value={calculateJobProgress(job)} className="h-2" />
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button 
                              onClick={() => setSelectedJob(job)} 
                              className="bg-upwork-green hover:bg-upwork-dark-green text-white"
                            >
                              View Milestones
                            </Button>
                            <Button variant="outline">
                              Message {user?.role === 'freelancer' ? 'Client' : 'Freelancer'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <h2 className="text-xl font-semibold mb-2">No Active Jobs</h2>
                    <p className="text-gray-600 mb-4">
                      {user?.role === 'client' 
                        ? "You haven't posted any jobs yet. Post your first job to get started!"
                        : "You don't have any active jobs yet. Browse available jobs and submit proposals."}
                    </p>
                    <Link to={user?.role === 'client' ? "/post-job" : "/jobs"}>
                      <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white">
                        {user?.role === 'client' ? 'Post a Job' : 'Find Jobs'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="proposals">
              <div className="grid grid-cols-1 gap-6">
                {user?.role === 'freelancer' ? (
                  // Freelancer view - shows submitted proposals
                  userProposals.length > 0 ? (
                    userProposals.map((proposal) => {
                      const job = getJob(proposal.jobId);
                      if (!job) return null;
                      
                      return (
                        <Card key={proposal.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                                  <Badge 
                                    variant={
                                      proposal.status === "Accepted" ? "success" : 
                                      proposal.status === "Rejected" ? "destructive" : 
                                      "outline"
                                    }
                                  >
                                    {proposal.status}
                                  </Badge>
                                </div>
                                <p className="text-upwork-gray mb-2">Client: {job.clientName}</p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1 text-upwork-gray" />
                                    <span>Your Rate: {proposal.rate}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-upwork-gray" />
                                    <span>Submitted: {proposal.submittedAt.toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-upwork-gray">
                                  <h3 className="font-medium text-black mb-1">Cover Letter:</h3>
                                  <p className="line-clamp-3">{proposal.coverLetter}</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2">
                                <Link to={`/jobs/${job.id}`}>
                                  <Button variant="outline">
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                      <h2 className="text-xl font-semibold mb-2">No Proposals</h2>
                      <p className="text-gray-600 mb-4">
                        You haven't submitted any proposals yet. Browse available jobs and submit proposals to get started.
                      </p>
                      <Link to="/jobs">
                        <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white">
                          Find Jobs
                        </Button>
                      </Link>
                    </div>
                  )
                ) : (
                  // Client view - shows received proposals for their jobs
                  userJobs.length > 0 ? (
                    userJobs.flatMap(job => {
                      const jobProposals = proposals.filter(p => p.jobId === job.id);
                      
                      if (jobProposals.length === 0) {
                        return (
                          <Card key={job.id} className="overflow-hidden">
                            <CardContent className="p-6 text-center">
                              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                              <p className="text-gray-600 mb-4">
                                No proposals received yet for this job.
                              </p>
                            </CardContent>
                          </Card>
                        );
                      }
                      
                      return jobProposals.map(proposal => (
                        <Card key={proposal.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                                  <Badge 
                                    variant={
                                      proposal.status === "Accepted" ? "success" : 
                                      proposal.status === "Rejected" ? "destructive" : 
                                      "outline"
                                    }
                                  >
                                    {proposal.status}
                                  </Badge>
                                </div>
                                <p className="text-upwork-gray mb-2">Freelancer: {proposal.freelancerName}</p>
                                
                                <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                                  <div className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1 text-upwork-gray" />
                                    <span>Proposed Rate: {proposal.rate}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1 text-upwork-gray" />
                                    <span>Received: {proposal.submittedAt.toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="text-sm text-upwork-gray">
                                  <h3 className="font-medium text-black mb-1">Cover Letter:</h3>
                                  <p className="line-clamp-3">{proposal.coverLetter}</p>
                                </div>
                              </div>
                              
                              <div className="flex flex-col space-y-2">
                                {proposal.status === 'Pending' && (
                                  <>
                                    <Button 
                                      onClick={() => handleAcceptProposal(proposal)}
                                      className="bg-upwork-green hover:bg-upwork-dark-green text-white"
                                    >
                                      Accept Proposal
                                    </Button>
                                    <Button 
                                      onClick={() => handleRejectProposal(proposal)}
                                      variant="outline"
                                      className="text-red-500 border-red-300 hover:bg-red-50"
                                    >
                                      Decline
                                    </Button>
                                  </>
                                )}
                                <Link to={`/jobs/${job.id}`}>
                                  <Button variant="outline">
                                    View Job
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ));
                    })
                  ) : (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                      <h2 className="text-xl font-semibold mb-2">No Jobs Posted</h2>
                      <p className="text-gray-600 mb-4">
                        You haven't posted any jobs yet. Post your first job to start receiving proposals.
                      </p>
                      <Link to="/post-job">
                        <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white">
                          Post a Job
                        </Button>
                      </Link>
                    </div>
                  )
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="grid grid-cols-1 gap-6">
                {userJobs
                  .filter(job => getJobStatus(job) === 'Completed')
                  .map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                            <Badge variant="success">Completed</Badge>
                          </div>
                          <p className="text-upwork-gray mb-2">
                            {user?.role === 'freelancer' ? `Client: ${job.clientName}` : 'Your Job Post'}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-upwork-gray" />
                              <span>{job.rate}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-upwork-gray" />
                              <span>Posted: {job.posted}</span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Project Progress</span>
                              <span>100%</span>
                            </div>
                            <Progress value={100} className="h-2" />
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Button 
                            onClick={() => setSelectedJob(job)} 
                            className="bg-upwork-green hover:bg-upwork-dark-green text-white"
                          >
                            View Details
                          </Button>
                          <Link to={`/jobs/${job.id}`}>
                            <Button variant="outline">
                              View Job
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {userJobs.filter(job => getJobStatus(job) === 'Completed').length === 0 && (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <h2 className="text-xl font-semibold mb-2">No Completed Jobs</h2>
                    <p className="text-gray-600 mb-4">
                      You don't have any completed jobs yet.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Milestone Details Dialog */}
          {selectedJob && (
            <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedJob.title}</DialogTitle>
                  <DialogDescription>
                    Milestones and progress details
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Project Milestones</h3>
                    <Badge variant="outline">{getJobStatus(selectedJob)}</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedJob.milestones.map((milestone: any, index: number) => (
                      <Card key={milestone.id} className={`overflow-hidden ${
                        milestone.status === 'Completed' ? 'border-green-300' :
                        milestone.needsChanges ? 'border-red-300' : ''
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-base mb-1">
                                {index + 1}. {milestone.title}
                              </h4>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={
                                  milestone.status === 'Completed' ? "success" :
                                  milestone.status === 'In Progress' ? "default" :
                                  milestone.status === 'Needs Changes' ? "destructive" :
                                  "outline"
                                }>
                                  {milestone.status}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Amount:</span> ${milestone.amount.toFixed(2)}
                                </div>
                                <div>
                                  <span className="font-medium">Due By:</span> {milestone.deadline ? format(new Date(milestone.deadline), "MMM dd, yyyy") : "No date set"}
                                </div>
                              </div>
                              
                              {milestone.feedback && (
                                <div className="mt-3 p-3 bg-green-50 rounded-md text-sm">
                                  <div className="font-medium mb-1 flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                                    Feedback
                                  </div>
                                  <p className="text-gray-700">{milestone.feedback}</p>
                                </div>
                              )}
                              
                              {milestone.needsChanges && milestone.changeRequest && (
                                <div className="mt-3 p-3 bg-red-50 rounded-md text-sm">
                                  <div className="font-medium mb-1 flex items-center">
                                    <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
                                    Changes Requested
                                  </div>
                                  <p className="text-gray-700">{milestone.changeRequest}</p>
                                  
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="mt-2"
                                    onClick={() => {
                                      setSelectedMilestone(milestone);
                                      setChangeResponseOpen(true);
                                    }}
                                  >
                                    Respond to Request
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedJob(null)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Change Request Response Dialog */}
          <Dialog open={changeResponseOpen} onOpenChange={setChangeResponseOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Respond to Change Request</DialogTitle>
                <DialogDescription>
                  Provide your response to the client's change request
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                {selectedMilestone && selectedMilestone.changeRequest && (
                  <div className="p-3 bg-gray-100 rounded-md text-sm">
                    <div className="font-medium mb-1">Client Request:</div>
                    <p>{selectedMilestone.changeRequest}</p>
                  </div>
                )}
                
                <Textarea 
                  placeholder="Enter your response..."
                  className="min-h-[100px]"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setChangeResponseOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitResponse}>
                  Submit Response
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 