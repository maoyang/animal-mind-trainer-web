
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ListOrdered, BookOpen } from 'lucide-react';
import GameHeader from '../GameHeader';

interface GameStartScreenProps {
  onStartGame: () => void;
  onResetKnowledge: () => void;
}

const GameStartScreen = ({ onStartGame, onResetKnowledge }: GameStartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      <Card className="p-8 max-w-md w-full space-y-6">
        <GameHeader />
        <h1 className="text-2xl font-bold text-center text-purple-900">
          動物猜謎遊戲
        </h1>
        
        <div className="space-y-4 text-gray-600">
          <div className="flex items-start gap-2">
            <ListOrdered className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-semibold">遊戲規則：</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>在心中想一個動物</li>
                <li>電腦會透過是非問題來猜測這個動物</li>
                <li>如果猜錯了，告訴電腦正確答案</li>
                <li>並教電腦一個區別問題，讓它學習</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <BookOpen className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-semibold">遊戲範例：</p>
              <div className="bg-purple-50 p-3 rounded-md space-y-2 text-sm">
                <p>1. 你心裡想「長頸鹿」</p>
                <p>2. 電腦問：「這個動物是哺乳類嗎」</p>
                <p>3. 你回答：「是」</p>
                <p>4. 電腦猜：「是貓嗎」</p>
                <p>5. 你回答：「不是」</p>
                <div className="bg-white p-2 rounded mt-2">
                  <p className="font-semibold text-purple-700">👉 學習階段：</p>
                  <p>電腦：「請告訴我這是什麼動物？」</p>
                  <p>你：「長頸鹿」</p>
                  <p>電腦再問：「請給我一個可以區別長頸鹿和貓的問題」</p>
                  <p>你可以回答：「這個動物的脖子很長」</p>
                  <p>之後電腦就學會了如何區別長頸鹿和貓！</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={onStartGame}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          開始遊戲
        </Button>
        <Button 
          onClick={onResetKnowledge}
          variant="outline"
          className="w-full mt-2"
        >
          重置知識庫
        </Button>
      </Card>
    </div>
  );
};

export default GameStartScreen;
