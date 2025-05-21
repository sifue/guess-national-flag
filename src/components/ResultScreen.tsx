import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';
import { getGameResults, clearGameResults } from '../utils/gameLogic';

const ResultScreen: React.FC = () => {
  const { gameResult, resetGame, startGame, gameMode } = useGameContext();
  const pastResults = getGameResults();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  if (!gameResult) return null;
  
  const { totalQuestions, correctAnswers, timeTaken, questionsWithAnswers } = gameResult;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleClearResults = () => {
    clearGameResults();
    setShowClearConfirm(false);
    // 表示をリフレッシュするための小さなハック
    resetGame();
    startGame(gameMode || '10questions');
    resetGame();
  };
  
  const getScoreGrade = (percentage: number): string => {
    if (percentage >= 90) return 'S';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="card max-w-4xl w-full p-6">
        <h1 className="text-3xl font-bold text-center mb-8">結果</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-xl font-bold mb-4">今回のスコア</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="text-lg">評価</div>
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300 text-blue-800 text-3xl font-bold">
                  {getScoreGrade(scorePercentage)}
                </div>
              </div>
              
              <div className="flex justify-between mb-2">
                <span>正解数:</span>
                <span className="font-bold">{correctAnswers} / {totalQuestions}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>正答率:</span>
                <span className="font-bold">{scorePercentage}%</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>所要時間:</span>
                <span className="font-bold">{formatTime(timeTaken)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>平均回答時間:</span>
                <span className="font-bold">{formatTime(Math.floor(timeTaken / totalQuestions))} / 問</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">問題の正誤</h3>
              <div className="max-h-80 overflow-y-auto">
                {questionsWithAnswers.map((qa, index) => (
                  <div 
                    key={index} 
                    className={`mb-2 p-3 rounded border ${qa.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 flex-shrink-0">
                        <img 
                          src={qa.question.correctFlag.imageUrl} 
                          alt={qa.question.correctFlag.name} 
                          className="h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-sm">
                          <span className="font-mono">{qa.question.correctFlag.code}</span>
                          <span className="mx-1">:</span>
                          <span>{qa.question.correctFlag.name}</span>
                        </div>
                        {!qa.isCorrect && qa.userAnswer && (
                          <div className="text-sm text-red-600">
                            <span>回答: {qa.userAnswer.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-auto">
                        <span className={`${qa.isCorrect ? 'text-green-600' : 'text-red-600'} font-bold`}>
                          {qa.isCorrect ? '○' : '×'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">過去のスコア</h2>
            {pastResults.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">日時</th>
                      <th className="p-2 text-right">スコア</th>
                      <th className="p-2 text-right">時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastResults.map((result, index) => (
                      <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                        <td className="p-2">{formatDate(result.date)}</td>
                        <td className="p-2 text-right">
                          <span className={`
                            ${result.correctAnswers === result.totalQuestions ? 'text-green-600 font-bold' : ''}
                            ${result.correctAnswers === 0 ? 'text-red-600' : ''}
                          `}>
                            {result.correctAnswers}/{result.totalQuestions}
                          </span>
                        </td>
                        <td className="p-2 text-right font-mono">{formatTime(result.timeTaken)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="p-3 border-t">
                  <button 
                    onClick={() => setShowClearConfirm(true)}
                    className="text-xs text-gray-500 hover:text-red-500"
                  >
                    履歴をクリア
                  </button>
                  
                  {showClearConfirm && (
                    <div className="mt-2 p-2 border border-red-200 bg-red-50 rounded text-sm">
                      <p className="mb-2">本当に全ての履歴を削除しますか？</p>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleClearResults}
                          className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          削除する
                        </button>
                        <button 
                          onClick={() => setShowClearConfirm(false)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">過去のスコアはありません</p>
            )}
            
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-bold mb-3">統計</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>プレイ回数:</span>
                  <span className="font-bold">{pastResults.length + 1}回</span>
                </div>
                {pastResults.length > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>最高スコア:</span>
                      <span className="font-bold">
                        {Math.max(...pastResults.map(r => r.correctAnswers))}/{
                          pastResults.find(r => r.correctAnswers === Math.max(...pastResults.map(p => p.correctAnswers)))?.totalQuestions
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>最高スコア最速タイム:</span>
                      <span className="font-bold">
                        {(() => {
                          if (pastResults.length === 0) return '記録なし';
                          
                          // 最高スコアを取得
                          const highestScore = Math.max(...pastResults.map(r => r.correctAnswers));
                          
                          // 最高スコアの記録を抽出
                          const bestScores = pastResults.filter(r => r.correctAnswers === highestScore);
                          
                          // その中で最速のタイムを取得
                          const fastestTime = Math.min(...bestScores.map(r => r.timeTaken));
                          
                          return isFinite(fastestTime) ? formatTime(fastestTime) : '記録なし';
                        })()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={resetGame} className="btn-secondary">
            ゲームモード選択に戻る
          </button>
          <button 
            onClick={() => gameMode && startGame(gameMode)} 
            className="btn-primary"
          >
            もう一度プレイする
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen; 