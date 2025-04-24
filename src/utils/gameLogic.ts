
import { KnowledgeNode } from '../types/game';

const STORAGE_KEY = 'animal-knowledge-tree';

// 初始知識樹
const initialKnowledgeTree: KnowledgeNode = {
  isAnimal: false,
  value: "這個動物是哺乳類嗎？",
  yes: {
    isAnimal: true,
    value: "貓",
  },
  no: {
    isAnimal: true,
    value: "魚",
  },
};

export const loadKnowledgeTree = (): KnowledgeNode => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialKnowledgeTree;
  } catch (e) {
    console.error("載入知識樹失敗", e);
    return initialKnowledgeTree;
  }
};

export const saveKnowledgeTree = (tree: KnowledgeNode) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tree));
  } catch (e) {
    console.error("儲存知識樹失敗", e);
  }
};

export const addNewAnimal = (
  tree: KnowledgeNode,
  path: boolean[],
  newAnimal: string,
  newQuestion: string,
  oldAnimal: string
): KnowledgeNode => {
  if (path.length === 0) {
    return {
      isAnimal: false,
      value: newQuestion,
      yes: { isAnimal: true, value: newAnimal },
      no: { isAnimal: true, value: oldAnimal },
    };
  }

  const newTree = { ...tree };
  let current = newTree;
  
  for (let i = 0; i < path.length - 1; i++) {
    const direction = path[i] ? 'yes' : 'no';
    if (current[direction]) {
      current = current[direction] as KnowledgeNode;
    }
  }

  const lastDirection = path[path.length - 1] ? 'yes' : 'no';
  const oldNode = current[lastDirection] as KnowledgeNode;
  
  current[lastDirection] = {
    isAnimal: false,
    value: newQuestion,
    yes: { isAnimal: true, value: newAnimal },
    no: { isAnimal: true, value: oldAnimal },
  };

  return newTree;
};

export const resetKnowledgeTree = () => {
  localStorage.removeItem(STORAGE_KEY);
};
