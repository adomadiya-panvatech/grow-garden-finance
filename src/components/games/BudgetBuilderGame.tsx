
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface BudgetBuilderGameProps {
  onComplete: (points: number) => void;
}

const BudgetBuilderGame: React.FC<BudgetBuilderGameProps> = ({ onComplete }) => {
  const { toast } = useToast();
  const [monthlyIncome] = useState(200);
  const [budget, setBudget] = useState({
    needs: 0,
    wants: 0,
    savings: 0
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const budgetCategories = [
    {
      name: 'Needs (50%)',
      key: 'needs' as keyof typeof budget,
      description: 'Essential expenses: food, school supplies, transportation',
      recommendedPercent: 50,
      color: 'bg-red-100 border-red-300'
    },
    {
      name: 'Wants (30%)',
      key: 'wants' as keyof typeof budget,
      description: 'Fun stuff: toys, games, entertainment, treats',
      recommendedPercent: 30,
      color: 'bg-blue-100 border-blue-300'
    },
    {
      name: 'Savings (20%)',
      key: 'savings' as keyof typeof budget,
      description: 'Money to save for future goals',
      recommendedPercent: 20,
      color: 'bg-green-100 border-green-300'
    }
  ];

  const scenarios = [
    {
      title: "Unexpected Expense",
      description: "Your bike tire needs repair - $25",
      question: "Which budget category should this come from?",
      options: ["Needs", "Wants", "Savings"],
      correct: 1, // Wants, as it's for a repair of a recreational item
      explanation: "This comes from 'Wants' as bike repairs are important but not essential needs."
    },
    {
      title: "Friend's Birthday",
      description: "You want to buy a $15 gift for your friend",
      question: "How should you handle this expense?",
      options: ["Take from Needs", "Take from Wants", "Don't buy the gift"],
      correct: 1,
      explanation: "Gifts are 'Wants' - nice to give but not essential."
    },
    {
      title: "School Fundraiser",
      description: "Your school is selling items for $10",
      question: "What's the best approach?",
      options: ["Must buy (Needs)", "Optional purchase (Wants)", "Avoid completely"],
      correct: 1,
      explanation: "School fundraisers are supportive but fall under 'Wants'."
    }
  ];

  const handleBudgetChange = (category: keyof typeof budget, value: string) => {
    const numValue = parseInt(value) || 0;
    setBudget(prev => ({
      ...prev,
      [category]: numValue
    }));
  };

  const validateBudget = () => {
    const total = budget.needs + budget.wants + budget.savings;
    
    if (total !== monthlyIncome) {
      toast({
        title: "Budget Mismatch! 📊",
        description: `Your budget total is $${total}, but your income is $${monthlyIncome}`,
      });
      return false;
    }

    let points = 0;
    
    // Check if allocation is close to recommended percentages
    budgetCategories.forEach(category => {
      const allocated = budget[category.key];
      const recommended = (monthlyIncome * category.recommendedPercent) / 100;
      const difference = Math.abs(allocated - recommended);
      
      if (difference <= 10) { // Within $10 of recommendation
        points += 10;
      } else if (difference <= 20) { // Within $20
        points += 5;
      }
    });

    setScore(points);
    setCurrentStep(1);
    
    toast({
      title: "Budget Created! 📋",
      description: `You earned ${points} points for your budget allocation!`,
    });
    
    return true;
  };

  const handleScenarioAnswer = (answerIndex: number) => {
    const currentScenario = scenarios[currentStep - 1];
    const isCorrect = answerIndex === currentScenario.correct;
    
    if (isCorrect) {
      setScore(prev => prev + 15);
      toast({
        title: "Correct! 🎉",
        description: currentScenario.explanation,
      });
    } else {
      toast({
        title: "Not quite! 🤔",
        description: currentScenario.explanation,
      });
    }

    if (currentStep < scenarios.length + 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setGameComplete(true);
      onComplete(score + (isCorrect ? 15 : 0));
    }
  };

  const totalBudget = budget.needs + budget.wants + budget.savings;
  const remaining = monthlyIncome - totalBudget;

  if (gameComplete) {
    return (
      <Card className="garden-card">
        <CardHeader>
          <CardTitle className="text-center text-green-800">
            🏆 Budget Master!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-green-700 mb-4">
            Final Score: {score} points
          </p>
          <p className="text-green-600 mb-4">
            You've learned the 50/30/20 budgeting rule!
          </p>
          <div className="text-sm text-green-700">
            <p>🔴 50% for Needs (essentials)</p>
            <p>🔵 30% for Wants (fun stuff)</p>
            <p>🟢 20% for Savings (future goals)</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === 0) {
    return (
      <Card className="garden-card">
        <CardHeader>
          <CardTitle className="text-green-800">
            📊 Budget Builder Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-4">
            You have ${monthlyIncome} to budget this month. Allocate your money wisely!
          </p>
          
          <div className="space-y-4 mb-6">
            {budgetCategories.map((category) => (
              <div key={category.key} className={`p-4 rounded-lg border-2 ${category.color}`}>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-gray-800">
                    {category.name}
                  </label>
                  <span className="text-sm text-gray-600">
                    Recommended: ${(monthlyIncome * category.recommendedPercent) / 100}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <input
                  type="number"
                  value={budget[category.key]}
                  onChange={(e) => handleBudgetChange(category.key, e.target.value)}
                  className="w-full accessible-input"
                  placeholder="Enter amount"
                  min="0"
                  max={monthlyIncome}
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Budget Progress</span>
              <span>${totalBudget} / ${monthlyIncome}</span>
            </div>
            <Progress value={(totalBudget / monthlyIncome) * 100} />
            <p className={`text-sm mt-2 ${remaining === 0 ? 'text-green-600' : remaining > 0 ? 'text-blue-600' : 'text-red-600'}`}>
              {remaining === 0 ? 'Perfect! Budget balanced.' : 
               remaining > 0 ? `$${remaining} remaining to allocate` :
               `Over budget by $${Math.abs(remaining)}`}
            </p>
          </div>

          <Button 
            onClick={validateBudget}
            disabled={totalBudget !== monthlyIncome}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Create Budget
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentScenario = scenarios[currentStep - 1];
  
  return (
    <Card className="garden-card">
      <CardHeader>
        <CardTitle className="text-green-800">
          💭 Scenario {currentStep}/{scenarios.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-bold text-green-800 mb-2">{currentScenario.title}</h3>
          <p className="text-green-700 mb-4">{currentScenario.description}</p>
          <p className="font-medium text-green-800">{currentScenario.question}</p>
        </div>

        <div className="space-y-3">
          {currentScenario.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleScenarioAnswer(index)}
              variant="outline"
              className="w-full text-left justify-start hover:bg-green-50"
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-green-600">
          Score: {score} points
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetBuilderGame;
