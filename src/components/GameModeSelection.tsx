import React, { useState } from 'react';
import { useGameContext } from '../context/GameContext';

interface GameModeSelectionProps {
  onMemorizationMode: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onMemorizationMode }) => {
  const { startGame } = useGameContext();
  const [showHelp, setShowHelp] = useState(false);

  const handleStartGame = (mode: '10questions' | 'allflags' | 'isoquiz' | 'geoguessr') => {
    console.log(`Starting game with mode: ${mode}`);
    startGame(mode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="card max-w-xl w-full p-8 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">GeoGuessr向け国旗当てクイズ</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            地理クイズゲーム「GeoGuessr」のための国旗当てクイズです。
            表示される国旗または国コードから正しい国または地域を選んでください。
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 mb-8">
          <button
            onClick={() => handleStartGame('10questions')}
            className="btn-primary text-lg py-4 relative overflow-hidden group"
          >
            <span className="relative z-10">国旗10問モード</span>
            <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button
            onClick={() => handleStartGame('isoquiz')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-4 rounded-lg transition-colors shadow-md relative overflow-hidden group"
          >
            <span className="relative z-10">ISOコード10問モード</span>
            <div className="absolute inset-0 bg-purple-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button
            onClick={() => handleStartGame('geoguessr')}
            className="bg-orange-600 hover:bg-orange-700 text-white text-lg py-4 rounded-lg transition-colors shadow-md relative overflow-hidden group"
          >
            <span className="relative z-10">GeoGuessr対応国10問モード</span>
            <div className="absolute inset-0 bg-orange-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button
            onClick={() => handleStartGame('allflags')}
            className="btn-secondary text-lg py-4 relative overflow-hidden group"
          >
            <span className="relative z-10">全国旗モード</span>
            <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button
            onClick={onMemorizationMode}
            className="bg-green-600 hover:bg-green-700 text-white text-lg py-4 rounded-lg transition-colors shadow-md relative overflow-hidden group"
          >
            <span className="relative z-10">暗記モード</span>
            <div className="absolute inset-0 bg-green-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center justify-center w-full text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 mr-2 transform transition-transform ${showHelp ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {showHelp ? 'ヘルプを閉じる' : 'ヘルプを表示'}
          </button>
          
          {showHelp && (
            <div className="mt-4 text-gray-700 bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="font-bold text-lg mb-3">遊び方</h3>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>ゲームモードを選択すると、クイズが始まります</li>
                <li>表示される国旗または国コードから正しい情報を、4つの選択肢から選びましょう</li>
                <li>回答するとすぐに正解か不正解かが表示されます</li>
                <li>全問回答すると結果画面に移動します</li>
                <li>結果画面では、スコアと所要時間、回答履歴が確認できます</li>
                <li>過去の成績も記録されるので、記録更新を目指しましょう</li>
              </ul>
              
              <h3 className="font-bold text-lg mt-6 mb-3">ゲームモード</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold text-blue-600">国旗10問モード</div>
                  <p>ランダムに選ばれた10カ国の国旗が出題されます。国旗から国名を当てるクイズです。</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold text-purple-600">ISOコード10問モード</div>
                  <p>国や地域のISOコード(インターネットドメイン)から国名を当てるクイズです。選択肢には国旗と国名が表示されます。10問出題されます。</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold text-orange-600">GeoGuessr対応国10問モード</div>
                  <p>GeoGuessrでプレイ可能な131カ国の国旗からランダムに10問出題されます。実際にGeoGuessrで遭遇する可能性のある国旗を重点的に学習できます。（2025/07/06更新：Plonk Itガイドに完全一致）</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold text-blue-600">全国旗モード</div>
                  <p>登録されている全ての国旗（200以上）が出題されます。本格的に国旗マスターを目指す方におすすめです。</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="font-semibold text-green-600">暗記モード</div>
                  <p>地域ごとに分類された国旗と国名を一覧表示します。暗記や学習に役立ちます。</p>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mt-6 mb-3">データについて</h3>
              <p className="text-sm text-gray-600 mb-4">
                このアプリケーションで使用している国/地域データは、2025/05/22時点の Google Maps がサポートしている国/地域リスト
                （<a href="https://support.google.com/business/answer/6270107?hl=ja" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google ビジネス プロフィール - サポートされている国/地域</a>）
                をもとに作成しています。
              </p>
              <p className="text-sm text-gray-600">
                GeoGuessr対応国データは、2025年7月6日時点の
                （<a href="https://www.plonkit.net/guide" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Plonk It - GeoGuessr Guide</a>）
                をもとに作成しています。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameModeSelection; 