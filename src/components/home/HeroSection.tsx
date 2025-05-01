
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-upwork-light-green/10 to-white pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in [animation-delay:200ms]">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-upwork-black leading-tight mb-6">
              How work <br className="hidden lg:block" />
              should <span className="text-upwork-green">work</span>
            </h1>
            <p className="text-xl md:text-2xl text-upwork-gray mb-8 max-w-xl">
              Forget the old rules. You can have the best people.<br />
              Right now. Right here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="text-lg bg-upwork-green hover:bg-upwork-dark-green text-white font-medium py-6 px-8">
                Find Talent
              </Button>
              <Button variant="outline" className="text-lg text-upwork-green border-upwork-green hover:bg-upwork-green/5 font-medium py-6 px-8">
                Find Work
              </Button>
            </div>
            <div className="mt-10">
              <p className="font-medium text-upwork-gray mb-2">Trusted by</p>
              <div className="flex flex-wrap gap-8">
                <img src="https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b7514135708162a4be92_Microsoft%20Logo.png" alt="Microsoft" className="h-8 opacity-60 grayscale" />
                <img src="https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b7524135705fa1a4bea1_Airbnb%20Logo.png" alt="Airbnb" className="h-8 opacity-60 grayscale" />
                <img src="https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b75270f49363bd41f9b0_Bissell%20Logo.png" alt="Bissell" className="h-8 opacity-60 grayscale" />
                <img src="https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b7511857175a09e108d6_GE%20Logo.png" alt="GE" className="h-8 opacity-60 grayscale" />
              </div>
            </div>
          </div>
          <div className="lg:pl-8 animate-fade-in [animation-delay:400ms]">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Professional working on laptop" 
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
