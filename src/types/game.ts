
export interface KnowledgeNode {
  isAnimal: boolean;
  value: string;
  yes?: KnowledgeNode;
  no?: KnowledgeNode;
}

export interface GameState {
  currentNode: KnowledgeNode | null;
  isGuessing: boolean;
  gameStarted: boolean;
  isLearning: boolean;
  correctAnimal: string;
  newQuestion: string;
}
