
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data for the About page
const stats = [
  { label: "Freelancers worldwide", value: "19M+" },
  { label: "Total jobs posted", value: "5M+" },
  { label: "Countries represented", value: "180+" },
  { label: "Enterprise clients", value: "30%" }
];

const timeline = [
  {
    year: "2015",
    title: "Upwork is born",
    description: "oDesk and Elance merge to form Upwork, creating the world's largest freelancing platform."
  },
  {
    year: "2016",
    title: "New features introduced",
    description: "Project Catalog and specialized profiles launched to improve matching between clients and freelancers."
  },
  {
    year: "2018",
    title: "Public offering",
    description: "Upwork becomes a publicly traded company on Nasdaq under the symbol 'UPWK'."
  },
  {
    year: "2020",
    title: "Remote work revolution",
    description: "During the pandemic, Upwork helps businesses adapt to remote work and connects talent around the world."
  },
  {
    year: "2022",
    title: "Enterprise expansion",
    description: "Major growth in enterprise solutions, helping Fortune 500 companies access global talent."
  }
];

const leadership = [
  {
    name: "Hayden Brown",
    position: "President & CEO",
    image: "https://randomuser.me/api/portraits/women/76.jpg",
    bio: "Hayden has led Upwork's transformation and growth strategy as CEO since 2020, after holding multiple leadership roles in the company."
  },
  {
    name: "Eric Gilpin",
    position: "Chief Revenue Officer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Eric oversees Upwork's sales organization and drives revenue growth across all customer segments."
  },
  {
    name: "Sam Bright",
    position: "Chief Product & Experience Officer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Sam leads Upwork's product strategy and development, focused on creating exceptional experiences for clients and talents."
  },
  {
    name: "Zoë Harte",
    position: "Chief People Officer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Zoë is responsible for building Upwork's talent strategy and culture across its global team."
  }
];

const values = [
  {
    title: "Inspire a boundless future of work",
    description: "We create economic opportunities so people have better lives."
  },
  {
    title: "Put our community first",
    description: "We build technology to connect talent and clients in a way no one else can."
  },
  {
    title: "Build bridges, not walls",
    description: "We embrace our differences and aim for a collaborative and inclusive environment."
  },
  {
    title: "Act with integrity",
    description: "We're committed to being honest, ethical, and transparent in everything we do."
  }
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-upwork-light-green/10 to-white pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  About Upwork
                </h1>
                <p className="text-xl text-upwork-gray mb-8">
                  Upwork is the world's work marketplace, connecting businesses with independent talent from around the globe.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <p className="text-3xl md:text-4xl font-bold text-upwork-green">{stat.value}</p>
                      <p className="text-upwork-gray">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902" 
                  alt="Team collaborating" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-2xl leading-relaxed text-upwork-gray">
                To create economic opportunities so people have better lives.
              </p>
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our History
            </h2>
            <div className="max-w-4xl mx-auto">
              {timeline.map((event, index) => (
                <div key={index} className="relative pb-12 last:pb-0">
                  <div className="flex items-start">
                    <div className="flex flex-col items-center mr-6">
                      <div className="bg-upwork-green text-white font-bold py-2 px-4 rounded-lg">
                        {event.year}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="h-full w-px bg-gray-200 my-3" />
                      )}
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-upwork-gray">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-xl font-bold text-upwork-green mb-4">{value.title}</h3>
                  <p className="text-upwork-gray">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((person, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <img 
                      src={person.image} 
                      alt={person.name} 
                      className="w-40 h-40 object-cover rounded-full mx-auto" 
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                  <p className="text-upwork-green mb-4">{person.position}</p>
                  <p className="text-sm text-upwork-gray">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-upwork-green text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join our global community
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Whether you're a client looking for talent or a freelancer looking for work, Upwork is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-upwork-green hover:bg-gray-100 font-medium">
                Find Talent
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-medium">
                Find Work
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
