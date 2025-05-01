
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Through Upwork, we were able to find incredible people from around the world to help grow our business. The talent is unmatched.",
    author: "Emily R.",
    role: "Marketing Director",
    company: "TechVision",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5
  },
  {
    quote: "The quality of freelancers on Upwork is outstanding. We found developers who not only had the skills we needed but also aligned with our company culture.",
    author: "Michael T.",
    role: "CTO",
    company: "BlueSky Solutions",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 5
  },
  {
    quote: "Upwork made it possible for us to scale our content production quickly. The freelancers we've worked with have been professional and delivered amazing results.",
    author: "Sophia L.",
    role: "Content Manager",
    company: "Global Media",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  },
  {
    quote: "As a startup, we needed to move fast without compromising quality. Upwork connected us with expert designers who helped us launch our brand in record time.",
    author: "David K.",
    role: "Founder",
    company: "NextGen Startup",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg",
    rating: 5
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1));
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Success stories from clients</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Discover how businesses are achieving their goals by finding exceptional talent on Upwork.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[testimonials[currentIndex], testimonials[(currentIndex + 1) % testimonials.length]].map((testimonial, index) => (
              <Card key={index} className="border shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-upwork-black italic mb-6">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
                <CardFooter className="p-8 pt-0 flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="h-12 w-12 rounded-full mr-4" 
                  />
                  <div>
                    <p className="font-semibold text-upwork-black">{testimonial.author}</p>
                    <p className="text-sm text-upwork-gray">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={showPrevious}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5 text-upwork-gray" />
            </button>
            <button
              onClick={showNext}
              className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5 text-upwork-gray" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
