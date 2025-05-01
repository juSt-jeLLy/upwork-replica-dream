
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom text-center">
        <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
          Find the talent needed to get your business growing
        </h2>
        <p className="body-lg mb-8 max-w-2xl mx-auto">
          Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-upwork-green hover:bg-upwork-dark-green text-white font-medium py-6 px-8 text-lg">
            <Link to="/signup">
              Find Talent
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-upwork-green border-upwork-green hover:bg-upwork-green/5 font-medium py-6 px-8 text-lg">
            <Link to="#">
              Learn How to Hire <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
