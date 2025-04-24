
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface LearningFormProps {
  currentAnimal: string;
  correctAnimal: string;
  newQuestion: string;
  onAnimalChange: (animal: string) => void;
  onQuestionChange: (question: string) => void;
  onSubmit: () => void;
}

const LearningForm = ({ 
  currentAnimal, 
  correctAnimal, 
  newQuestion, 
  onAnimalChange, 
  onQuestionChange, 
  onSubmit 
}: LearningFormProps) => {
  return (
    <Card className="p-8 max-w-md w-full space-y-6">
      <h2 className="text-xl font-semibold text-purple-900">
        幫我學習新動物！
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            這個動物是什麼？
          </label>
          <Input
            value={correctAnimal}
            onChange={(e) => onAnimalChange(e.target.value)}
            className="mt-1"
            placeholder="例如：兔子"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            請問一個問題來區分{correctAnimal}和{currentAnimal}
          </label>
          <Input
            value={newQuestion}
            onChange={(e) => onQuestionChange(e.target.value)}
            className="mt-1"
            placeholder="例如：這個動物會跳嗎？"
          />
        </div>
        <Button 
          onClick={onSubmit}
          disabled={!correctAnimal || !newQuestion}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          教我認識這個新動物
        </Button>
      </div>
    </Card>
  );
};

export default LearningForm;
