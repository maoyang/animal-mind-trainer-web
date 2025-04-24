
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Cat, Dog, Bird, Fish } from 'lucide-react';
import { KnowledgeNode, GameState } from '../types/game';
import { loadKnowledgeTree, saveKnowledgeTree, addNewAnimal } from '../utils/gameLogic';

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
    setGameState(prev => ({ ...prev, gameStarted: true, currentNode: knowledgeTree }));
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
  };

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from
-purple-50 to-white">
        <Card className="p-8 max-w-md w-full space-y-6">
          <div className="flex justify-center space-x-4">
            <Cat className="w-8 h-8 text-purple-500" />
            <Dog className="w-8 h-8 text-purple-400" />
            <Bird className="w-8 h-8 text-purple-300" />
            <Fish className="w-8 h-8 text-purple-200" />
          </div>
          <h1 className="text-2xl font-bold text-center text-purple-900">
            動物猜謎遊戲
          </h1>
          <p className="text-center text-gray-600">
            想一個動物，讓我來猜猜看是什麼！如果我猜錯了，你可以教我認識新的動物。
          </p>
          <Button 
            onClick={handleStartGame}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            開始遊戲
          </Button>
        </Card>
      </div>
    );
  }

  if (gameState.isLearning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
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
                value={gameState.correctAnimal}
                onChange={(e) => setGameState(prev => ({ ...prev, correctAnimal: e.target.value }))}
                className="mt-1"
                placeholder="例如：兔子"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                請問一個問題來區分{gameState.correctAnimal}和{gameState.currentNode?.value}
              </label>
              <Input
                value={gameState.newQuestion}
                onChange={(e) => setGameState(prev => ({ ...prev, newQuestion: e.target.value }))}
                className="mt-1"
                placeholder="例如：這個動物會跳嗎？"
              />
            </div>
            <Button 
              onClick={handleNewAnimalSubmit}
              disabled={!gameState.correctAnimal || !gameState.newQuestion}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              教我認識這個新動物
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <Card className="p-8 max-w-md w-full space-y-6">
        <h2 className="text-xl font-semibold text-purple-900">
          {gameState.isGuessing ? "我猜是..." : "讓我問你..."}
        </h2>
        <p className="text-lg text-gray-700">
          {gameState.currentNode?.value}
        </p>
        <div className="flex justify-center space-x-4">
          {gameState.isGuessing ? (
            <>
              <Button 
                onClick={() => handleGuessResponse(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                猜對了！
              </Button>
              <Button 
                onClick={() => handleGuessResponse(false)}
                className="bg-red-500 hover:bg-red-600"
              >
                猜錯了
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => handleAnswer(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                是
              </Button>
              <Button 
                onClick={() => handleAnswer(false)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                否
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AnimalGame;
