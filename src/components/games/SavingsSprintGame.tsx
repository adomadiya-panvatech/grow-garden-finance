
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface SavingsSprintGameProps {
  onComplete: (points: number) => void;
}

const SavingsSprintGame: React.FC<SavingsSprintGameProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [savingsGoal] = useState(100);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [weeklyIncome, setWeeklyIncome] = useState(20);
  const [expenses, setExpenses] = useState<{ name: string; cost: number; necessary: boolean }[]>([]);
  const [week, setWeek] = useState(1);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);

  const allExpenses = [
    { name: 'School Lunch', cost: 5, necessary: true },
    { name: 'New Toy', cost: 15, necessary: false },
    { name: 'School Supplies', cost: 8, necessary: true },
    { name: 'Candy', cost: 3, necessary: false },
    { name: 'Movie Ticket', cost: 12, necessary: false },
    { name: 'Books', cost: 10, necessary: true },
    { name: 'Video Game', cost: 25, necessary: false },
    { name: 'Clothes', cost: 20, necessary: true }
  ];

  useEffect(() => {
    generateWeeklyExpenses();
  }, [week]);

  const generateWeeklyExpenses = () => {
    const weekExpenses = allExpenses
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setExpenses(weekExpenses);
    setSelectedExpenses([]);
  };

  const handleExpenseToggle = (expenseName: string) => {
    setSelectedExpenses(prev => 
      prev.includes(expenseName)
        ? prev.filter(name => name !== expenseName)
        : [...prev, expenseName]
    );
  };

  const processWeek = () => {
    const totalExpenses = expenses
      .filter(expense => selectedExpenses.includes(expense.name))
      .reduce((total, expense) => total + expense.cost, 0);
    
    const necessaryExpenses = expenses
      .filter(expense => expense.necessary && !selectedExpenses.includes(expense.name));
    
    let weeklyPoints = 0;
    let savings = weeklyIncome - totalExpenses;

    // Penalty for not buying necessary items
    if (necessaryExpenses.length > 0) {
      savings -= necessaryExpenses.reduce((total, expense) => total + expense.cost, 0);
      toast({
        title: "⚠️ Missed Necessities",
        description: "You forgot some important expenses!",
      });
    } else {
      weeklyPoints += 5; // Bonus for covering all necessities
    }

    // Bonus for smart spending
    const unnecessaryExpenses = expenses
      .filter(expense => !expense.necessary && selectedExpenses.includes(expense.name));
    
    if (unnecessaryExpenses.length === 0 && savings > 0) {
      weeklyPoints += 10; // Bonus for avoiding unnecessary expenses
      toast({
        title: "🌟 Smart Saver!",
        description: "Great job avoiding unnecessary expenses!",
      });
    }

    const newSavings = Math.max(0, currentSavings + savings);
    setCurrentSavings(newSavings);
    setScore(prev => prev + weeklyPoints + Math.max(0, savings));

    if (newSavings >= savingsGoal) {
      setGameActive(false);
      onComplete(score + weeklyPoints + Math.max(0, savings));
      toast({
        title: "🎉 Goal Achieved!",
        description: `You reached your savings goal in ${week} weeks!`,
      });
    } else if (week >= 10) {
      setGameActive(false);
      onComplete(score + weeklyPoints + Math.max(0, savings));
      toast({
        title: "⏰ Time's Up!",
        description: `You saved $${newSavings} out of $${savingsGoal}`,
      });
    } else {
      setWeek(prev => prev + 1);
      toast({
        title: `Week ${week} Complete`,
        description: `Saved: $${Math.max(0, savings)}, Total: $${newSavings}`,
      });
    }
  };

  const progressPercentage = (currentSavings / savingsGoal) * 100;

  if (!gameActive) {
    return (
      <Card className="garden-card">
        <CardHeader>
          <CardTitle className="text-center text-green-800">
            🏆 Savings Sprint Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-green-700 mb-2">
            Final Score: {score} points
          </p>
          <p className="text-lg text-green-600 mb-4">
            Saved: ${currentSavings} / ${savingsGoal}
          </p>
          <Progress value={progressPercentage} className="mb-4" />
          <p className="text-green-600">
            {currentSavings >= savingsGoal ? "Congratulations! 🎉" : "Keep practicing! 💪"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="garden-card">
      <CardHeader>
        <CardTitle className="text-green-800">
          🏃‍♂️ Savings Sprint - Week {week}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-700">Savings Goal: ${savingsGoal}</span>
            <span className="text-green-700">Current: ${currentSavings}</span>
          </div>
          <Progress value={progressPercentage} className="mb-4" />
        </div>

        <div className="mb-6">
          <p className="text-green-700 mb-4">
            This week you earned ${weeklyIncome}. Choose what to spend money on:
          </p>
          
          <div className="space-y-2">
            {expenses.map((expense, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedExpenses.includes(expense.name)
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleExpenseToggle(expense.name)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {expense.name} {expense.necessary ? '⚠️' : '🎮'}
                  </span>
                  <span className="font-bold">${expense.cost}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {expense.necessary ? 'Necessary' : 'Optional'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-green-600">
            <p>Total Selected: ${expenses.filter(e => selectedExpenses.includes(e.name)).reduce((sum, e) => sum + e.cost, 0)}</p>
            <p>Remaining: ${weeklyIncome - expenses.filter(e => selectedExpenses.includes(e.name)).reduce((sum, e) => sum + e.cost, 0)}</p>
          </div>
          <div className="text-sm text-green-600">
            Score: {score} points
          </div>
        </div>

        <Button 
          onClick={processWeek}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Complete Week {week}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SavingsSprintGame;
