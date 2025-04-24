
import React from 'react';
import { Cat, MessageCircle } from 'lucide-react';

const GameHeader = () => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <Cat className="w-8 h-8 text-purple-500" />
      <MessageCircle className="w-8 h-8 text-purple-400" />
    </div>
  );
};

export default GameHeader;
