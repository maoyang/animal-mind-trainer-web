
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Computer } from 'lucide-react';

interface GameQuestionProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
}

const GameQuestion = ({ question, onYes, onNo }: GameQuestionProps) => {
  return (
    <Card className="p-8 max-w-md w-full space-y-6">
      <div className="flex items-center gap-2 text-xl font-semibold text-purple-900">
        <Computer className="w-6 h-6 text-purple-600" />
        <h2>電腦問你:</h2>
      </div>
      <p className="text-lg text-gray-700">
        {question}
      </p>
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onYes}
          className="bg-purple-600 hover:bg-purple-700 px-8"
        >
          是
        </Button>
        <Button 
          onClick={onNo}
          className="bg-purple-600 hover:bg-purple-700 px-8"
        >
          否
        </Button>
      </div>
    </Card>
  );
};

export default GameQuestion;
