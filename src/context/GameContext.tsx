import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Flag } from '../data/flags';
import type { Question, GameResult } from '../utils/gameLogic';
import { generateQuestions, saveGameResult } from '../utils/gameLogic';
import { flags } from '../data/flags';
import { allFlags } from '../data/allFlags';
import { additionalFlags1 } from '../data/additionalFlags1';
import { additionalFlags2 } from '../data/additionalFlags2';
import { additionalFlags3 } from '../data/additionalFlags3';
import { additionalFlags4 } from '../data/additionalFlags4';
import { additionalFlags5 } from '../data/additionalFlags5';
import { additionalFlags6 } from '../data/additionalFlags6';

// バックアップとして直接結合した全国旗データを作成
const combinedFlags = [
  ...flags,
  ...additionalFlags1,
  ...additionalFlags2,
  ...additionalFlags3,
  ...additionalFlags4,
  ...additionalFlags5,
  ...additionalFlags6
];

type GameMode = '10questions' | 'allflags' | 'isoquiz';

interface GameContextType {
  gameMode: GameMode | null;
  setGameMode: (mode: GameMode) => void;
  isGameActive: boolean;
  currentQuestionIndex: number;
  questions: Question[];
  startTime: number | null;
  elapsedTime: number;
  correctAnswers: number;
  incorrectAnswers: number;
  questionResults: {
    question: Question;
    userAnswer: Flag | null;
    isCorrect: boolean;
  }[];
  gameResult: GameResult | null;
  
  startGame: (mode: GameMode) => void;
  endGame: () => void;
  resetGame: () => void;
  answerQuestion: (answer: Flag) => void;
  goToNextQuestion: () => void;
  updateElapsedTime: (time: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [questionResults, setQuestionResults] = useState<{
    question: Question;
    userAnswer: Flag | null;
    isCorrect: boolean;
  }[]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  // コンポーネントマウント時に国旗データをログ出力
  useEffect(() => {
    console.log('GameContext initialized');
    console.log(`Flags count: regular=${flags.length}, all=${allFlags.length}, combined=${combinedFlags.length}`);
    
    // 最初の数個の国旗をサンプルとして出力
    console.log('Sample flags from regular flags:', flags.slice(0, 3));
    console.log('Sample flags from allFlags:', allFlags.slice(0, 3));
    console.log('Sample flags from combinedFlags:', combinedFlags.slice(0, 3));
  }, []);

  const startGame = (mode: GameMode) => {
    console.log(`GameContext: Starting game with mode: ${mode}`);
    console.log(`Available flags: regular=${flags.length}, all=${allFlags.length}, combined=${combinedFlags.length}`);
    
    // 全国旗からの出題が必要なのは'allflags'モードだけでなく'10questions'モードでも必要
    const flagsToUse = (mode === 'allflags' || mode === '10questions')
      ? (allFlags.length > flags.length ? allFlags : combinedFlags)
      : flags;
    
    console.log(`Selected ${flagsToUse.length} flags for the game`);
    
    const questionCount = mode === 'allflags' ? Math.min(flagsToUse.length, 200) : 10;
    console.log(`Creating ${questionCount} questions`);
    
    try {
      const generatedQuestions = generateQuestions(flagsToUse, questionCount, mode === 'isoquiz');
      console.log(`Generated ${generatedQuestions.length} questions successfully`);
      
      setGameMode(mode);
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setStartTime(Date.now());
      setElapsedTime(0);
      setCorrectAnswers(0);
      setIncorrectAnswers(0);
      setQuestionResults([]);
      setGameResult(null);
      setIsGameActive(true);
    } catch (error) {
      console.error('Error generating questions:', error);
      // エラーメッセージを表示するなどのエラーハンドリングをここに追加できます
      alert('国旗データの読み込みに問題が発生しました。もう一度試すか、10問モードをお試しください。');
    }
  };

  const endGame = () => {
    const endTime = Date.now();
    const timeTaken = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
    
    const result: GameResult = {
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers,
      timeTaken,
      questionsWithAnswers: questionResults,
      date: new Date()
    };
    
    setGameResult(result);
    setIsGameActive(false);
    saveGameResult(result);
  };

  const resetGame = () => {
    setGameMode(null);
    setIsGameActive(false);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setStartTime(null);
    setElapsedTime(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuestionResults([]);
    setGameResult(null);
  };

  const answerQuestion = (answer: Flag) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer.code === currentQuestion.correctFlag.code;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
    
    const result = {
      question: currentQuestion,
      userAnswer: answer,
      isCorrect
    };
    
    setQuestionResults(prev => [...prev, result]);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endGame();
    }
  };

  const updateElapsedTime = (time: number) => {
    setElapsedTime(time);
  };

  const value = {
    gameMode,
    setGameMode,
    isGameActive,
    currentQuestionIndex,
    questions,
    startTime,
    elapsedTime,
    correctAnswers,
    incorrectAnswers,
    questionResults,
    gameResult,
    
    startGame,
    endGame,
    resetGame,
    answerQuestion,
    goToNextQuestion,
    updateElapsedTime
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}; 