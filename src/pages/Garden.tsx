
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useGrowth } from '@/contexts/GrowthContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Garden = () => {
  const { user } = useAuth();
  const { plants, selectedPlant, selectPlant, addSavings, getPlantsByLevel, currentLevel, calculateMatching } = useGrowth();
  const { toast } = useToast();
  const [savingsAmount, setSavingsAmount] = useState('');
  const [savingsDescription, setSavingsDescription] = useState('');
  const [showAddSavings, setShowAddSavings] = useState(false);

  if (!user) return null;

  const availablePlants = getPlantsByLevel(currentLevel);

  const handleAddSavings = () => {
    const amount = parseFloat(savingsAmount);
    if (amount > 0) {
      addSavings(amount, savingsDescription || 'Manual deposit');
      const matching = calculateMatching(amount);
      
      toast({
        title: "Savings Added! 🌱",
        description: `$${amount.toFixed(2)} saved + $${matching.toFixed(2)} matching bonus!`,
      });
      
      setSavingsAmount('');
      setSavingsDescription('');
      setShowAddSavings(false);
    }
  };

  const getPlantStageEmoji = (plant: any) => {
    switch (plant.stage) {
      case 'seed': return '🌰';
      case 'sprout': return '🌱';
      case 'growing': return '🌿';
      case 'mature': return plant.emoji;
      case 'blooming': return `${plant.emoji}✨`;
      default: return plant.emoji;
    }
  };

  const getPlantSize = (plant: any) => {
    switch (plant.stage) {
      case 'seed': return 'text-4xl';
      case 'sprout': return 'text-5xl';
      case 'growing': return 'text-6xl';
      case 'mature': return 'text-7xl';
      case 'blooming': return 'text-8xl';
      default: return 'text-6xl';
    }
  };

  return (
    <div className="min-h-screen bg-garden-gradient">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Garden Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            🌿 {user.name}'s Garden
          </h1>
          <p className="text-green-700">
            Your beautiful garden grows with every dollar you save!
          </p>
        </div>

        {/* Current Plant Display */}
        {selectedPlant && (
          <Card className="garden-card mb-8 max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className={`${getPlantSize(selectedPlant)} mb-4 animate-bounce-gentle`}>
                {getPlantStageEmoji(selectedPlant)}
              </div>
              <CardTitle className="text-green-800">
                {selectedPlant.name}
              </CardTitle>
              <CardDescription>
                Stage: {selectedPlant.stage} • Value: ${selectedPlant.value.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <div className="bg-green-200 rounded-full h-4 w-full mb-2">
                  <div 
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((selectedPlant.value / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-green-700">
                  ${selectedPlant.value.toFixed(2)} / $50.00 to full bloom
                </p>
              </div>
              
              <Dialog open={showAddSavings} onOpenChange={setShowAddSavings}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    💰 Water Your Plant (Add Savings)
                  </Button>
                </DialogTrigger>
                <DialogContent className="garden-card">
                  <DialogHeader>
                    <DialogTitle className="text-green-800">Add Savings</DialogTitle>
                    <DialogDescription>
                      How much did you save today? Your plant will grow!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="5.00"
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">What did you save from? (Optional)</Label>
                      <Input
                        id="description"
                        placeholder="Allowance, birthday money, etc."
                        value={savingsDescription}
                        onChange={(e) => setSavingsDescription(e.target.value)}
                      />
                    </div>
                    {savingsAmount && (
                      <div className="garden-card p-3">
                        <p className="text-sm text-green-700">
                          💰 Your savings: ${parseFloat(savingsAmount || '0').toFixed(2)}
                        </p>
                        <p className="text-sm text-green-600">
                          🎁 Matching bonus: ${calculateMatching(parseFloat(savingsAmount || '0')).toFixed(2)}
                        </p>
                        <p className="text-sm font-bold text-green-800">
                          🌟 Total growth: ${(parseFloat(savingsAmount || '0') + calculateMatching(parseFloat(savingsAmount || '0'))).toFixed(2)}
                        </p>
                      </div>
                    )}
                    <Button 
                      onClick={handleAddSavings} 
                      disabled={!savingsAmount || parseFloat(savingsAmount) <= 0}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      🌱 Grow My Plant!
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {/* Plant Selection */}
        <Card className="garden-card mb-8">
          <CardHeader>
            <CardTitle className="text-green-800 text-center">
              🌿 Choose Your Plant
            </CardTitle>
            <CardDescription className="text-center">
              Select a plant to focus your growing energy on!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {availablePlants.map((plant) => {
                const userPlant = plants.find(p => p.id === plant.id) || plant;
                const isSelected = selectedPlant?.id === plant.id;
                
                return (
                  <button
                    key={plant.id}
                    onClick={() => selectPlant(userPlant)}
                    className={`garden-card p-4 text-center transition-all duration-300 hover:scale-105 ${
                      isSelected ? 'ring-4 ring-green-500 bg-green-50' : ''
                    }`}
                  >
                    <div className={`${getPlantSize(userPlant)} mb-2`}>
                      {getPlantStageEmoji(userPlant)}
                    </div>
                    <h3 className="font-bold text-green-800 text-sm">
                      {plant.name}
                    </h3>
                    <p className="text-xs text-green-600">
                      ${userPlant.value.toFixed(2)}
                    </p>
                    {isSelected && (
                      <div className="mt-2">
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                          Selected ✓
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            {availablePlants.length < plants.length && (
              <div className="text-center mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800">
                  🔒 More plants unlock as you level up! Reach level {currentLevel + 1} to unlock new varieties.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Garden Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">🌱 Garden Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-700">Plants unlocked:</span>
                  <span className="font-bold">{availablePlants.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Current level:</span>
                  <span className="font-bold">{currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Growth stage:</span>
                  <span className="font-bold capitalize">{selectedPlant?.stage || 'None'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">💡 Growing Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Save $5 to see your first sprout! 🌱</li>
                <li>• Reach $15 for growing stage 🌿</li>
                <li>• $30 makes your plant mature 🌳</li>
                <li>• $50 creates a beautiful bloom! ✨</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="garden-card">
            <CardHeader>
              <CardTitle className="text-green-800">🎯 Next Goal</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlant ? (
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {selectedPlant.stage === 'blooming' ? '🌟' : '🎯'}
                  </div>
                  <p className="text-green-700">
                    {selectedPlant.stage === 'blooming' 
                      ? 'Your plant is fully grown!' 
                      : `Save $${(50 - selectedPlant.value).toFixed(2)} more to reach full bloom!`
                    }
                  </p>
                </div>
              ) : (
                <p className="text-green-600 text-center">
                  Select a plant to start growing! 🌱
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Garden;
