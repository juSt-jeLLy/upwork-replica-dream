
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export interface JobProps {
  id: string;
  title: string;
  description: string;
  rate: string;
  experienceLevel: string;
  duration: string;
  posted: string;
  location: string;
  category: string;
  skills: string[];
  clientRating: number;
  clientSpent: string;
  proposals: number;
  verified: boolean;
}

const JobCard = ({ job }: { job: JobProps }) => {
  return (
    <Card className="mb-4 hover:border-upwork-green transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <Link to={`/jobs/${job.id}`} className="group">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-upwork-green transition-colors">
              {job.title}
            </h3>
          </Link>
          <div>
            <Badge variant="outline" className="text-upwork-gray">
              {job.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm text-upwork-gray mb-3">
          <span>{job.rate}</span>
          <span className="px-1">•</span>
          <span>{job.experienceLevel}</span>
          <span className="px-1">•</span>
          <span>{job.duration}</span>
        </div>
        
        <p className="text-upwork-gray mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="rounded-full bg-gray-100 hover:bg-gray-200 text-upwork-gray">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-upwork-gray">
          <div className="flex items-center mr-4">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span>{job.clientRating.toFixed(1)}</span>
          </div>
          <div className="mr-4">
            <span>${job.clientSpent}+ spent</span>
          </div>
          {job.verified && (
            <div>
              <Badge variant="outline" className="bg-upwork-light-green/20 text-upwork-green border-upwork-green/20">
                Verified
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-3 bg-gray-50 border-t flex justify-between items-center">
        <div className="flex items-center text-sm text-upwork-gray">
          <Clock className="h-4 w-4 mr-1" />
          <span>Posted {job.posted}</span>
        </div>
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-upwork-gray" />
          <span>{job.location}</span>
        </div>
        <div className="text-sm text-upwork-gray">
          <span>{job.proposals} proposals</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
