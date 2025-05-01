
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2, AlertCircle, ArrowRight, Check, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MilestoneBuilderProps {
  milestones: any[];
  setMilestones: (milestones: any[]) => void;
}

export const MilestoneBuilder = ({
  milestones,
  setMilestones,
}: MilestoneBuilderProps) => {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [refundPolicy, setRefundPolicy] = useState("No refund after delivery approval");
  
  // For change request simulation
  const [showChangeRequest, setShowChangeRequest] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAmount("");
    setDeadline(undefined);
    setRefundPolicy("No refund after delivery approval");
    setEditIndex(null);
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      title,
      description,
      amount: parseFloat(amount),
      deadline,
      refundPolicy,
      status: "Not Started",
      approved: false,
    };

    if (editIndex !== null) {
      const updatedMilestones = [...milestones];
      updatedMilestones[editIndex] = newMilestone;
      setMilestones(updatedMilestones);
    } else {
      setMilestones([...milestones, newMilestone]);
    }

    setOpen(false);
    resetForm();
  };

  const handleEditMilestone = (index: number) => {
    const milestone = milestones[index];
    setTitle(milestone.title);
    setDescription(milestone.description);
    setAmount(milestone.amount.toString());
    setDeadline(milestone.deadline);
    setRefundPolicy(milestone.refundPolicy);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDeleteMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const handleRequestChange = (index: number) => {
    setSelectedMilestone(index);
    setShowChangeRequest(true);
  };

  const handleApproveChange = () => {
    if (selectedMilestone !== null) {
      const updatedMilestones = [...milestones];
      updatedMilestones[selectedMilestone].approved = true;
      updatedMilestones[selectedMilestone].status = "In Progress";
      setMilestones(updatedMilestones);
      setShowChangeRequest(false);
      setSelectedMilestone(null);
    }
  };

  return (
    <div>
      {milestones.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No milestones yet</h3>
          <p className="text-gray-600 mb-4">
            Break your project into clear milestones with deliverables and deadlines
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white">
                <Plus className="mr-2 h-4 w-4" /> Create First Milestone
              </Button>
            </DialogTrigger>
            <MilestoneDialog
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              amount={amount}
              setAmount={setAmount}
              deadline={deadline}
              setDeadline={setDeadline}
              refundPolicy={refundPolicy}
              setRefundPolicy={setRefundPolicy}
              onSubmit={handleAddMilestone}
              isEditing={editIndex !== null}
            />
          </Dialog>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className={`overflow-hidden ${milestone.approved ? 'border-green-300' : ''}`}>
                <CardContent className="p-0">
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg mb-1">{milestone.title}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={milestone.approved ? "success" : "outline"}>
                            {milestone.status}
                          </Badge>
                          {milestone.approved && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Agreed
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{milestone.description}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <div>
                            <span className="font-medium">Amount:</span> ${milestone.amount.toFixed(2)}
                          </div>
                          <div>
                            <span className="font-medium">Due By:</span> {milestone.deadline ? format(new Date(milestone.deadline), "MMM dd, yyyy") : "No date set"}
                          </div>
                          <div>
                            <span className="font-medium">Refund Policy:</span> {milestone.refundPolicy}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        {!milestone.approved && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRequestChange(index)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Request Change
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditMilestone(index)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteMilestone(index)} 
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-upwork-green hover:bg-upwork-dark-green text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Another Milestone
              </Button>
            </DialogTrigger>
            <MilestoneDialog
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              amount={amount}
              setAmount={setAmount}
              deadline={deadline}
              setDeadline={setDeadline}
              refundPolicy={refundPolicy}
              setRefundPolicy={setRefundPolicy}
              onSubmit={handleAddMilestone}
              isEditing={editIndex !== null}
            />
          </Dialog>
        </>
      )}

      {/* Change Request Modal */}
      <Dialog open={showChangeRequest} onOpenChange={setShowChangeRequest}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Milestone Change Request</DialogTitle>
            <DialogDescription>
              Both parties must agree on milestone terms before work begins.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Request Details</p>
                <p className="text-sm text-gray-600">
                  The client has requested changes to the milestone terms. 
                  Please review and approve to proceed with the project.
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <p className="font-medium text-amber-900 mb-1">Proposed Changes:</p>
              <ul className="list-disc list-inside text-sm text-amber-800">
                <li>Extended deadline by 5 days</li>
                <li>Updated deliverable requirements</li>
                <li>Adjusted payment terms</li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowChangeRequest(false)}
            >
              Decline
            </Button>
            <Button 
              onClick={handleApproveChange}
              className="bg-upwork-green hover:bg-upwork-dark-green text-white"
            >
              Approve Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MilestoneDialogProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  deadline: Date | undefined;
  setDeadline: (deadline: Date | undefined) => void;
  refundPolicy: string;
  setRefundPolicy: (policy: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const MilestoneDialog = ({
  title,
  setTitle,
  description,
  setDescription,
  amount,
  setAmount,
  deadline,
  setDeadline,
  refundPolicy,
  setRefundPolicy,
  onSubmit,
  isEditing,
}: MilestoneDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Milestone" : "Create New Milestone"}</DialogTitle>
        <DialogDescription>
          Define clear deliverables and terms that both parties must agree upon.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="milestone-title">Milestone Title</Label>
          <Input
            id="milestone-title"
            placeholder="e.g. Initial Design Mockups"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="milestone-description">Description & Deliverables</Label>
          <Textarea
            id="milestone-description"
            placeholder="Describe exactly what will be delivered in this milestone..."
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="milestone-amount">Amount ($)</Label>
            <Input
              id="milestone-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="milestone-date">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="milestone-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? (
                    format(deadline, "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="refund-policy">Refund Policy</Label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="no-refund"
                name="refund-policy"
                value="No refund after delivery approval"
                checked={refundPolicy === "No refund after delivery approval"}
                onChange={(e) => setRefundPolicy(e.target.value)}
                className="h-4 w-4 text-upwork-green focus:ring-upwork-green"
              />
              <label htmlFor="no-refund" className="ml-2 text-sm">
                No refund after delivery approval
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="partial-refund"
                name="refund-policy"
                value="50% refund within 3 days of approval"
                checked={refundPolicy === "50% refund within 3 days of approval"}
                onChange={(e) => setRefundPolicy(e.target.value)}
                className="h-4 w-4 text-upwork-green focus:ring-upwork-green"
              />
              <label htmlFor="partial-refund" className="ml-2 text-sm">
                50% refund within 3 days of approval
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="radio"
                id="full-refund"
                name="refund-policy"
                value="Full refund if not meeting requirements"
                checked={refundPolicy === "Full refund if not meeting requirements"}
                onChange={(e) => setRefundPolicy(e.target.value)}
                className="h-4 w-4 text-upwork-green focus:ring-upwork-green"
              />
              <label htmlFor="full-refund" className="ml-2 text-sm">
                Full refund if not meeting requirements
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button 
          onClick={onSubmit}
          className="bg-upwork-green hover:bg-upwork-dark-green text-white"
          disabled={!title || !description || !amount}
        >
          {isEditing ? "Save Changes" : "Add Milestone"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
