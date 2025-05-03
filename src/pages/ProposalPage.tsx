import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useJobsStore, Proposal } from "@/stores/JobsStore";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MilestoneBuilder } from "@/components/jobs/MilestoneBuilder";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  coverLetter: z.string()
    .min(50, {
      message: "Cover letter must be at least 50 characters.",
    })
    .max(2000, {
      message: "Cover letter must be less than 2000 characters."
    }),
  rate: z.string()
    .min(1, {
      message: "Please enter your rate.",
    })
    .refine(value => {
      // Accept formats like "$30/hr", "$5000 fixed", etc.
      return /^(\$)?[\d,]+(\s*\/\s*hr|\s+fixed)?$/i.test(value.trim());
    }, {
      message: "Please enter a valid rate format (e.g., $30/hr or $5000 fixed)."
    }),
});

const ProposalPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getJob, addProposal } = useJobsStore();
  
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    // Get job from store
    const foundJob = getJob(id || "");
    
    if (foundJob) {
      setJob(foundJob);
      // Clone milestones but set approved to false so freelancer can propose changes
      setMilestones(foundJob.milestones.map(m => ({...m, approved: false})));
    }
    
    setLoading(false);
  }, [id, getJob]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coverLetter: "",
      rate: "",
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        if (!user) {
          toast.error("You must be logged in to submit a proposal");
          navigate("/login");
          return;
        }
        
        if (user.role !== 'freelancer') {
          toast.error("Only freelancers can submit proposals");
          navigate("/dashboard");
          return;
        }
        
        // Validate milestones
        if (milestones.length === 0) {
          toast.error("Please add at least one milestone");
          return;
        }
        
        // Check if the user has already submitted a proposal for this job
        const existingProposals = useJobsStore.getState().getUserProposals(user.id);
        const hasProposal = existingProposals.some(p => p.jobId === id);
        
        if (hasProposal) {
          toast.error("You have already submitted a proposal for this job");
          navigate("/dashboard");
          return;
        }
        
        // Validate milestone total amount is reasonable
        const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
        if (totalAmount <= 0) {
          toast.error("Total milestone amount must be greater than zero");
          return;
        }
        
        // Check if user has submitted too many proposals recently
        const userProposalsKey = 'user_proposals_count_' + user.id;
        const userProposalsCount = localStorage.getItem(userProposalsKey);
        const proposalCount = userProposalsCount ? parseInt(userProposalsCount, 10) : 0;
        
        if (proposalCount >= 10) { // Limit to 10 proposals per day
          toast.error("You have reached the maximum number of proposals for today. Please try again tomorrow.");
          return;
        }
        
        // Create and submit the proposal
        const proposal: Proposal = {
          id: Math.random().toString(36).substring(2, 9),
          jobId: id || "",
          freelancerId: user.id,
          freelancerName: `${user.firstName} ${user.lastName}`,
          coverLetter: values.coverLetter.trim(),
          rate: values.rate.trim(),
          status: "Pending" as const,
          milestones: milestones,
          submittedAt: new Date()
        };
        
        // Increment proposal count
        localStorage.setItem(userProposalsKey, (proposalCount + 1).toString());
        
        addProposal(proposal);
        toast.success("Proposal submitted successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit proposal");
    }
  }
  
  // Add a confirm handler when users try to leave the page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (form.formState.isDirty || step > 1) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form.formState.isDirty, step]);
  
  // Make sure freelancer is not submitting a proposal to their own job
  useEffect(() => {
    if (user && job && user.id === job.clientId) {
      toast.error("You cannot submit a proposal to your own job");
      navigate("/jobs");
    }
  }, [user, job, navigate]);
  
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
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container-custom max-w-3xl">
          <div className="mb-6">
            <Link to={`/jobs/${id}`} className="inline-flex items-center text-upwork-green hover:text-upwork-dark-green">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Job
            </Link>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Submit a Proposal</h1>
            <p className="text-gray-600 mb-6">
              Submit your proposal with your terms and milestone plans
            </p>
            
            {/* Job Summary */}
            <Card className="mb-8">
              <CardContent className="p-4">
                <h2 className="font-medium text-lg mb-2">{job.title}</h2>
                <div className="flex items-center mb-4">
                  <Badge variant="outline" className="text-upwork-gray mr-2">
                    {job.category}
                  </Badge>
                  <span className="text-sm text-upwork-gray">{job.rate}</span>
                </div>
                <p className="text-sm text-upwork-gray line-clamp-2">{job.description}</p>
              </CardContent>
            </Card>
            
            {/* Step indicator */}
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 1 ? "bg-upwork-green text-white" : "bg-gray-200"
                }`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="ml-2 text-sm font-medium">Proposal Details</span>
              </div>
              <div className={`h-0.5 w-12 mx-3 ${step >= 2 ? "bg-upwork-green" : "bg-gray-200"}`}></div>
              <div className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 2 ? "bg-upwork-green text-white" : "bg-gray-200"
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Adjust Milestones</span>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Introduce yourself and explain why you're a good fit for this job..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Rate</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. $30/hr or $2000 fixed" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Review and Adjust Milestones</h2>
                    <p className="text-gray-600 mb-6">
                      Review the client's milestones and make adjustments if needed. You can request changes to deadlines, 
                      deliverables or refund policies.
                    </p>
                    <MilestoneBuilder 
                      milestones={milestones} 
                      setMilestones={setMilestones} 
                    />
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between pt-2">
                  {step === 2 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                  )}
                  {step === 1 ? (
                    <Button 
                      type="submit" 
                      className="ml-auto bg-upwork-green hover:bg-upwork-dark-green text-white"
                    >
                      Continue to Milestones
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="ml-auto bg-upwork-green hover:bg-upwork-dark-green text-white"
                    >
                      Submit Proposal
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProposalPage;