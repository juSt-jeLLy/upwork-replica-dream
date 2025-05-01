
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Building, Shield, Users, Clock, ArrowRight } from "lucide-react";

const features = [
  {
    title: "Access Expert Talent",
    description: "Work with pre-vetted talent and agencies curated for your specific needs.",
    icon: Users
  },
  {
    title: "Enterprise-Grade Security",
    description: "Ensure your data is protected with our enterprise-level security protocols.",
    icon: Shield
  },
  {
    title: "Dedicated Account Management",
    description: "Get personalized assistance from our team of dedicated business representatives.",
    icon: Building
  },
  {
    title: "Efficient Onboarding",
    description: "Streamline your hiring process and reduce time-to-hire by up to 30%.",
    icon: Clock
  }
];

const enterpriseClients = [
  {
    name: "Microsoft",
    logo: "https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b7514135708162a4be92_Microsoft%20Logo.png",
    quote: "Upwork Enterprise has been instrumental in helping us find specialized talent for our projects quickly and efficiently.",
    author: "Sarah Johnson",
    position: "Head of Talent Acquisition"
  },
  {
    name: "Airbnb",
    logo: "https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b7524135705fa1a4bea1_Airbnb%20Logo.png",
    quote: "With Upwork Enterprise, we've been able to scale our content production and design capabilities to meet our growing needs.",
    author: "Michael Chen",
    position: "Creative Director"
  },
  {
    name: "GE",
    logo: "https://assets-global.website-files.com/603fea6471d9d8559d077603/6092b7511857175a09e108d6_GE%20Logo.png",
    quote: "The talent we've accessed through Upwork Enterprise has consistently exceeded our expectations and delivered exceptional results.",
    author: "Emily Rodriguez",
    position: "VP of Digital Transformation"
  }
];

const solutions = [
  {
    title: "Flexible Workforce",
    description: "Scale your team up or down with access to our global network of professional talent.",
    href: "#"
  },
  {
    title: "Specialized Expertise",
    description: "Find professionals with niche skills that match your specific project requirements.",
    href: "#"
  },
  {
    title: "Compliance & Risk Management",
    description: "Mitigate compliance risks with our specialized enterprise solutions.",
    href: "#"
  },
  {
    title: "Cost Optimization",
    description: "Reduce hiring costs and overhead while maintaining quality work output.",
    href: "#"
  }
];

const Enterprise = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-upwork-dark-green text-white pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="success" className="mb-6">Enterprise Solution</Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Talent solutions for enterprise businesses
                </h1>
                <p className="text-xl opacity-90 mb-8">
                  Combine the flexibility and quality of Upwork talent with enterprise-grade security and compliance.
                </p>
                <Button className="bg-white text-upwork-dark-green hover:bg-gray-100 font-medium py-6 px-8 text-lg">
                  Contact Sales
                </Button>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-2xl">
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

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Enterprise-grade talent solution
              </h2>
              <p className="text-xl text-upwork-gray max-w-2xl mx-auto">
                Access the right talent, right when you need it, with the security and compliance your business demands.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="p-3 bg-upwork-green/10 rounded-lg inline-block mb-4">
                      <feature.icon className="h-6 w-6 text-upwork-green" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-upwork-gray">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Trusted by leading enterprises
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {enterpriseClients.map((client, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="h-12 mb-6 opacity-80" 
                    />
                    <p className="text-lg italic mb-6">
                      "{client.quote}"
                    </p>
                    <p className="font-semibold">{client.author}</p>
                    <p className="text-sm text-upwork-gray">{client.position}, {client.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Solutions for your business needs
              </h2>
              <p className="text-xl text-upwork-gray max-w-2xl mx-auto">
                Flexible talent solutions designed to help your business scale and succeed.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow border-none shadow-md">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                    <p className="text-upwork-gray mb-4">
                      {solution.description}
                    </p>
                    <Button variant="ghost" className="text-upwork-green p-0 hover:text-upwork-dark-green hover:bg-transparent">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-upwork-green text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform how your business works?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contact our sales team to learn how Upwork Enterprise can help your business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-upwork-green hover:bg-gray-100 font-medium py-6 px-8 text-lg">
                Contact Sales
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-medium py-6 px-8 text-lg">
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Enterprise;
