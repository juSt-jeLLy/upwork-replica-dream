
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Code, PenTool, MonitorSmartphone, LineChart, Briefcase, MessageSquare, FileText, Video, Pencil } from "lucide-react";

const categories = [
  {
    title: "Development & IT",
    icon: Code,
    skills: ["Web Development", "Mobile Apps", "JavaScript", "WordPress"],
    color: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    title: "Design & Creative",
    icon: PenTool,
    skills: ["Logo Design", "UI/UX", "Illustration", "Animation"],
    color: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    title: "Sales & Marketing",
    icon: LineChart,
    skills: ["Digital Marketing", "SEO", "Social Media", "Email Marketing"],
    color: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    title: "Writing & Translation",
    icon: FileText,
    skills: ["Content Writing", "Copywriting", "Translation", "Editing"],
    color: "bg-yellow-50",
    iconColor: "text-yellow-600"
  },
  {
    title: "Admin & Customer Support",
    icon: MessageSquare,
    skills: ["Virtual Assistant", "Customer Service", "Data Entry", "Project Management"],
    color: "bg-red-50", 
    iconColor: "text-red-500"
  },
  {
    title: "Finance & Accounting",
    icon: Briefcase,
    skills: ["Accounting", "Bookkeeping", "Financial Analysis", "Tax Preparation"],
    color: "bg-indigo-50",
    iconColor: "text-indigo-500"
  },
  {
    title: "Engineering & Architecture",
    icon: Pencil,
    skills: ["CAD", "Product Design", "Civil Engineering", "3D Modeling"],
    color: "bg-teal-50",
    iconColor: "text-teal-500"
  },
  {
    title: "Video & Animation",
    icon: Video,
    skills: ["Video Editing", "Motion Graphics", "Animation", "Video Production"],
    color: "bg-orange-50",
    iconColor: "text-orange-500"
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <h2 className="heading-lg mb-4 text-center">Browse talent by category</h2>
        <p className="body-lg mb-12 text-center max-w-2xl mx-auto">
          Get started by browsing the most in-demand categories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className={`group overflow-hidden transition-all hover:shadow-lg ${category.color} border-none`}
            >
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                  <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-upwork-black">{category.title}</h3>
                <ul className="space-y-1 mb-6">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="text-sm text-upwork-gray">
                      {skill}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="#" 
                  className="inline-flex items-center text-upwork-green hover:text-upwork-dark-green font-medium transition-colors"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
