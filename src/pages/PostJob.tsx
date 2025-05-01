
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MilestoneBuilder } from "@/components/jobs/MilestoneBuilder";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  description: z.string().min(50, {
    message: "Description must be at least 50 characters.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  skills: z.string().min(3, {
    message: "Please enter at least one skill.",
  }),
  budget: z.string().min(1, {
    message: "Please enter a budget.",
  }),
  experience: z.string().min(1, {
    message: "Please select an experience level.",
  }),
  duration: z.string().min(1, {
    message: "Please select a project duration.",
  }),
});

const PostJob = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [milestones, setMilestones] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      skills: "",
      budget: "",
      experience: "",
      duration: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && milestones.length > 0) {
      // Submit the job with milestones
      console.log("Job Posted:", { ...values, milestones });
      toast.success("Job posted successfully!");
      navigate("/jobs");
    } else {
      toast.error("Please add at least one milestone.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container-custom max-w-3xl">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Post a Job</h1>
            <p className="text-gray-600 mb-6">
              Find the perfect freelancer for your project
            </p>

            {/* Step indicator */}
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 1 ? "bg-upwork-green text-white" : "bg-gray-200"
                }`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : "1"}
                </div>
                <span className="ml-2 text-sm font-medium">Job Details</span>
              </div>
              <div className={`h-0.5 w-12 mx-3 ${step >= 2 ? "bg-upwork-green" : "bg-gray-200"}`}></div>
              <div className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= 2 ? "bg-upwork-green text-white" : "bg-gray-200"
                }`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Milestones</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Full Stack Developer needed for Web App" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your project in detail..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="web-development">Web Development</SelectItem>
                                <SelectItem value="mobile-development">Mobile Development</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="writing">Writing</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="admin-support">Admin Support</SelectItem>
                                <SelectItem value="customer-service">Customer Service</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Required Skills</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. React, Node.js, MongoDB" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. $500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Experience Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="entry">Entry Level</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Duration</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="short">Less than 1 month</SelectItem>
                                <SelectItem value="medium">1-3 months</SelectItem>
                                <SelectItem value="long">3-6 months</SelectItem>
                                <SelectItem value="ongoing">Ongoing</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Set Project Milestones</h2>
                    <p className="text-gray-600 mb-6">
                      Break down your project into manageable milestones with clear deliverables and deadlines.
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
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="ml-auto bg-upwork-green hover:bg-upwork-dark-green text-white"
                    >
                      Post Job
                      <ArrowRight className="ml-2 h-4 w-4" />
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

export default PostJob;
