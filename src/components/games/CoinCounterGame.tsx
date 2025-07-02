
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CoinCounterGameProps {
  onComplete: (points: number) => void;
}

const CoinCounterGame: React.FC<CoinCounterGameProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [coins, setCoins] = useState<{ value: number; count: number }[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);

  const coinValues = [
    { value: 1, emoji: '🪙', name: 'Penny' },
    { value: 5, emoji: '🪙', name: 'Nickel' },
    { value: 10, emoji: '🪙', name: 'Dime' },
    { value: 25, emoji: '🪙', name: 'Quarter' }
  ];

  useEffect(() => {
    generateNewProblem();
  }, [currentLevel]);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameActive]);

  const generateNewProblem = () => {
    const newCoins = coinValues.map(coin => ({
      value: coin.value,
      count: Math.floor(Math.random() * (currentLevel + 2))
    })).filter(coin => coin.count > 0);
    
    setCoins(newCoins);
    setUserAnswer('');
  };

  const calculateTotal = () => {
    return coins.reduce((total, coin) => total + (coin.value * coin.count), 0);
  };

  const handleSubmit = () => {
    const correctAnswer = calculateTotal();
    const userValue = parseInt(userAnswer);

    if (userValue === correctAnswer) {
      const points = currentLevel * 2;
      setScore(prev => prev + points);
      toast({
        title: "Correct! 🎉",
        description: `You earned ${points} points!`,
      });
      
      if (currentLevel < 5) {
        setCurrentLevel(prev => prev + 1);
        generateNewProblem();
      } else {
        endGame();
      }
    } else {
      toast({
        title: "Try Again! 🤔",
        description: `The correct answer was ${correctAnswer} cents`,
      });
      generateNewProblem();
    }
  };

  const endGame = () => {
    setGameActive(false);
    onComplete(score);
    toast({
      title: "Game Over! 🏆",
      description: `Final Score: ${score} points`,
    });
  };

  if (!gameActive) {
    return (
      <Card className="garden-card">
        <CardHeader>
          <CardTitle className="text-center text-green-800">
            🏆 Game Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-green-700 mb-4">
            Final Score: {score} points
          </p>
          <p className="text-green-600">
            Great job counting coins! 🪙
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="garden-card">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center justify-between">
          <span>🪙 Coin Counter - Level {currentLevel}</span>
          <span className="text-sm">⏰ {timeLeft}s</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-green-700 mb-4">Count the total value of these coins:</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {coins.map((coin, index) => (
              <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">
                  {Array(coin.count).fill('🪙').join('')}
                </div>
                <p className="text-sm text-green-700">
                  {coin.count} × {coin.value}¢
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter total in cents"
            className="flex-1 accessible-input"
            min="0"
          />
          <Button 
            onClick={handleSubmit}
            disabled={!userAnswer}
            className="bg-green-600 hover:bg-green-700"
          >
            Check Answer
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-green-600">Score: {score} points</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoinCounterGame;
