import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JobProps } from '@/components/jobs/JobCard';

// Extended job type with milestones
export interface JobWithMilestones extends JobProps {
  clientId?: string;
  milestones: Milestone[];
  clientName?: string;
  clientLocation?: string;
  clientJoined?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: Date;
  refundPolicy: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Needs Changes';
  approved: boolean;
  feedback?: string | null;
  needsChanges?: boolean;
  changeRequest?: string | null;
}

export interface Proposal {
  id: string;
  jobId: string;
  freelancerId: string;
  coverLetter: string;
  rate: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  milestones: Milestone[];
  submittedAt: Date;
  freelancerName?: string;
}

interface JobsState {
  jobs: JobWithMilestones[];
  proposals: Proposal[];
  addJob: (job: JobWithMilestones) => void;
  updateJob: (id: string, job: Partial<JobWithMilestones>) => void;
  deleteJob: (id: string) => void;
  getJob: (id: string) => JobWithMilestones | undefined;
  getClientJobs: (clientId: string) => JobWithMilestones[];
  addProposal: (proposal: Proposal) => void;
  updateProposal: (id: string, proposal: Partial<Proposal>) => void;
  getProposal: (id: string) => Proposal | undefined;
  getJobProposals: (jobId: string) => Proposal[];
  getUserProposals: (userId: string) => Proposal[];
}

// Initial mock data for jobs
const initialJobs: JobWithMilestones[] = [
  {
    id: "1",
    title: "Full Stack React & Node.js Developer Needed",
    description: "We are looking for an experienced full stack developer with expertise in React, Node.js, and MongoDB to help build a new web application for our growing startup.\n\nResponsibilities:\n- Develop robust and scalable front-end components using React\n- Build RESTful APIs using Node.js and Express\n- Work with MongoDB databases and implement data models\n- Collaborate with UI/UX designers to implement responsive designs\n- Participate in code reviews and implement best practices\n\nRequirements:\n- 3+ years of experience with React.js\n- Strong knowledge of Node.js and Express\n- Experience with MongoDB or similar NoSQL databases\n- Proficiency in TypeScript\n- Good understanding of Git workflow\n- Strong problem-solving skills and attention to detail",
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
    verified: true,
    clientId: "2",
    clientName: "TechInnovate Solutions",
    clientLocation: "United States",
    clientJoined: "Jan 2021",
    milestones: [
      {
        id: "m1",
        title: "Initial Setup and Database Design",
        description: "Set up project repository, implement basic architecture, and design database schema",
        amount: 1000,
        deadline: new Date(2023, 8, 15),
        refundPolicy: "No refund after delivery approval",
        status: "Not Started",
        approved: true
      },
      {
        id: "m2",
        title: "Backend API Development",
        description: "Develop RESTful API endpoints for core functionality",
        amount: 1500,
        deadline: new Date(2023, 9, 1),
        refundPolicy: "No refund after delivery approval",
        status: "Not Started",
        approved: true
      },
      {
        id: "m3",
        title: "Frontend Implementation",
        description: "Develop responsive UI components and integrate with backend",
        amount: 1500,
        deadline: new Date(2023, 9, 15),
        refundPolicy: "No refund after delivery approval",
        status: "Not Started",
        approved: true
      }
    ]
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
    verified: true,
    clientId: "2",
    clientName: "SaaS Analytics Inc.",
    clientLocation: "United States",
    clientJoined: "Mar 2020",
    milestones: [
      {
        id: "m1",
        title: "Research and User Analysis",
        description: "Conduct user research, create personas, and analyze current UI pain points",
        amount: 800,
        deadline: new Date(2023, 8, 20),
        refundPolicy: "No refund after delivery approval",
        status: "Not Started",
        approved: true
      },
      {
        id: "m2",
        title: "Wireframing and Prototype",
        description: "Create wireframes and interactive prototype for user testing",
        amount: 1200,
        deadline: new Date(2023, 9, 5),
        refundPolicy: "No refund after delivery approval",
        status: "Not Started",
        approved: true
      },
      {
        id: "m3",
        title: "Final UI Design and Design System",
        description: "Deliver final UI designs and component design system",
        amount: 2000,
        deadline: new Date(2023, 9, 25),
        refundPolicy: "No refund after delivery approval",
        status: "Not Started",
        approved: true
      }
    ]
  }
];

// Create the store with persist middleware to keep data in localStorage
export const useJobsStore = create<JobsState>()(
  persist(
    (set, get) => ({
      jobs: initialJobs,
      proposals: [],
      
      addJob: (job: JobWithMilestones) => {
        // Generate ID if not provided
        const newJob = {
          ...job,
          id: job.id || Math.random().toString(36).substring(2, 9),
          posted: "Just now",
          proposals: 0
        };
        set((state) => ({ jobs: [...state.jobs, newJob] }));
        return newJob;
      },
      
      updateJob: (id: string, updates: Partial<JobWithMilestones>) => {
        set((state) => ({
          jobs: state.jobs.map((job) => (job.id === id ? { ...job, ...updates } : job))
        }));
      },
      
      deleteJob: (id: string) => {
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id)
        }));
      },
      
      getJob: (id: string) => {
        return get().jobs.find((job) => job.id === id);
      },
      
      getClientJobs: (clientId: string) => {
        return get().jobs.filter((job) => job.clientId === clientId);
      },
      
      addProposal: (proposal: Proposal) => {
        // Generate ID if not provided
        const newProposal = {
          ...proposal,
          id: proposal.id || Math.random().toString(36).substring(2, 9),
          submittedAt: proposal.submittedAt || new Date()
        };
        
        set((state) => ({ 
          proposals: [...state.proposals, newProposal],
          // Increment the number of proposals for this job
          jobs: state.jobs.map(job => 
            job.id === proposal.jobId 
              ? { ...job, proposals: job.proposals + 1 } 
              : job
          )
        }));
        
        return newProposal;
      },
      
      updateProposal: (id: string, updates: Partial<Proposal>) => {
        set((state) => ({
          proposals: state.proposals.map((proposal) => 
            proposal.id === id ? { ...proposal, ...updates } : proposal
          )
        }));
      },
      
      getProposal: (id: string) => {
        return get().proposals.find((proposal) => proposal.id === id);
      },
      
      getJobProposals: (jobId: string) => {
        return get().proposals.filter((proposal) => proposal.jobId === jobId);
      },
      
      getUserProposals: (userId: string) => {
        return get().proposals.filter((proposal) => proposal.freelancerId === userId);
      }
    }),
    {
      name: 'jobs-storage', // unique name for localStorage
    }
  )
); 