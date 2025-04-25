import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ListOrdered, BookOpen } from 'lucide-react';
import { KnowledgeNode, GameState } from '../types/game';
import { loadKnowledgeTree, saveKnowledgeTree, addNewAnimal, resetKnowledgeTree } from '../utils/gameLogic';
import { toast } from "@/hooks/use-toast";
import GameHeader from './GameHeader';
import GameQuestion from './GameQuestion';
import GameGuess from './GameGuess';
import LearningForm from './LearningForm';

const AnimalGame = () => {
  const [knowledgeTree, setKnowledgeTree] = useState<KnowledgeNode>(loadKnowledgeTree());
  const [answerPath, setAnswerPath] = useState<boolean[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    currentNode: null,
    isGuessing: false,
    gameStarted: false,
    isLearning: false,
    correctAnimal: '',
    newQuestion: '',
  });

  useEffect(() => {
    if (gameState.gameStarted && !gameState.currentNode) {
      setGameState(prev => ({ ...prev, currentNode: knowledgeTree }));
    }
  }, [gameState.gameStarted, knowledgeTree]);

  const handleStartGame = () => {
    setGameState(prev => ({ 
      ...prev, 
      gameStarted: true, 
      currentNode: knowledgeTree,
      isGuessing: false,
      isLearning: false,
      correctAnimal: '',
      newQuestion: ''
    }));
    setAnswerPath([]);
  };

  const handleResetKnowledge = () => {
    if (window.confirm("確定要重置電腦的所有動物知識嗎？這將會刪除所有已經學習的內容。")) {
      resetKnowledgeTree();
      setKnowledgeTree(loadKnowledgeTree());
      toast({
        title: "知識已重置",
        description: "電腦的動物知識已被重置為初始狀態",
      });
    }
  };

  const handleAnswer = (answer: boolean) => {
    if (!gameState.currentNode) return;

    const newPath = [...answerPath, answer];
    setAnswerPath(newPath);

    const nextNode = answer ? gameState.currentNode.yes : gameState.currentNode.no;

    if (!nextNode) return;

    if (nextNode.isAnimal) {
      setGameState(prev => ({ ...prev, isGuessing: true, currentNode: nextNode }));
    } else {
      setGameState(prev => ({ ...prev, currentNode: nextNode }));
    }
  };

  const handleGuessResponse = (correct: boolean) => {
    if (correct) {
      setGameState({
        currentNode: null,
        isGuessing: false,
        gameStarted: false,
        isLearning: false,
        correctAnimal: '',
        newQuestion: '',
      });
      setAnswerPath([]);
      toast({
        title: "猜對了！",
        description: "電腦成功猜到你心中的動物了！",
      });
    } else {
      setGameState(prev => ({ ...prev, isLearning: true }));
    }
  };

  const handleNewAnimalSubmit = () => {
    if (!gameState.currentNode || !gameState.correctAnimal || !gameState.newQuestion) return;

    const newTree = addNewAnimal(
      knowledgeTree,
      answerPath,
      gameState.correctAnimal,
      gameState.newQuestion,
      gameState.currentNode.value
    );

    setKnowledgeTree(newTree);
    saveKnowledgeTree(newTree);

    setGameState({
      currentNode: null,
      isGuessing: false,
      gameStarted: false,
      isLearning: false,
      correctAnimal: '',
      newQuestion: '',
    });
    setAnswerPath([]);
    
    toast({
      title: "謝謝你的教導！",
      description: `電腦已經學會了如何辨認"${gameState.correctAnimal}"`,
    });
  };

  if (!gameState.gameStarted) {
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
                    <p>電腦：「請告訴我這是什麼動物」</p>
                    <p>你：「長頸鹿」</p>
                    <p>電腦：「請給我一個可以區別長頸鹿和貓的問題」</p>
                    <p>你：「這個動物的脖子很長」</p>
                    <p>電腦就學會了如何區別長頸鹿和貓！</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleStartGame}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            開始遊戲
          </Button>
          <Button 
            onClick={handleResetKnowledge}
            variant="outline"
            className="w-full mt-2"
          >
            重置知識庫
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState.isLearning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
        <LearningForm 
          currentAnimal={gameState.currentNode?.value || ''}
          correctAnimal={gameState.correctAnimal}
          newQuestion={gameState.newQuestion}
          onAnimalChange={(animal) => setGameState(prev => ({ ...prev, correctAnimal: animal }))}
          onQuestionChange={(question) => setGameState(prev => ({ ...prev, newQuestion: question }))}
          onSubmit={handleNewAnimalSubmit}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white p-4">
      {gameState.isGuessing ? (
        <GameGuess 
          animal={gameState.currentNode?.value || ''}
          onCorrect={() => handleGuessResponse(true)}
          onIncorrect={() => handleGuessResponse(false)}
        />
      ) : (
        <GameQuestion 
          question={gameState.currentNode?.value || ''}
          onYes={() => handleAnswer(true)}
          onNo={() => handleAnswer(false)}
        />
      )}
    </div>
  );
};

export default AnimalGame;
