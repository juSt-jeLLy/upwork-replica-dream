
import { Button } from "@/components/ui/button";
import { Building, Users, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Users,
    title: "Access expert talent",
    description: "Work with pre-vetted talent and agencies curated for your specific needs."
  },
  {
    icon: Building,
    title: "Enterprise compliance",
    description: "Mitigate risk with our specialized compliance solutions."
  },
  {
    icon: Shield,
    title: "Dedicated support",
    description: "Get personalized assistance from our team of dedicated business representatives."
  },
  {
    icon: Clock,
    title: "Efficient solutions",
    description: "Streamline your hiring process and reduce time-to-hire by up to 30%."
  }
];

const EnterpriseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-upwork-dark-green text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Enterprise Suite
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Combine the flexibility and quality of Upwork talent with enterprise-grade security and compliance.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex">
                  <div className="mr-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm opacity-80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button asChild className="bg-white text-upwork-dark-green hover:bg-gray-100 font-medium">
              <Link to="/enterprise">
                Learn About Enterprise
              </Link>
            </Button>
          </div>
          
          <div className="lg:pl-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1664575599736-c5197c684173" 
                alt="Enterprise team working together" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
