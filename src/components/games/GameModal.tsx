
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CoinCounterGame from './CoinCounterGame';
import SavingsSprintGame from './SavingsSprintGame';
import BudgetBuilderGame from './BudgetBuilderGame';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameType: 'coin-counter' | 'savings-sprint' | 'budget-builder' | null;
  onGameComplete: (points: number) => void;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, gameType, onGameComplete }) => {
  const handleGameComplete = (points: number) => {
    onGameComplete(points);
    setTimeout(() => {
      onClose();
    }, 3000); // Auto-close after 3 seconds to show completion
  };

  const renderGame = () => {
    switch (gameType) {
      case 'coin-counter':
        return <CoinCounterGame onComplete={handleGameComplete} />;
      case 'savings-sprint':
        return <SavingsSprintGame onComplete={handleGameComplete} />;
      case 'budget-builder':
        return <BudgetBuilderGame onComplete={handleGameComplete} />;
      default:
        return null;
    }
  };

  const getGameTitle = () => {
    switch (gameType) {
      case 'coin-counter':
        return '🪙 Coin Counter';
      case 'savings-sprint':
        return '🏃‍♂️ Savings Sprint';
      case 'budget-builder':
        return '📊 Budget Builder';
      default:
        return 'Money Game';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-green-800">
            {getGameTitle()}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderGame()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameModal;
