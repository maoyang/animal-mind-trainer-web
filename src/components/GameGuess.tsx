
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GameGuessProps {
  animal: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const GameGuess = ({ animal, onCorrect, onIncorrect }: GameGuessProps) => {
  return (
    <Card className="p-8 max-w-md w-full space-y-6">
      <h2 className="text-xl font-semibold text-purple-900">
        我猜是...
      </h2>
      <p className="text-lg text-center font-bold text-purple-800">
        {animal}
      </p>
      <div className="flex justify-center space-x-4">
        <Button 
          onClick={onCorrect}
          className="bg-green-500 hover:bg-green-600"
        >
          猜對了！
        </Button>
        <Button 
          onClick={onIncorrect}
          className="bg-red-500 hover:bg-red-600"
        >
          猜錯了
        </Button>
      </div>
    </Card>
  );
};

export default GameGuess;
