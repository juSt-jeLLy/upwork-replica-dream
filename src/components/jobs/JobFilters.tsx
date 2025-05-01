
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design", 
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "Video & Animation",
  "Data Science & Analytics",
  "Admin Support",
  "Customer Service",
];

const experiences = [
  "Entry Level",
  "Intermediate",
  "Expert",
];

const JobFilters = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [hourlyRange, setHourlyRange] = useState([10, 100]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedExperience(null);
    setHourlyRange([10, 100]);
    setVerifiedOnly(false);
    setPaymentVerified(false);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-auto p-0 text-upwork-green hover:text-upwork-dark-green hover:bg-transparent"
          onClick={clearFilters}
        >
          Clear All
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Label htmlFor="search" className="mb-2 block">Search</Label>
        <Input id="search" placeholder="Search jobs..." />
      </div>

      {/* Category Filter */}
      <Accordion type="single" collapsible defaultValue="category" className="mb-6">
        <AccordionItem value="category" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-semibold">Category</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="h-4 w-4 rounded border-gray-300 text-upwork-green focus:ring-upwork-green"
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Experience Level */}
      <Accordion type="single" collapsible defaultValue="experience" className="mb-6">
        <AccordionItem value="experience" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-semibold">Experience Level</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {experiences.map((level) => (
                <div key={level} className="flex items-center">
                  <input
                    type="radio"
                    id={`exp-${level}`}
                    name="experience"
                    checked={selectedExperience === level}
                    onChange={() => setSelectedExperience(level)}
                    className="h-4 w-4 border-gray-300 text-upwork-green focus:ring-upwork-green"
                  />
                  <label htmlFor={`exp-${level}`} className="ml-2 text-sm">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Hourly Rate */}
      <Accordion type="single" collapsible defaultValue="hourly" className="mb-6">
        <AccordionItem value="hourly" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-semibold">Hourly Rate</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <Slider
                defaultValue={[10, 100]}
                max={200}
                step={1}
                value={hourlyRange}
                onValueChange={(value: number[]) => setHourlyRange(value)}
                className="mt-6"
              />
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  ${hourlyRange[0]}
                </div>
                <div className="text-sm">
                  ${hourlyRange[1]}+
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Project Length */}
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="project-length" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-semibold">Project Length</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              <div className="flex items-center">
                <input type="checkbox" id="less-1-month" className="h-4 w-4 rounded border-gray-300 text-upwork-green focus:ring-upwork-green" />
                <label htmlFor="less-1-month" className="ml-2 text-sm">Less than 1 month</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="1-3-months" className="h-4 w-4 rounded border-gray-300 text-upwork-green focus:ring-upwork-green" />
                <label htmlFor="1-3-months" className="ml-2 text-sm">1 to 3 months</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="3-6-months" className="h-4 w-4 rounded border-gray-300 text-upwork-green focus:ring-upwork-green" />
                <label htmlFor="3-6-months" className="ml-2 text-sm">3 to 6 months</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="more-6-months" className="h-4 w-4 rounded border-gray-300 text-upwork-green focus:ring-upwork-green" />
                <label htmlFor="more-6-months" className="ml-2 text-sm">More than 6 months</label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Client Requirements */}
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="client-reqs" className="border-none">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="font-semibold">Client Requirements</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="verified-only" className="text-sm font-normal cursor-pointer">Payment verified only</Label>
                <Switch 
                  id="verified-only" 
                  checked={paymentVerified}
                  onCheckedChange={setPaymentVerified}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-verified" className="text-sm font-normal cursor-pointer">Verified clients only</Label>
                <Switch 
                  id="payment-verified"
                  checked={verifiedOnly}
                  onCheckedChange={setVerifiedOnly}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || selectedExperience || hourlyRange[0] !== 10 || hourlyRange[1] !== 100 || verifiedOnly || paymentVerified) && (
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <Badge key={category} variant="outline" className="bg-gray-100 text-upwork-gray">
                {category}
                <button 
                  onClick={() => handleCategoryToggle(category)}
                  className="ml-1 hover:text-upwork-green"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            
            {selectedExperience && (
              <Badge variant="outline" className="bg-gray-100 text-upwork-gray">
                {selectedExperience}
                <button 
                  onClick={() => setSelectedExperience(null)}
                  className="ml-1 hover:text-upwork-green"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {(hourlyRange[0] !== 10 || hourlyRange[1] !== 100) && (
              <Badge variant="outline" className="bg-gray-100 text-upwork-gray">
                ${hourlyRange[0]} - ${hourlyRange[1]}+
                <button 
                  onClick={() => setHourlyRange([10, 100])}
                  className="ml-1 hover:text-upwork-green"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {verifiedOnly && (
              <Badge variant="outline" className="bg-gray-100 text-upwork-gray">
                Verified clients
                <button 
                  onClick={() => setVerifiedOnly(false)}
                  className="ml-1 hover:text-upwork-green"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            
            {paymentVerified && (
              <Badge variant="outline" className="bg-gray-100 text-upwork-gray">
                Payment verified
                <button 
                  onClick={() => setPaymentVerified(false)}
                  className="ml-1 hover:text-upwork-green"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;
