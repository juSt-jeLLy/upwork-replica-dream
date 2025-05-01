
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Proof of quality",
  "No cost until you hire",
  "Protected payments",
  "Find talent your way"
];

const TalentSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="heading-lg mb-6">
              Find the talent needed to<br />
              <span className="text-upwork-green">get your business growing</span>
            </h2>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-upwork-green mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-upwork-gray">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild className="bg-upwork-green hover:bg-upwork-dark-green text-white font-medium py-6 px-8 text-lg">
              <Link to="/find-talent">
                Find Talent
              </Link>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f2b5" 
                alt="People collaborating on project" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentSection;
