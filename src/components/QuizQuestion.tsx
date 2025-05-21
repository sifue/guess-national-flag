import React, { useState, useEffect } from 'react';
import type { Flag } from '../data/flags';
import { useGameContext } from '../context/GameContext';
import Timer from './Timer';

const QuizQuestion: React.FC = () => {
  const { questions, currentQuestionIndex, answerQuestion, goToNextQuestion, gameMode } = useGameContext();
  const [selectedAnswer, setSelectedAnswer] = useState<Flag | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  
  useEffect(() => {
    if (showAnswer && countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setSelectedAnswer(null);
        setShowAnswer(false);
        goToNextQuestion();
      }
    }
  }, [showAnswer, countdown, goToNextQuestion]);
  
  if (!questions.length) return null;
  
  const currentQuestion = questions[currentQuestionIndex];
  const { correctFlag, options } = currentQuestion;
  const isCorrect = selectedAnswer?.code === correctFlag.code;
  const isIsoCodeQuiz = gameMode === 'isoquiz';
  
  const handleSelectAnswer = (option: Flag) => {
    if (showAnswer) return;
    
    setSelectedAnswer(option);
    setShowAnswer(true);
    setCountdown(2); // 2秒のカウントダウン
    answerQuestion(option);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="card max-w-4xl w-full p-6 mx-auto">
        {/* ヘッダー部分 */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
            問題 {currentQuestionIndex + 1} / {questions.length}
          </div>
          <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg">
            <Timer />
          </div>
        </div>
        
        {/* 問題部分 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* 国旗画像または国コード表示 */}
          <div className="flex-1 flex justify-center">
            {isIsoCodeQuiz ? (
              <div className="relative p-4 bg-white border-2 border-gray-200 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <div className="flex items-center justify-center h-48 md:h-60">
                  <span className="text-5xl font-bold text-gray-700 font-mono">{correctFlag.code}</span>
                </div>
                <div className="absolute inset-0 shadow-md pointer-events-none border rounded-lg"></div>
              </div>
            ) : (
              <div className="relative p-4 bg-white border-2 border-gray-200 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <img 
                  src={correctFlag.imageUrl} 
                  alt="国旗" 
                  className="object-contain max-h-48 md:max-h-60 rounded"
                />
                <div className="absolute inset-0 shadow-md pointer-events-none border rounded-lg"></div>
              </div>
            )}
          </div>
          
          {/* 選択肢部分 */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-blue-500 pl-3">
              {isIsoCodeQuiz 
                ? 'このISOコード(ドメイン)はどこの国/地域ですか？' 
                : 'この国旗はどこの国/地域ですか？'}
            </h2>
            
            <div className="grid grid-cols-1 gap-3">
              {options.map(option => (
                <button
                  key={option.code}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showAnswer}
                  className={`
                    p-4 border-2 rounded-lg text-left transition-all duration-200
                    ${showAnswer 
                      ? option.code === correctFlag.code 
                        ? 'bg-green-100 border-green-500 text-green-800' 
                        : option.code === selectedAnswer?.code 
                          ? 'bg-red-100 border-red-500 text-red-800' 
                          : 'opacity-70 border-gray-200'
                      : 'hover:bg-gray-50 hover:border-blue-300 border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center">
                    {isIsoCodeQuiz && (
                      <div className="w-8 h-6 mr-3 overflow-hidden border border-gray-300 rounded">
                        <img src={option.imageUrl} alt={option.name} className="h-full w-full object-cover" />
                      </div>
                    )}
                    {!isIsoCodeQuiz && (
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded text-sm text-gray-600 mr-3">{option.code}</div>
                    )}
                    <div className="font-medium">{option.name}</div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* 回答結果表示 */}
            {showAnswer && (
              <div 
                className={`mt-6 p-4 rounded-lg border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'} 
                transition-all duration-300 transform ${showAnswer ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 
                      ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                    >
                      {isCorrect ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="font-bold text-lg">
                      {isCorrect ? '正解！' : '不正解'}
                    </p>
                  </div>
                  {countdown !== null && (
                    <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded-full">
                      {countdown}秒後に次の問題へ
                    </span>
                  )}
                </div>
                
                {!isCorrect && (
                  <div className="mt-3 pl-11">
                    <p className="mb-2">正解は「{correctFlag.code}: {correctFlag.name}」でした。</p>
                    <div className="flex items-center mt-1 bg-white p-2 rounded border border-gray-200 inline-block">
                      <div className="w-10 h-6 mr-3 overflow-hidden border border-gray-300 rounded">
                        <img src={correctFlag.imageUrl} alt={correctFlag.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="font-medium">{correctFlag.name}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* 進捗バー */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>スタート</span>
            <span>ゴール</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion; 