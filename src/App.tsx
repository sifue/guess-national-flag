import React, { useEffect, useState } from 'react';
import { GameProvider, useGameContext } from './context/GameContext';
import GameModeSelection from './components/GameModeSelection';
import QuizQuestion from './components/QuizQuestion';
import ResultScreen from './components/ResultScreen';
import MemorizationMode from './components/MemorizationMode';
import Footer from './components/Footer';

const GameContent: React.FC = () => {
  const { isGameActive, gameResult, gameMode, questions } = useGameContext();
  const [showMemorization, setShowMemorization] = useState(false);

  useEffect(() => {
    console.log('GameContent state updated', { isGameActive, gameMode, hasGameResult: !!gameResult, questionsCount: questions.length });
  }, [isGameActive, gameResult, gameMode, questions]);

  if (showMemorization) {
    return <MemorizationMode onReturn={() => setShowMemorization(false)} />;
  }

  if (gameResult) {
    return <ResultScreen />;
  }

  if (isGameActive) {
    return <QuizQuestion />;
  }

  return <GameModeSelection onMemorizationMode={() => setShowMemorization(true)} />;
};

const App: React.FC = () => {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <GameProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <GameContent />
        </div>
        <Footer />
      </div>
    </GameProvider>
  );
};

export default App;
