import React from "react";
import { Button, Checkbox, Input, Label, Textarea } from "@relume_io/relume-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@relume_io/relume-ui";
import { BiPlus } from "react-icons/bi";

export const QuestionForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Let's start with question
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros.
        </p>
        <form>
          <div className="mb-4">
            <Label htmlFor="Question">Question</Label>
            <Input
              type="text"
              id="question"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="type">Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first-choice">First choice</SelectItem>
                <SelectItem value="second-choice">Second choice</SelectItem>
                <SelectItem value="third-choice">Third choice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
          <Label htmlFor="answer">Answer 1</Label>
            <Input
              type="text"
              id="answer"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
            </div>
          <div className="mb-4">
          <Label htmlFor="answer">Answer 2</Label>
            <Input
              type="text"
              id="answer"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
          <Label htmlFor="answer">Answer 3</Label>
            <Input
              type="text"
              id="answer"
              value=""
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center py-10">
          <Button size="icon"><BiPlus /></Button>

          </div>
          <div className="flex items-center justify-between">
        
          <Button
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
           
            <div className="flex space-x-4">
            <Button
              variant="primary"
              size="sm"
            >
              Done
            </Button>
            
            <Button
              variant="primary"
              size="sm"
            >
              More Question
            </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
