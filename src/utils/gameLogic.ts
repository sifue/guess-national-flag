import type { Flag } from '../data/flags';

export interface Question {
  correctFlag: Flag;
  options: Flag[];
}

export interface GameResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeTaken: number; // in seconds
  questionsWithAnswers: {
    question: Question;
    userAnswer: Flag | null;
    isCorrect: boolean;
  }[];
  date: Date;
}

// Randomly shuffle an array
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a question with one correct flag and 3 wrong options
export const generateQuestion = (flags: Flag[], excludeFlags: Flag[] = []): Question => {
  console.log(`Generating question with ${flags.length} available flags, excluding ${excludeFlags.length} flags`);
  
  const excludeCodes = new Set(excludeFlags.map(f => f.code));
  const availableFlags = flags.filter(flag => !excludeCodes.has(flag.code));
  
  console.log(`After filtering, ${availableFlags.length} flags available for question`);
  
  if (availableFlags.length < 4) {
    console.error('Not enough flags to generate a question. Need at least 4 flags.');
    console.error('Available flags:', availableFlags.map(f => f.code).join(', '));
    console.error('Excluded flags:', excludeFlags.map(f => f.code).join(', '));
    throw new Error('Not enough flags to generate a question');
  }

  const shuffledFlags = shuffleArray(availableFlags);
  const correctFlag = shuffledFlags[0];
  const wrongOptions = shuffledFlags.slice(1, 4);
  
  console.log(`Created question with correct flag: ${correctFlag.code} - ${correctFlag.name}`);
  
  return {
    correctFlag,
    options: shuffleArray([correctFlag, ...wrongOptions])
  };
};

// Generate a set of questions for a game
export const generateQuestions = (flags: Flag[], count: number, isCodeQuiz: boolean = false): Question[] => {
  console.log(`Generating ${count} questions from ${flags.length} flags, isCodeQuiz: ${isCodeQuiz}`);
  
  if (flags.length < 4) {
    console.error('Not enough flags to generate questions. Need at least 4 flags.');
    throw new Error('Not enough flags to generate questions');
  }
  
  const questions: Question[] = [];
  const usedFlags: Flag[] = [];

  try {
    // 全国旗モード（count > 10）の場合は、特別な処理を行う
    if (count > 10) {
      console.log('Using all flags mode strategy');
      
      // すべての国旗をシャッフル
      const shuffledFlags = shuffleArray([...flags]);
      
      // 各国旗について質問を作成（コードで除外）
      for (let i = 0; i < count; i++) {
        const targetFlag = shuffledFlags[i];
        
        // 正解以外の選択肢を作成（現在の国旗を除く）
        const otherOptions = shuffledFlags.filter(f => f.code !== targetFlag.code);
        // ランダムに3つ選ぶ
        const wrongOptions = shuffleArray(otherOptions).slice(0, 3);
        
        // 質問オブジェクトを作成
        const question: Question = {
          correctFlag: targetFlag,
          options: shuffleArray([targetFlag, ...wrongOptions])
        };
        
        questions.push(question);
        
        if (i % 10 === 0) {
          console.log(`Generated ${i + 1}/${count} questions (all flags mode)`);
        }
      }
    } else {
      // 10問モード - 既存の方法で問題を生成
      for (let i = 0; i < count; i++) {
        const question = generateQuestion(flags, usedFlags);
        questions.push(question);
        usedFlags.push(question.correctFlag);
        
        if (i % 10 === 0) {
          console.log(`Generated ${i + 1}/${count} questions (standard mode)`);
        }
      }
    }
    
    console.log(`Successfully generated all ${count} questions`);
    return questions;
  } catch (error) {
    console.error('Error in question generation:', error);
    throw error;
  }
};

// Local Storage Management for Game Results
const GAME_RESULTS_KEY = 'flag-quiz-results';

export const saveGameResult = (result: GameResult): void => {
  const existingResults = getGameResults();
  const updatedResults = [result, ...existingResults].slice(0, 10); // Keep only the 10 most recent results
  localStorage.setItem(GAME_RESULTS_KEY, JSON.stringify(updatedResults));
};

export const getGameResults = (): GameResult[] => {
  const resultsJson = localStorage.getItem(GAME_RESULTS_KEY);
  if (!resultsJson) return [];
  
  try {
    const results = JSON.parse(resultsJson);
    if (Array.isArray(results)) {
      // Convert date strings back to Date objects
      return results.map(result => ({
        ...result,
        date: new Date(result.date)
      }));
    }
    return [];
  } catch (error) {
    console.error('Failed to parse game results:', error);
    return [];
  }
};

export const clearGameResults = (): void => {
  localStorage.removeItem(GAME_RESULTS_KEY);
}; 