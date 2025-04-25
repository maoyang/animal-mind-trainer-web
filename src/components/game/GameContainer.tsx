
import React, { useState, useEffect } from 'react';
import { KnowledgeNode, GameState } from '../../types/game';
import { loadKnowledgeTree, saveKnowledgeTree, addNewAnimal, resetKnowledgeTree } from '../../utils/gameLogic';
import { toast } from "@/hooks/use-toast";
import GameStartScreen from './GameStartScreen';
import GameQuestion from '../GameQuestion';
import GameGuess from '../GameGuess';
import LearningForm from '../LearningForm';

const GameContainer = () => {
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
      <GameStartScreen 
        onStartGame={handleStartGame}
        onResetKnowledge={handleResetKnowledge}
      />
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

export default GameContainer;
